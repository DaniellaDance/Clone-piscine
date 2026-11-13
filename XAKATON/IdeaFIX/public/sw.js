const CACHE='ideafix-shell-content-translate-v45';
const files=['./assets/upgrade-ui.js','./assets/world-map.svg','./index.html','./mobile.html','./desktop.html','./install.html','./assets/bitrix-account.js','./assets/planner.js','./assets/idea-actions.js','./assets/app.js','./assets/push-ui.js','./assets/channel-ui.js','./assets/chat.js','./assets/organization.js','./assets/pilot-ui.js','./assets/marck-script.ttf','./assets/voice.js','./assets/meetings.js','./assets/print.css','./assets/print.js','./assets/bitrix-ui.js','./assets/daily-quotes.js','./assets/catalog.js','./assets/catalog-ui.js','./assets/translations.js','./assets/i18n.js','./assets/styles.css','./assets/manrope.woff2','./assets/noto-sans.woff2','./assets/fix-idea-logo.webp','./assets/brand-mark.svg','./assets/alpine-route.svg','./assets/alpine-hero.webp','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(files)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ideafix-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/api/'))return;
 const isAppCode=e.request.mode==='navigate'||/\\.(?:html|js|css)$/.test(u.pathname);
 if(isAppCode){e.respondWith(fetch(e.request,{cache:'no-store'}));return}
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone)).catch(()=>{})}return r}).catch(()=>caches.match(e.request).then(r=>r||Response.error())));
});

self.addEventListener('push',event=>{let p={};try{p=event.data?.json()||{}}catch{}event.waitUntil(self.registration.showNotification(p.title||'IdeaFix',{body:p.body||'Новое уведомление',icon:'/assets/icon-192.png',badge:'/assets/icon-192.png',tag:p.tag||'ideafix',data:{url:p.url||'/'},requireInteraction:!!p.urgent,renotify:!!p.urgent,vibrate:p.urgent?[200,100,200]:[150]}))});
self.addEventListener('notificationclick',event=>{event.notification.close();let url=new URL(event.notification.data?.url||'/',self.location.origin);if(url.origin!==self.location.origin)url=new URL('/',self.location.origin);event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(async windows=>{const client=windows.find(c=>new URL(c.url).origin===url.origin);if(client){await client.navigate(url.href);return client.focus()}return clients.openWindow(url.href)}))});


