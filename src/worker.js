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

    return new Response('Not Found', { status: 404 });
  },
};