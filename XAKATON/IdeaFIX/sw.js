/* IdeaFix — service worker.
   Задача: приложение открывается с домашнего экрана телефона и работает без сети
   (в цехе, на складе, в лифте связь пропадает). Стратегии простые:
   - переходы между страницами: сначала сеть, при отсутствии сети — копия из кэша;
   - ресурсы (стили, скрипты, иконки): сначала кэш, в фоне обновляем.
   Данные пользователя лежат в localStorage, его service worker не трогает. */

const CACHE = 'ideafix-v1';
const ASSETS = [
  './',
  './index.html',
  './mobile.html',
  './desktop.html',
  './manifest.webmanifest',
  './assets/styles.css',
  './assets/mobile.css',
  './assets/app.js',
  './assets/mobile.js',
  './assets/seed.js',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  // Кэшируем по одному файлу и не падаем, если какой-то адрес отдаёт редирект:
  // приложение должно устанавливаться даже при частичном сбое прогрева кэша.
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.allSettled(ASSETS.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./mobile.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
