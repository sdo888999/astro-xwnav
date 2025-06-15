/**
统一分类opensource
网站：
github
baidu.com
谷歌
具体按照以下样式生成，使用“JavaScript风格格式+单引号”，不要添加"icon字段"和"[]""      
      {
      id: 'github',
      title: 'GitHub',
      description: '全球最大的开源代码托管平台，支持 Git 版本控制，适用于协作开发、项目管理和自动化工作流，是开发者共享与协作的核心工具。'
      shortDesc: '代码托管平台。',
      url: 'https://github.com/',
      category: 'opensource',
      icon: '/icons/github.webp',
      },
描述根据网站实际内容,专业,准确,介绍背景独特优势等等,不要太刻板,臃肿,重复
npx tsx icon-system/0icon.ts
*/
/**
 * 网站分类列表
 * @type {Array<{id: string, name: string, icon: string}>}
 */
export const categories = [
  {
    id: 'opensource',
    name: '开源平台', icon: '/icons/category/opensource.svg',
  },
  {
    id: 'Studying',
    name: '个人其他站点', icon: '/icons/category/studying.svg',
  },
  {
    id: 'ipleak',
    name: '网络安全', icon: '/icons/category/ipleak.svg', 
  },
];
/**
 * 网站列表
 * @type {Array<{id: string, title: string, description: string, shortDesc: string, url: string, icon: string, category: string}>}
 */
export const sites = [
  //开源
  {
    id: 'github',
    title: 'GitHub',
    description: '全球最大的开源代码托管平台，支持 Git 版本控制，适用于协作开发、项目管理和自动化工作流，是开发者共享与协作的核心工具。',
    shortDesc: '全球最大代码托管平台。',
    url: 'https://github.com/',
    icon: '/icons/github.webp',
    category: 'opensource'
  },
  {
    id: 'docker-hub',
    title: 'Docker Hub',
    description: '官方容器镜像仓库，提供镜像上传、分发与管理，支持快速部署各类 Docker 应用，是容器生态的基础服务平台。',
    shortDesc: 'Docker容器镜像仓库。',
    url: 'https://hub.docker.com/',
    icon: '/icons/docker-hub.webp',
    category: 'opensource'
  },
  //个人其他站点      
      {
      id: 'zywede',
      title: 'zywe.de',
      description: '个人主页与知识集散地。作为技术爱好者，展示自己的全部项目、实践与分享的中心',
      shortDesc: 'zywe个人官网',
      url: 'https://zywe.de/',
      category: 'Studying',
      icon: '/icons/zywede.png',
      },
      {
      id: 'dh_zywede',
      title: 'dh.zywe.de',
      description: '专属导航页,这里汇聚了日常学习、开发与管理服务器所需的所有高效工具与资源链接，快速触达各项在线服务的便捷入口，确保学习与实践的流畅性。',
      shortDesc: '让每个人都有自己的网站式收藏夹',
      url: 'https://dh.zywe.de/',
      category: 'Studying',
      icon: '/icons/dh-zywede.png',
      },
      // IP, DNS Leak, WebRTC Leak Check      
      {
      id: 'browserleaks',
      title: 'Browserleaks',
      description: 'Browserleaks是一个全面的浏览器安全和隐私检测网站，能够详细检测用户的IP地址、DNS服务器、WebRTC信息以及多种浏览器指纹，帮助用户了解哪些个人或设备信息可能在网上泄露，以便采取保护措施。',
      shortDesc: '全面浏览器和网络隐私检测。',
      url: 'https://browserleaks.com/',
      category: 'ipleak',
      icon: '/icons/browserleaks.webp',
      },      
      {
      id: 'ipcheck',
      title: 'IPCheck',
      description: 'IPCheck是一个简单易用的工具，用于快速检查用户的IP地址、正在使用的DNS服务器以及是否存在WebRTC泄露，提供直观的测试结果，方便用户验证其网络连接的匿名性和安全性。',
      shortDesc: '检查IP、DNS、WebRTC泄露。',
      url: 'https://ipcheck.ing/',
      category: 'ipleak',
      icon: '/icons/ipcheck.webp',
      },
];
/**
 * @param {string} query
 * @returns {Array}
 */
export function searchSites(query) {
  if (!query) return sites;
  const lowerQuery = query.toLowerCase();
  return sites.filter(site => {
    return (
      site.title.toLowerCase().includes(lowerQuery) ||
      site.description.toLowerCase().includes(lowerQuery) ||
      site.category.toLowerCase().includes(lowerQuery)
    );
  });
}
/**
 * @param {Array} sitesList
 * @returns {string}
 */
export function sitesToHtml(sitesList) {
  if (!sitesList || !sitesList.length) return '<p>没有找到符合条件的网站</p>';
  const html = sitesList.map(site => {
    const safeTitle = escapeHtml(site.title);
    const safeDesc = escapeHtml(site.shortDesc || site.description);
    const safeUrl = escapeHtml(site.url);
    const safeIcon = escapeHtml(site.icon || '/images/default.svg');
    return `
      <div class="site-card" data-category="${site.category}">
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">
          <div class="site-icon">
            <img src="${safeIcon}" alt="${safeTitle}" loading="lazy" onerror="this.src='/images/default.svg'">
          </div>
          <div class="site-info">
            <h3>${safeTitle}</h3>
            <p>${safeDesc}</p>
          </div>
        </a>
      </div>
    `;
  }).join('');
  return `<div class="sites-grid">${html}</div>`;
}
/**
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
