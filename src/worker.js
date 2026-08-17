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
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#000">
<title>视频解析</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }
body { -webkit-tap-highlight-color: transparent; }

#topBar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; gap: 8px;
  padding: max(10px, env(safe-area-inset-top)) 10px 10px;
  background: linear-gradient(180deg, rgba(0,0,0,0.75), transparent);
  pointer-events: none;
}
#topBar > * { pointer-events: auto; }

#sourceSelect {
  flex: 0 1 auto; min-width: 0; max-width: 45vw;
  padding: 8px 10px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(25,28,45,0.92); color: #e8e8f0; font-size: 13px;
  outline: none; cursor: pointer; backdrop-filter: blur(6px);
}
#sourceSelect:focus { border-color: #2ea3f0; }
#sourceSelect option { background: #2a2d3a; color: #e8e8f0; }

#curSource {
  flex: 1 1 auto; min-width: 0; max-width: 50vw;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  color: #9ecbff; font-size: 12px; text-align: right;
}

#playerFrame { width: 100%; height: 100%; border: none; display: block; }
#placeholder {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 100%; height: 100%; color: #555; font-size: 14px; gap: 8px;
}
#placeholder small { color: #444; font-size: 12px; }
</style>
</head>
<body>

<div id="topBar">
  <select id="sourceSelect"></select>
  <span id="curSource"></span>
</div>
<iframe id="playerFrame" allowfullscreen allow="autoplay;fullscreen;encrypted-media;picture-in-picture"></iframe>
<div id="placeholder">请在 URL 后添加 ?url= 参数<small>手机端点击视频可全屏播放</small></div>

<script>
const src = new URLSearchParams(location.search).get('url');
const sel = document.getElementById('sourceSelect');
const cur = document.getElementById('curSource');
const frame = document.getElementById('playerFrame');
const ph = document.getElementById('placeholder');

fetch('/api/sources').then(r => r.json()).then(result => {
  if (result.code !== 0) return;
  sel.innerHTML = result.data.map((s, i) =>
    '<option value="' + i + '">' + s.name + '</option>'
  ).join('');
  if (src) play();
});

function play() {
  const url = src, sourceId = sel.value;
  ph.style.display = 'none';
  fetch('/api/play?url=' + encodeURIComponent(url) + '&source=' + sourceId).then(r => r.json()).then(result => {
    if (result.code === 0) {
      frame.src = result.data.parseUrl;
      sel.value = String(result.data.sourceId || sourceId);
      cur.textContent = '当前解析源：' + result.data.source;
    } else {
      cur.textContent = result.message || '解析失败';
    }
  });
}

