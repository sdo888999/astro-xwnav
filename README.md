## 🛏️ Zywe导航站主题-基于Astro的导航站项目,让每个人都能拥有自己的导航站,操作简单小白友好

## 📖 项目简介

- xwnav-theme:不仅仅是简单的链接集合，更是智能化的导航平台，让您只需专注于内容管理而非技术细节,**只需编辑一个数据文件，所有功能都会自动更新，极大简化了维护工作**,支持 Vercel 和 Cloudflare Pages 一键部署

### 🧭演示站点：[dh.zywe.de](https://dh.zywe.de/)
![835f57b512df219adae8a13c97e69cd4.png](https://i.miji.bid/2025/06/12/835f57b512df219adae8a13c97e69cd4.png)

## 🌈 主要特点

- 🚀 **快速加载**：优化清晰，超轻量，性能卓越
- 🏷 **简洁直观的界面**：分类清晰，操作便捷
- 🔍 **智能搜索功能**：快速查找您需要的网站
- 📎 **双分类导航栏**：主页横向导航+侧边导航
- 📃 **卡片式网站展示**：直观美观，一目了然
- 🔄 **自动化工作流**：减少手动操作，提高效率
- 🌓 **暗色模式**：智能切换暗色/亮色模式
- ⏱️ **快速返回顶部**：一键回到顶部的便捷按钮
- 📸 **图片懒加载**：提升加载速度和用户体验
- 🔊 **流畅的动画过渡**：提升用户界面交互体验
- 💻 **智能顶部栏**: 上滑展出,下滑收缩不挡视野
- 🙌 **人性化设计**: 搜索框,侧边栏可点空白处退出
- 🌤️ **实时天气显示**：集成API实时获取当地天气
- 📱 **响应式布局**：适配所有设备屏幕
- 🔒 **无需数据库**：纯静态设计，无需数据库
- 🔑 **隐藏链接地址**：悬停在卡片，不显示链接地址
- 💾 **Island岛屿架构**
- **按需加载**：动态组件独立渲染，提升加载速度
- **静态首屏**：首屏纯静态生成，并行加载交互组件
- **延迟水合**：交互元素延迟水合，减少首屏阻塞
- **查询优先**：搜索和导航操作优先渲染
- **浏览器缓存**：利用存储机制优化重复访问

## 🌟 独特优势

- 🤖 自动化功能，让您只需专注于内容管理而非技术细节,只需修改一个数据文件（`src/data/navLinks.js`），所有功能都会自动更新，极大简化了维护工作

### 自动化功能

- **🖼️ 自动图标获取**：添加新网站和新分类时无需手动下载图标，脚本自动获取并优化图标引用图标一条龙
- **📑 自动分类导航**：侧边栏分类导航会根据数据文件自动更新，无需手动修改HTML
- **🔎 自动搜索索引**：搜索功能会自动检测新增网站和分类，无需额外配置
- **🃏 自动卡片生成**：网站卡片布局会自动适应新增内容，保持一致的视觉效果
- **🎨 自动主题切换**：根据用户系统配置自动切换暗色/亮色主题
- **🧹 自动清理图标**：图标管理脚本会自动清理未使用的图标文件，保持项目整洁
- **📱 自动响应式适配**：无需编写额外代码，完美适配各种设备屏幕
- **🗺️ 自动生成站点地图**：每次构建项目自动生成robots.txt和sitemap.xml
- **📝 自动SEO元数据**：每次构建项目自动生成和管理SEO相关的元标签等等代码

## 🟢自动化生成的灯塔情况[PageSpeed Insights](https://pagespeed.web.dev/)
![4ceed547f12b6e7753b8f776090abed3.png](https://i.miji.bid/2025/06/11/4ceed547f12b6e7753b8f776090abed3.png)

## 🎶 部署指南`总共六步 (git拉取➡️安装环境➡️自定义网站➡️更新数据文件➡️图标脚本➡️部署)

### ✅ git 拉取
- `git clone https://github.com/zywe03/astro-nav-theme.git`(或者下载压缩包源码解压)

### ✅ windowns安装Node.js 环境
- 安装 **Node.js 18.0+** (推荐LTS版本)[官网](https://nodejs.org/zh-cn)
- Windows用户：直接从官网下载安装包

### ✅ 包管理器选择
- **启用 pnpm**（轻量、高效）
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```
### ✅ 开始开发
```
# 安装依赖
pnpm i
# 浏览器实时看效果
pnpm dev
# 自动下载图标
npx tsx .\icon-system\0icon.ts
# 打包构建生成/dist目录
pnpm build
```
### ✅ 上传/dist目录到服务器,nginx反代,完结撒花🥳

### 🟢 Vercel自动部署
[![zywe vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zywe03/astro-xwnav-theme)
### 🟢 Cloudflare Workers自动部署
[![zywe Cloudflare pages](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/zywe03/astro-xwnav-theme)

### 🛜 第一次导入大量网址链接,借助AI快速生成网站导航内容(强烈建议)

**列出想要生成的网站所属分类,名称或网站**,短和长描述让AI生成，节省工作量

AI提示词:
```
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
      },

描述根据网站实际内容,专业,准确,介绍背景独特优势等等,不要太刻板,臃肿,重复
```
插入数据文件`navLinks.js`后
执行`npx tsx .\icon-system\0icon.ts`自动下载图标,即可完成,大量导航网站导入

## 如何优雅上传服务器

1. ➡️使用Cloudflare Pages或Vercel作为服务器

 vscode更新数据文件，执行图标下载脚本，同步更新到仓库即可

2. ➡️使用vps作为服务器

 2.1:使用`rsync`，配置一键脚本上传

 2.2:更新，执行，构建，设置好nginx，压缩dist，上传解压，更新就删服务器的dist，再传新的压缩包

## 🎥 项目核心结构

```
dh_web/
├── icon-system/       # 图标管理系统
├── public/            # 静态资源目录
│   ├── icons/         # 导航网站和分类图标目录
│   └── images/        # 网站图标
├── src/               # 源代码目录
│   ├── components/    # 组件目录
│   │   ├── Card.astro     # 网站卡片组件
│   │   ├── Footer.astro   # 页脚组件
│   │   ├── Header.astro   # 页眉组件（含导航）
│   │   ├── LogoName.astro  # Logo和网站名称组件
│   │   └── Sidebar.astro   # 侧边栏组件
│   ├── Island/        # React岛屿组件目录
│   │   ├── ThemeIsland.jsx # 主题切换岛屿
│   │   ├── WeatherIsland.jsx # 天气显示岛屿
│   │   ├── quicklyup.jsx   # 快速回到顶部岛屿
│   │   └── searchlsland.jsx # 搜索功能岛屿
│   ├── data/          # 数据目录
│   │   └── navLinks.js    # 导航网站核心数据
│   ├── layouts/       # 布局目录
│   │   └── MainLayout.astro # 主布局
│   └── pages/         # 页面目录
│       ├── index.astro   # 首页
│       └── robots.txt.ts # 生成robots.txt文件
├── astro.config.mjs   # Astro配置文件
└── package.json       # 项目依赖配置
```

### 💬 日常使用关键文件和目录说明

#### 核心数据文件
- **src/data/navLinks.js**: 存储所有网站数据和分类信息，是最常修改的文件，包含网站信息和分类定义

#### 图标存储
- **public/icons/**: 存储所有网站图标
- **public/icons/category/**: 存储分类图标
- **public/icons/downloaded_sites/**: 临时下载目录（自动清理）
- **public/icons/downloaded_categories/**: 临时下载目录（自动清理）

## 🔧 关键文件修改指南

### 📝 增删网站和分类

修改 `src/data/navLinks.js` 文件即可管理所有网站和分类

- ✅建议统一用一种格式**JavaScript风格格式+单引号**,避免脚本错误识别

### 添加新分类

在 `categories` 数组中添加新分类：

⚠️ 注意：不要手动添加icon字段，不要icon""字段留空,会导致无法自动下载添加icon字段,**手动自定义图标除外**

  最好直接不写icon省心,简单

```javascript
export const categories = [
  {
    id: new,  //分类ID
    name: '新分类名称',icon: '/icons/category/new-category.svg'
    // 分类图标也支持自动生成,基于模糊搜索分类名字和ID,找到合适的图标
  }
];
```

#### 添加新网站

在 `sites` 数组中添加新网站：

```javascript
export const sites = [
      {
      id: 'github',                           // 网站ID
      title: 'GitHub',                       // 网站名称
      description: '全球最大代码托管平台。', // 长描述
      shortDesc: '代码托管平台。',      // 短描述
      url: 'https://github.com/',     // 网站链接（包含完整协议（`http://`或`https://`））
      category: 'opensource',        // 所属分类 ID（必须对应分类中的id）
        // 注意：不需要添加icon字段，脚本会自动处理
      },
    ];
```

#### 网站和分类排序
- ➡️一句话就是调顺序即可排序
- **分类排序**: 调整 `categories` 数组中分类的顺序即可改变分类的显示顺序
- **网站排序**: 调整 `sites` 数组中网站的顺序即可改变网站的显示顺序

### 生成后插入navLinks.js即可

---
## 🖼️ 图标下载脚本使用指南

✅ `navLinks.js`使用“JavaScript风格格式+单引号”，不要添加"icon字段"
  由于是静态网站，建议全部图标在构建时下载图标引用

### 使用步骤：

1. 首先在 `src/data/navLinks.js` 中添加好新网站或分类
2. 一键执行：
```bash
# 终端复制粘贴回车
npx tsx .\icon-system\0icon.ts
```

## 🔗 修改友情链接和按钮

## ✅使用vscode搜索文本`记得修改`可快速找到全部需要自定义的内容(强烈建议已经全部标注好)

### 修改友情链接和页脚声明

位于页脚组件中，修改 `src/components/Footer.astro` 文件：
- 点开文件一目了然
## 修改网站大标题(名称)和logo

修改`src\components\LogoName.astro`
- 独立出来方便修改,点开文件一目了然

### 修改全部图标

- `default.svg`导航网站三级回退机制保底图标
- `logo.png`网站社交媒体分享图片
- `logo.svg`网站主图标
1. 准备您的图标文件(修改图片,但使用固定命名)
2. 替换图标文件放入 `public\images` 目录即可

### 提交站点地图
只需要向搜索引擎提交 `https://xxx.com/sitemap-index.xml` 这一个文件

---
```
感谢项目使用的全部API
Feather,Simple,Iconify,DuckDuckGo,Unavatar,myip.la,openweathermap.org,Clearbit,Logo
```
🌟 **Zywe导航站** - 让您的网络世界更有序、更高效！
意见与反馈可使用📧 联系我：[电子邮箱](mailto:zywe03@qq.com)