const videoParseList = [
  { name: "虾米CC (推荐)", type: "1,3", url: "https://jx.xmflv.cc/?url=" },
  { name: "789 (推荐)", type: "1,3", url: "https://jiexi.789jiexi.icu:4433/?url=" },
  { name: "789备用 (推荐)", type: "1,3", url: "https://jiexi.789jiexi.com/?url=" },
  { name: "Fongmi (推荐)", type: "1,3", url: "https://json.fongmi.cc/web?url=" },
  { name: "剖元 (推荐)", type: "1,3", url: "https://www.pouyun.com/?url=" },
  { name: "盘古 (推荐)", type: "1,3", url: "https://www.pangujiexi.com/jiexi/?url=" },
  { name: "CK (推荐)", type: "1,3", url: "https://www.ckplayer.vip/jiexi/?url=" },
  { name: "七七云 (推荐)", type: "1,3", url: "https://jx.77flv.cc/?url=" },
  { name: "OK解析 (推荐)", type: "1,3", url: "https://okjx.cc/?url=" },
  { name: "虾米", type: "1,3", url: "https://jx.xmflv.com/?url=" },
  { name: "Player-JY", type: "1,3", url: "https://jx.playerjy.com/?url=" },
  { name: "咸鱼", type: "1,3", url: "https://jx.xyflv.cc/?url=" },
  { name: "playm3u8", type: "1,3", url: "https://www.playm3u8.cn/jiexi.php?url=" },
  { name: "爱豆", type: "1,3", url: "https://jx.aidouer.net/?url=" },
  { name: "夜幕", type: "1,3", url: "https://www.yemu.xyz/?url=" },
  { name: "冰豆", type: "1,3", url: "https://bd.jx.cn/?url=" },
  { name: "Qianqi", type: "1,3", url: "https://api.qianqi.net/vip/?url=" },
  { name: "52jiexi", type: "1,3", url: "https://api.52jiexi.top/?url=" },
  { name: "attakids", type: "1,3", url: "https://jsap.attakids.com/?url=" },
  { name: "xymav", type: "1,3", url: "https://www.xymav.com/?url=" },
  { name: "ckmov", type: "1,3", url: "https://www.ckmov.com/?url=" },
  { name: "8090", type: "1,3", url: "https://www.8090g.cn/jiexi/?url=" },
  { name: "HLS", type: "1,3", url: "https://jx.hls.one/?url=" },
  { name: "极速", type: "1,3", url: "https://jx.2s0.cn/player/?url=" },
  { name: "风影阁", type: "1,3", url: "https://movie.heheda.top/?v=" },
  { name: "4K解析", type: "1,3", url: "https://jx.4kdv.com/?url=" },
  { name: "百域", type: "1,3", url: "https://jx.618g.com/?url=" },
  { name: "yparse新 (带选集)", type: "1,2", url: "https://yparse.ik9.cc/index.php?url=" },
  { name: "yparse (带选集)", type: "1,2", url: "https://jx.yparse.com/index.php?url=" },
  { name: "m1907 (带选集)", type: "1,2", url: "https://im1907.top/?jx=" },
  { name: "m1907镜像 (带选集)", type: "1,2", url: "https://z1.im1907.top/?&jx=" },
];

const INDEX_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>视频解析</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }

#sourceSelect {
  position: fixed; top: 12px; left: 12px; z-index: 100;
  padding: 5px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2);
  background: rgba(30,30,50,0.85); color: #e0e0e0; font-size: 12px;
  outline: none; cursor: pointer; max-width: 180px;
  backdrop-filter: blur(4px);
}
#sourceSelect:focus { border-color: #2ea3f0; }
#sourceSelect option { background: #3f4149; color: #e0e0e0; }

#playerFrame { width: 100%; height: 100%; border: none; display: block; }
#placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #444; font-size: 14px; }
</style>
</head>
<body>

<select id="sourceSelect"></select>
<iframe id="playerFrame" allowfullscreen allow="autoplay;fullscreen;encrypted-media;picture-in-picture"></iframe>
<div id="placeholder">请在 URL 后添加 ?url= 参数</div>

<script>
const src = new URLSearchParams(location.search).get('url');

fetch('/api/sources').then(r => r.json()).then(result => {
  if (result.code !== 0) return;
  const sel = document.getElementById('sourceSelect');
  sel.innerHTML = result.data.map((s, i) =>
    '<option value="' + i + '">' + s.name + '</option>'
  ).join('');
  if (src) play();
});

function play() {
  const url = src, sourceId = document.getElementById('sourceSelect').value;
  document.getElementById('placeholder').style.display = 'none';
  fetch('/api/play?url=' + encodeURIComponent(url) + '&source=' + sourceId).then(r => r.json()).then(result => {
    if (result.code === 0) document.getElementById('playerFrame').src = result.data.parseUrl;
  });
}

document.getElementById('sourceSelect').addEventListener('change', () => { if (src) play(); });
<\/script>
</body>
</html>`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/sources') {
      return json({
        code: 0,
        message: 'success',
        data: videoParseList.map((s, i) => ({ id: i, name: s.name, type: s.type, url: s.url })),
      });
    }

    if (path === '/api/play') {
      const videoUrl = url.searchParams.get('url');
      const source = parseInt(url.searchParams.get('source'), 10);
      if (!videoUrl) {
        return json({ code: 1, message: '参数 url 不能为空' });
      }
      const idx = (!isNaN(source) && source >= 0 && source < videoParseList.length) ? source : 0;
      const parseUrl = videoParseList[idx].url + encodeURIComponent(videoUrl);
      return json({
        code: 0,
        message: 'success',
        data: { source: videoParseList[idx].name, parseUrl },
      });
    }

    if (path === '/') {
      return new Response(INDEX_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};