sel.addEventListener('change', () => { if (src) play(); });
<\/script>
</body>
</html>`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
  });
}

const PLATFORMS = [
  { id: 'tencent', name: '腾讯视频' },
  { id: 'iqiyi', name: '爱奇艺' },
  { id: 'youku', name: '优酷' },
  { id: 'mgtv', name: '芒果TV' },
  { id: 'bilibili', name: '哔哩哔哩' },
];

async function searchPlatform(platform, keyword) {
  const kw = encodeURIComponent(keyword);
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

  async function getJson(url, extraHeaders = {}) {
    const resp = await fetch(url, {
      headers: { 'User-Agent': ua, 'Accept': 'application/json', ...extraHeaders },
    });
    const text = await resp.text();
    try { return JSON.parse(text); } catch (e) { return text; }
  }

  function stripHtml(s) {
    return String(s || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  }

  switch (platform) {
    case 'bilibili': {
      let d = null;
      for (let i = 0; i < 3; i++) {
        try {
          const resp = await fetch(`https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${kw}`, {
            headers: { 'User-Agent': ua, 'Referer': 'https://www.bilibili.com/', 'Accept': 'application/json, text/plain, */*' },
          });
          const j = await resp.json();
          if (j && j.data && j.data.result) { d = j; break; }
        } catch (e) {}
      }
      const list = (d && d.data && d.data.result) || [];
      return list.slice(0, 10).map(v => ({
        title: stripHtml(v.title),
        url: v.arcurl || ('https://www.bilibili.com/video/' + v.bvid),
        source: v.author || '',
      }));
    }
    case 'tencent': {
      let d = null;
      for (let i = 0; i < 5; i++) {
        try {
          const resp = await fetch('https://pbaccess.video.qq.com/trpc.videosearch.mobile_search.MultiTerminalSearch/MbSearch?vversion_platform=2&query=' + kw, {
            method: 'POST',
            headers: { 'User-Agent': ua, 'Content-Type': 'application/json', 'Referer': 'https://v.qq.com/x/search/', 'Origin': 'https://v.qq.com' },
            body: JSON.stringify({ query: keyword, scene: 'search', offset: 0, limit: 10, queryId: Date.now() + 'a', video_platform: 2, adult: 1, is_hot: 0 }),
          });
          const j = await resp.json();
          if (j.data && j.data.normalList && j.data.normalList.itemList) { d = j; break; }
        } catch (e) {}
      }
      if (!d) return [];
      const items = d.data.normalList.itemList || [];
      const out = [];
      for (const it of items.slice(0, 10)) {
        const doc = it.doc || {};
        const vi = it.videoInfo || {};
        const title = stripHtml(vi.title);
        if (!title) continue;
        const cid = doc.id || '';
        out.push({ title, url: 'https://v.qq.com/x/cover/' + cid + '.html', source: vi.typeName || '' });
      }
      return out;
    }
    case 'iqiyi': {
      let d = null, err = '';
      for (const url of [
        `https://search.video.iqiyi.com/o?if=search&pageNum=1&pageSize=10&q=${kw}`,
        `https://search.video.iqiyi.com/o?if=ctr&pageNum=1&pageSize=10&q=${kw}`,
      ]) {
        try {
          const resp = await fetch(url, { headers: { 'User-Agent': ua, 'Accept': 'application/json, text/plain, */*', 'Referer': 'https://www.iqiyi.com/' } });
          const text = await resp.text();
          try { d = JSON.parse(text); } catch (e) { err = '非JSON响应'; continue; }
          if (d && d.code === 'A00000' && Array.isArray(d.data)) break;
          err = JSON.stringify(d).slice(0, 120);
        } catch (e) { err = e.message; }
      }
      if (!d) throw new Error('爱奇艺搜索失败: ' + err);
      const items = d.data || [];
      return items.slice(0, 10).map(v => {
        const vi = v.videoInfo || v;
        return {
          title: stripHtml(vi.title || vi.name || v.name),
          url: vi.url || v.url || v.playUrl || ('https://www.iqiyi.com/v_' + (vi.vid || v.vid || '')),
          source: stripHtml(vi.channelName || ''),
        };
      });
    }
    case 'youku': {
      let d = null, err = '';
      for (const url of [
        `https://search.youku.com/api/youku/search/query?keyword=${kw}&type=all&page=1&count=10`,
        `https://s.youku.com/api/youku/search/query?keyword=${kw}&type=all&page=1&count=10`,
      ]) {
        try {
          const resp = await fetch(url, { headers: { 'User-Agent': ua, 'Accept': 'application/json, text/plain, */*', 'Referer': 'https://so.youku.com/' }, redirect: 'follow' });
          const text = await resp.text();
          try { d = JSON.parse(text); } catch (e) { err = '非JSON响应'; continue; }
          if (d && (d.data || d.results)) break;
          err = JSON.stringify(d).slice(0, 120);
        } catch (e) { err = e.message; }
      }
      if (!d) throw new Error('优酷搜索失败: ' + err);
      const list = (d.data || d.results || []);
      const items = Array.isArray(list) ? list : (list.videoList || []);
      return items.slice(0, 10).map(v => ({
        title: stripHtml(v.title || v.name),
        url: v.url || v.playUrl || v.videoUrl || ('https://v.youku.com/v_show/id_' + (v.id || v.vid || '') + '.html'),
        source: '',
      }));
    }
    case 'mgtv': {
      let d = null, err = '';
      for (const url of [
        `https://mobileso.bz.mgtv.com/so/kd?site=web&keyword=${kw}&count=10`,
        `https://so.mgtv.com/so/kd?site=web&keyword=${kw}&count=10`,
      ]) {
        try {
          const resp = await fetch(url, { headers: { 'User-Agent': ua, 'Accept': 'application/json, text/plain, */*', 'Referer': 'https://so.mgtv.com/' } });
          const text = await resp.text();
          try { d = JSON.parse(text); } catch (e) { err = '非JSON响应(可能需JS渲染)'; continue; }
          if (d && (d.data || d.code === 200)) break;
          err = JSON.stringify(d).slice(0, 120);
        } catch (e) { err = e.message; }
      }
      if (!d) throw new Error('芒果搜索失败: ' + err);
      const list = (d.data && (d.data.videos || d.data.list || d.data.result)) || [];
      return list.slice(0, 10).map(v => ({
        title: stripHtml(v.name || v.title),
        url: v.url || v.playUrl || ('https://www.mgtv.com/b/' + (v.id || '')),
        source: '',
      }));
    }
    default:
      throw new Error('不支持的平台: ' + platform);
  }
}

// 腾讯 cover 专辑链接规范化为 x/page/{vid}.html（解析源对 page 链接支持更好）
async function normalizeTencentUrl(u) {
  const m = u.match(/v\.qq\.com\/x\/cover\/([a-z0-9]+)\.html/i);
  if (!m) return u;
  try {
    const resp = await fetch(u, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0', 'Referer': 'https://v.qq.com/' },
    });
    const html = await resp.text();
    const v = html.match(/"vid"\s*:\s*"([a-z0-9]+)"/i);
    if (v && v[1]) return 'https://v.qq.com/x/page/' + v[1] + '.html';
  } catch (e) {}
  return u;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/platforms') {
      return json({ code: 0, message: 'success', data: PLATFORMS });
    }

    if (path === '/api/search') {
      const platform = url.searchParams.get('platform');
      const keyword = url.searchParams.get('keyword');
      if (!platform || !keyword) {
        return json({ code: 1, message: '参数 platform 和 keyword 不能为空' });
      }
      try {
        const data = await searchPlatform(platform, keyword);
        if (!data || data.length === 0) {
          return json({ code: 2, message: '未搜索到结果' });
        }
        return json({ code: 0, message: 'success', data: data.map((v, i) => ({ id: i + 1, ...v })) });
      } catch (e) {
        return json({ code: 1, message: '搜索失败: ' + e.message });
      }
    }

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
      // 腾讯 cover 专辑链接转换为 x/page 播放页，提高解析成功率
      const normalized = await normalizeTencentUrl(videoUrl);
      const parseUrl = videoParseList[idx].url + encodeURIComponent(normalized);
      return json({
        code: 0,
        message: 'success',
        data: { source: videoParseList[idx].name, parseUrl, normalized },
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