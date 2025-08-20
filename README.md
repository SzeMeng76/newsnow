![NewsNow Logo](/public/og-image.png)

# NewsNow - 优雅的实时热点新闻聚合阅读器

> 🔥 **演示站点**: [https://newsnow.smone.us/](https://newsnow.smone.us/)

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja-JP.md)

> **注意**: 这是 [@SzeMeng76](https://github.com/SzeMeng76) fork 的版本，原项目由 [@ourongxing](https://github.com/ourongxing) 开发

**_优雅阅读实时与最热新闻_**

## ✨ 核心功能

### 🎯 新闻聚合
- **多源聚合**: 整合70+主流中文新闻源，包括知乎、微博、哔哩哔哩、GitHub、V2EX等
- **智能分类**: 按国内、国际、科技、财经四大类别自动分类
- **实时更新**: 根据新闻源更新频率自适应抓取间隔(最短2分钟)
- **热点追踪**: 支持实时热点与最热内容双重展示

### 🎨 用户体验
- **优雅设计**: 简洁现代的UI界面，专为舒适阅读体验而设计
- **响应式布局**: 完美适配桌面端、平板和移动端
- **暗黑模式**: 支持自动/手动切换暗黑主题
- **PWA支持**: 可作为原生应用安装到设备

### 🔐 账户系统
- **GitHub OAuth**: 安全便捷的登录方式
- **数据同步**: 登录用户的自定义配置云端同步
- **个性化**: 自定义关注源，拖拽排序
- **缓存控制**: 登录用户可强制刷新，获取最新内容

### 🤖 智能集成
- **MCP服务器**: 支持Claude等AI工具的MCP协议集成
- **API接口**: 提供标准化的新闻数据API
- **代理服务**: 内置图片代理，解决访问限制问题

## 🚀 技术架构

### 前端技术栈
- **React 19** + **TypeScript** - 现代化的前端开发体验
- **Vite** - 极速的构建工具
- **UnoCSS** - 原子化CSS框架
- **TanStack Router** - 类型安全的路由管理
- **TanStack Query** - 强大的数据获取和缓存
- **Jotai** - 轻量级状态管理
- **Framer Motion** - 流畅的动画效果

### 后端技术栈
- **Nitro** - 全栈框架，支持多平台部署
- **H3** - 轻量级Web框架
- **Cheerio** - 服务端DOM解析
- **Better SQLite3** - 高性能数据库
- **DB0** - 统一的数据库抽象层

### 部署支持
- **Vercel** - 边缘计算部署
- **Cloudflare Pages** - 全球CDN加速
- **Docker** - 容器化部署
- **Node.js** - 传统服务器部署

## 📦 快速部署

### Vercel 部署 (推荐)

#### 方法一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSzeMeng76%2Fnewsnow)

#### 方法二：手动部署

1. **Fork 并克隆项目**
   ```bash
   git clone https://github.com/SzeMeng76/newsnow.git
   cd newsnow
   ```

2. **在 Vercel 中配置项目**
   - 登录 [Vercel 控制台](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 导入你 fork 的 GitHub 仓库
   - 配置以下构建设置：

   **构建与部署设置：**
   ```
   Framework Preset: Other
   Build Command: pnpm run build
   Output Directory: dist/output/public
   Install Command: pnpm install
   Node.js Version: 20.x
   ```

3. **环境变量配置**
   在 Vercel 项目设置的 Environment Variables 中添加：

   ```env
   # 必需的环境变量
   VERCEL=1
   INIT_TABLE=true
   ENABLE_CACHE=true
   
   # GitHub OAuth (可选，用于登录功能)
   G_CLIENT_ID=你的GitHub应用Client_ID
   G_CLIENT_SECRET=你的GitHub应用Client_Secret
   JWT_SECRET=你的JWT签名密钥
   ```

4. **GitHub OAuth 设置** (可选但推荐)

   如需启用用户登录和数据同步功能：

   a) 创建 GitHub OAuth 应用：
   - 访问 [GitHub Developer Settings](https://github.com/settings/applications/new)
   - 填写应用信息：
     ```
     Application name: NewsNow
     Homepage URL: https://你的域名.vercel.app
     Authorization callback URL: https://你的域名.vercel.app/api/oauth/github
     ```
   
   b) 获取 Client ID 和 Client Secret
   c) 将其添加到 Vercel 环境变量中

