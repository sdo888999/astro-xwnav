import { promises as fs } from 'fs';
import path from 'path';
import { 
  NAV_LINKS_PATH, 
  DEFAULT_ICON,
  logInfo, 
  logSuccess, 
  logWarning, 
  logError,
  readFileContent,
  writeFileContent
} from './tools.js';
import type { OptimizedPathMap } from './3optimize.js';
/**
 * 更新 navLinks.js 文件中的图标路径
 * @param {OptimizedPathMap} optimizedPaths - 优化后的图标路径映射
 * @returns {Promise<void>}
 */
export async function updateNavLinksIconPaths(optimizedPaths: OptimizedPathMap): Promise<void> {
  try {
    const content = await readFileContent(NAV_LINKS_PATH);
    logInfo(`开始更新 navLinks.js 文件中的图标路径...`);
    let updatedContent = await updateCategoryIcons(content, optimizedPaths);
    updatedContent = await updateSiteIcons(updatedContent, optimizedPaths);
    await writeFileContent(NAV_LINKS_PATH, updatedContent);
    logSuccess(`成功更新 navLinks.js 文件中的图标路径`);
  } catch (error) {
    logError('更新 navLinks.js 文件失败:', error);
    throw error;
  }
}
/**
 * 更新分类图标
 * @param {string} content - 文件内容
 * @param {OptimizedPathMap} optimizedPaths - 优化后的图标路径映射
 * @returns {Promise<string>} - 更新后的内容
 */
