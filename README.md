# 全网VIP视频解析聚合

基于 Cloudflare Workers 的视频解析聚合服务，聚合了全网多个免费解析接口。

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
├── src/
│   └── worker.js        # Worker 脚本（含 API + 解析源列表）
└── public/
    └── index.html       # 前端页面
```

## 免责声明

本项目仅供学习交流使用，请遵守相关法律法规。解析接口来自公开网络，请合理使用。如涉及版权问题，请及时联系删除。