5. **数据库配置**
   - Vercel 部署默认使用内存数据库（重启后数据丢失）
   - 生产环境推荐使用 [Vercel Postgres](https://vercel.com/storage/postgres) 或其他在线数据库
   - 如需使用外部数据库，请参考 [db0 连接器文档](https://db0.unjs.io/connectors)

6. **部署完成**
   - 点击 "Deploy" 开始构建
   - 构建完成后即可访问你的 NewsNow 应用

#### 自动配置

项目使用 **Nitro 框架**的 `vercel-edge` 预设，会自动生成正确的 Vercel 配置。

**无需手动创建 vercel.json 文件**，Nitro 会在构建时自动处理：
- 服务端函数配置
- 路由重写规则  
- 静态文件托管
- 边缘计算优化

### Cloudflare Pages 部署

1. **配置 wrangler.toml**
   ```toml
   name = "newsnow"
   pages_build_output_dir = "dist/output/public"
   compatibility_date = "2024-10-03"
   
   [[d1_databases]]
   binding = "NEWSNOW_DB"
   database_name = "newsnow-db"
   database_id = "你的D1数据库ID"
   ```

2. **环境变量**
   ```env
   CF_PAGES=1
   G_CLIENT_ID=GitHub_Client_ID
   G_CLIENT_SECRET=GitHub_Client_Secret  
   JWT_SECRET=JWT签名密钥
   INIT_TABLE=true
   ENABLE_CACHE=true
   ```

3. **部署步骤**
   ```bash
   # 安装 Wrangler CLI
   npm install -g wrangler
   
   # 登录 Cloudflare
   wrangler login
   
   # 创建 D1 数据库
   wrangler d1 create newsnow-db
   
   # 构建并部署
   npm run deploy
   ```

### Docker 部署

1. **使用 Docker Compose（推荐）**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     newsnow:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - G_CLIENT_ID=你的GitHub_Client_ID
         - G_CLIENT_SECRET=你的GitHub_Client_Secret
         - JWT_SECRET=你的JWT密钥
         - INIT_TABLE=true
         - ENABLE_CACHE=true
       volumes:
         - ./data:/app/data
       restart: unless-stopped
   ```

2. **启动服务**
   ```bash
   docker-compose up -d
   ```

3. **查看日志**
   ```bash
   docker-compose logs -f newsnow
   ```

### 传统服务器部署

1. **环境准备**
   ```bash
   # Ubuntu/Debian 系统
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # 启用 Corepack
   corepack enable
   
   # 安装 PM2 (进程管理器)
   npm install -g pm2
   ```

2. **部署步骤**
   ```bash
   # 克隆项目
   git clone https://github.com/SzeMeng76/newsnow.git
   cd newsnow
   
   # 安装依赖
   pnpm install
   
   # 配置环境变量
   cp example.env.server .env.server
   nano .env.server  # 编辑配置文件
   
   # 构建项目
   pnpm run build
   
   # 使用 PM2 启动
   pm2 start "node --env-file .env.server dist/output/server/index.mjs" --name newsnow
   
   # 设置开机自启
   pm2 startup
   pm2 save
   ```

3. **配置反向代理 (Nginx)**
   ```nginx
   # /etc/nginx/sites-available/newsnow
   server {
       listen 80;
       server_name 你的域名.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 📱 MCP服务器集成

NewsNow支持MCP(Model Context Protocol)协议，可与Claude等AI工具无缝集成：

```json
{
  "mcpServers": {
    "newsnow": {
      "command": "npx",
      "args": ["-y", "newsnow-mcp-server"],
      "env": {
        "BASE_URL": "https://newsnow.smone.us"
      }
    }
  }
}
```

将 `BASE_URL` 替换为你的部署域名即可使用。

## 🛠️ 本地开发

### 环境要求
- **Node.js**: >= 20.0.0
- **Package Manager**: pnpm (推荐) / npm / yarn

### 开发步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/SzeMeng76/newsnow.git
   cd newsnow
   ```

2. **安装依赖**
   ```bash
   corepack enable  # 启用 pnpm
   pnpm install
   ```

3. **配置环境**
   ```bash
   cp example.env.server .env.server
   # 根据需要编辑环境变量
   ```

4. **启动开发服务器**
   ```bash
   pnpm run dev
   ```

5. **访问应用**
   - 开发服务器: http://localhost:3000
   - API接口: http://localhost:3000/api

### 开发命令

```bash
# 开发模式
pnpm run dev

# 构建项目
pnpm run build

# 预览构建结果  
pnpm run preview

# 类型检查
pnpm run typecheck

# 代码检查
pnpm run lint

# 运行测试
pnpm run test

# 发布版本
pnpm run release
```

## 🔧 自定义新闻源

NewsNow 采用模块化架构，支持轻松添加新的新闻源。详细的新闻源开发指南请参考 [CONTRIBUTING.md](CONTRIBUTING.md)。

### 快速添加新闻源

1. **定义新闻源配置** (`shared/sources.json`)
2. **实现数据获取器** (`server/sources/example.ts`)
3. **添加图标文件** (`public/icons/example.png`)

## 📊 项目特性

### 🎯 新闻源覆盖
- **科技类**: GitHub、V2EX、少数派、IT之家、稀土掘金等
- **社交媒体**: 知乎、微博、哔哩哔哩、抖音、快手等
- **财经类**: 华尔街见闻、财联社、雪球、金十数据等
- **综合媒体**: 澎湃新闻、今日头条、百度热搜、虎扑等
- **国际新闻**: 联合早报、卫星通讯社、参考消息等

### ⚡ 性能优化
- **智能缓存**: 多层缓存策略，减少重复请求
- **增量更新**: 仅获取变更内容，节省带宽
- **懒加载**: 按需加载新闻内容，提升首屏速度
- **图片代理**: 内置图片代理服务，优化加载速度

### 🔒 隐私安全
- **无追踪**: 不收集用户隐私数据
- **开源透明**: 完整源代码公开
- **本地优先**: 支持完全本地部署
- **数据控制**: 用户数据完全自主可控

## 🗺️ 开发路线图

### 即将推出
- [ ] **多语言支持** - 英文、日文界面
- [ ] **个性化推荐** - 基于阅读历史的智能推荐
- [ ] **主题定制** - 更多主题选择与自定义选项
- [ ] **离线阅读** - PWA离线缓存支持
- [ ] **阅读统计** - 个人阅读数据统计分析

### 长期计划
- [ ] **国际新闻源** - 扩展英文、日文等多语言新闻源
- [ ] **社区功能** - 用户评论、分享、收藏
- [ ] **移动应用** - 原生移动应用开发
- [ ] **浏览器插件** - 快捷访问浏览器扩展
- [ ] **API开放** - 公开API供第三方集成

## 🤝 参与贡献

我们欢迎所有形式的贡献！

### 贡献方式
1. **Fork 本项目** 到你的 GitHub 账号
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交改动** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

详细的贡献指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 📄 开源协议

本项目采用 [MIT协议](./LICENSE) 开源。

## 👨‍💻 项目信息

### Fork 维护者
**SzeMeng76**
- GitHub: [@SzeMeng76](https://github.com/SzeMeng76)
- Fork Repository: [https://github.com/SzeMeng76/newsnow](https://github.com/SzeMeng76/newsnow)

### 原作者
**ourongxing**
- GitHub: [@ourongxing](https://github.com/ourongxing/)
- Email: orongxing@gmail.com
- Original Repository: [https://github.com/ourongxing/newsnow](https://github.com/ourongxing/newsnow)

## 🙏 致谢

感谢原作者 [@ourongxing](https://github.com/ourongxing) 开发了这个优秀的项目！

感谢所有为项目做出贡献的开发者和用户！

### 技术支持
- [Nitro](https://nitro.unjs.io/) - 全栈框架
- [UnoCSS](https://unocss.dev/) - 原子化CSS
- [TanStack](https://tanstack.com/) - 现代化React工具链
- [Vercel](https://vercel.com/) - 部署平台

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐️**

[🌟 Star](https://github.com/SzeMeng76/newsnow) | [🐛 报告问题](https://github.com/SzeMeng76/newsnow/issues) | [💡 功能建议](https://github.com/SzeMeng76/newsnow/discussions)

[📖 原项目](https://github.com/ourongxing/newsnow) | [🔗 演示站点](https://newsnow.smone.us/)

</div>