async function updateCategoryIcons(content: string, optimizedPaths: OptimizedPathMap): Promise<string> {
  const categoryPattern = /({\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"])(?:,\s*icon:\s*['"]([^'"]+)['"])?([\s,}])/g;
  let updatedCount = 0;
  let notFoundCount = 0;
  const updatedContent = content.replace(categoryPattern, (match, prefix, id, name, existingIcon, suffix) => {
    if (optimizedPaths[id]) {
      updatedCount++;
      return `${prefix}, icon: '${optimizedPaths[id]}'${suffix}`;
    } 
    if (existingIcon) {
      return match;
    }
    notFoundCount++;
    logWarning(`分类 ${name} (${id}) 没有找到优化后的图标，使用默认图标`);
    return `${prefix}, icon: '${DEFAULT_ICON}'${suffix}`;
  });
  logInfo(`更新了 ${updatedCount} 个分类图标，${notFoundCount} 个使用默认图标`);
  return updatedContent;
}
/**
 * 更新网站图标
 * @param {string} content - 文件内容
 * @param {OptimizedPathMap} optimizedPaths - 优化后的图标路径映射
 * @returns {Promise<string>} - 更新后的内容
 */
async function updateSiteIcons(content: string, optimizedPaths: OptimizedPathMap): Promise<string> {
  let updatedContent = content;
  const processedIds = new Set<string>();
  updatedContent = updatedContent.replace(/(["']url["']\s*:\s*["'][^"']+["']\s*,)\s*icon\s*:\s*["'][^"']+["']\s*,/g, '$1 ');
  const jsonSitePattern = /(\{\s*"id":\s*"([^"]+)"[\s\S]*?"url":\s*"([^"]+)"[\s\S]*?)(?:"icon":\s*"([^"]*)"\s*,?)?(\s*[\s\S]*?\})/g;
  updatedContent = updatedContent.replace(jsonSitePattern, (match, prefix, id, url, existingIcon, suffix) => {
    if (processedIds.has(id)) return match;
    processedIds.add(id);
    if (!existingIcon) {
      const iconMatch = match.match(/"icon":\s*"([^"]*)"/); 
      existingIcon = iconMatch ? iconMatch[1] : null;
    }
    let cleanPrefix = prefix.replace(/"icon":\s*"[^"]*"\s*,?/g, '');
    cleanPrefix = cleanPrefix.replace(/icon:\s*'[^']*'\s*,?/g, '');
    let cleanSuffix = suffix.replace(/"icon":\s*"[^"]*"\s*,?/g, '');
    cleanSuffix = cleanSuffix.replace(/icon:\s*'[^']*'\s*,?/g, '');
    cleanPrefix = cleanPrefix.replace(/,\s*,/g, ',').trim();
    if (cleanPrefix.endsWith(',')) {
      cleanPrefix = cleanPrefix.slice(0, -1);
    }
    if (optimizedPaths[id]) {
      logInfo(`更新网站图标: ${id}`);
      return `${cleanPrefix},\n    "icon": "${optimizedPaths[id]}"${cleanSuffix}`;
    } else if (existingIcon && existingIcon !== DEFAULT_ICON && !existingIcon.includes('default.svg')) {
      logInfo(`保留网站 ${id} 的现有图标: ${existingIcon}`);
      return `${cleanPrefix},\n    "icon": "${existingIcon}"${cleanSuffix}`;
    } else {
      const categoryMatch = match.match(/"category":\s*"([^"]+)"/); 
      const category = categoryMatch ? categoryMatch[1] : null;
      if (category && optimizedPaths[category]) {
        logWarning(`网站 ${id} 没有找到图标，使用分类 ${category} 的图标作为替代`);
        return `${cleanPrefix},\n    "icon": "${optimizedPaths[category]}"${cleanSuffix}`;
      } else {
        logWarning(`网站 ${id} 没有找到图标，使用默认图标`);
        return `${cleanPrefix},\n    "icon": "${DEFAULT_ICON}"${cleanSuffix}`;
      }
    }
  });
  const siteBlockPattern = /\s*\{[^\{\}]*?id:\s*['"](\w[\w\.-]*)['"][^\{\}]*?\}\s*,?/g;
  updatedContent = updatedContent.replace(siteBlockPattern, (match) => {
    const idMatch = match.match(/id:\s*['"](\w[\w\.-]*)['"]/);
    const urlMatch = match.match(/url:\s*['"](https?:\/\/[^'"]+)['"]/);
    if (!idMatch || !urlMatch) {
      return match;
    }
    const id = idMatch[1];
    const url = urlMatch[1];
    if (processedIds.has(id)) return match;
    logInfo(`匹配到网站对象: ${id} (URL: ${url})`);
    processedIds.add(id);
    const hasIcon = match.includes('icon:');
    if (hasIcon) {
      return match;
    }
    const lines = match.split('\n');
    const trimmedLines = lines.map(line => line.trim());
    let lastPropIndex = -1;
    for (let i = trimmedLines.length - 1; i >= 0; i--) {
      if (trimmedLines[i].includes(':') && !trimmedLines[i].startsWith('}')) {
        lastPropIndex = i;
        break;
      }
    }
    const categoryMatch = match.match(/category:\s*['"](\w+)['"]/);
    const category = categoryMatch ? categoryMatch[1] : null;
    let iconField = '';
    if (optimizedPaths[id]) {
      iconField = `icon: '${optimizedPaths[id]}'`;
      logInfo(`为网站 ${id} 添加图标: ${optimizedPaths[id]}`);
    } else if (category) {
      iconField = `icon: '/icons/category/${category}.svg'`;
      logWarning(`网站 ${id} 没有找到图标，使用分类 ${category} 的图标作为替代`);
    } else {
      iconField = `icon: '${DEFAULT_ICON}'`;
      logWarning(`网站 ${id} 没有找到图标，使用默认图标`);
    }
    if (lastPropIndex !== -1) {
      const lastProp = trimmedLines[lastPropIndex];
      if (lastProp.endsWith(',')) {
        trimmedLines.splice(lastPropIndex + 1, 0, `${iconField},`);
      } else {
        trimmedLines[lastPropIndex] = `${lastProp},`;
        trimmedLines.splice(lastPropIndex + 1, 0, `${iconField},`);
      }
      let newMatch = '';
      for (let i = 0; i < trimmedLines.length; i++) {
        if (i === trimmedLines.length - 1 && trimmedLines[i].trim() === '},') {
          newMatch += '      },\n';
        } else {
          newMatch += `      ${trimmedLines[i]}\n`;
        }
      }
      return newMatch;
    }
    return match;
  });
  updatedContent = updatedContent.replace(/},+\s*,/g, '},');
  logInfo(`总共处理了 ${processedIds.size} 个网站的图标路径`);
  return updatedContent;
}
