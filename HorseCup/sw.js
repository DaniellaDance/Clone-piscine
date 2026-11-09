const CACHE='horsecup-shell-v54-joke-circle';const FILES=['./','./styles.css','./js/game.js','./js/horses.js','./js/jokes.js','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('horsecup-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.includes('/api/')||u.pathname.includes('/downloads/'))return;
 e.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(/\.(webp|png|gif)$/.test(u.pathname)){const cached=await cache.match(e.request);if(cached)return cached;}
  try{const r=await fetch(e.request);if(r.ok)await cache.put(e.request,r.clone());return r;}
  catch{const cached=await cache.match(e.request);if(cached)return cached;if(e.request.mode==='navigate')return(await cache.match('./'))||Response.error();return Response.error();}
 })());
});
