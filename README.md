# 全网VIP视频解析聚合

基于 Cloudflare Workers 的视频解析聚合服务，聚合了全网多个免费解析接口。

## 手动部署

### 方式一：Cloudflare Dashboard 网页部署（无需命令行）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，点击左侧菜单「Workers 和 Pages」
2. 点击「创建」→「创建 Worker」
3. 输入 Worker 名称（如 `video-parse`），点击「部署」
4. 部署完成后点击「编辑代码」
5. 打开 [src/worker.js](src/worker.js)，复制全部代码，粘贴替换到在线编辑器中
6. 点击右上角「部署」，确认后即可生效

部署完成后即可通过 `https://video-parse.<你的子域>.workers.dev` 访问。

### 方式二：本地命令行部署（需要 Node.js）

1. 克隆仓库：

```bash
git clone https://github.com/HJGSfz68/video-parse.git
cd video-parse
```

2. 安装依赖：

```bash
npm install
```

3. 登录 Cloudflare：

```bash
npx wrangler login
```

4. 部署：

```bash
npm run deploy
```

## 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/HJGSfz68/video-parse)

点击上方按钮，授权 Cloudflare 后即可一键部署。

## API 接口

### 获取解析源列表

```
GET /api/sources
```

返回所有可用解析源：

```json
{
  "code": 0,
  "message": "success",
  "data": [
    { "id": 0, "name": "虾米CC (推荐)", "type": "1,3", "url": "https://jx.xmflv.cc/?url=" }
  ]
}
```

### 获取播放地址

```
GET /api/play?url=<视频URL>&source=<解析源ID>
```

返回指定解析源拼接后的播放地址：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "source": "虾米CC (推荐)",
    "parseUrl": "https://jx.xmflv.cc/?url=https%3A%2F%2Fv.qq.com%2Fxxx%2Fxxx.html"
  }
}
```

## 使用说明

- 访问部署后的首页，添加 `?url=` 参数即可播放，例如：`https://your-worker.workers.dev/?url=https://v.qq.com/xxx/xxx.html`
- 页面左上角下拉框可切换解析源

## 本地开发

```bash
npx wrangler dev
```

## 部署

```bash
npx wrangler deploy
```

## 项目结构

```
├── wrangler.toml        # Cloudflare Workers 配置
└── src/
    └── worker.js        # Worker 脚本（含 API + 解析源列表 + 前端页面）
```

## 免责声明

本项目仅供学习交流使用，请遵守相关法律法规。解析接口来自公开网络，请合理使用。如涉及版权问题，请及时联系删除。
