
const cacheName = 'pravoslavlje-v6';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './svetitelji.json',
  './ikona.png',
  './papir.jpg',
  './papir.png',
  './psaltir.html',
  './molitvenik.html',
  './novi-zavet.html',
  './ohridski-prolog.html',
  './duhovne-pouke.html',
  './duhovne-poucne-price.html',
  './praznici.html',
  './post-i-trapave-sedmice.html',
  './vaskrsnji-kalendar.html',
  './januar-2026.html',
  './februar-2026.html',
  './mart-2026.html',
  './april-2026.html',
  './maj-2026.html',
  './jun-2026.html',
  './jul-2026.html',
  './avgust-2026.html',
  './septembar-2026.html',
  './oktobar-2026.html',
  './novembar-2026.html',
  './decembar-2026.html',
  './prolog-januar.html',
  './prolog-februar.html',
  './prolog-mart.html',
  './prolog-april.html',
  './prolog-maj.html',
  './prolog-jun.html',
  './prolog-jul.html',
  './prolog-avgust.html',
  './prolog-septembar.html',
  './prolog-oktobar.html',
  './prolog-novembar.html',
  './prolog-decembar.html'
];

// 1. Instalacija
self.addEventListener('install', evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. Aktivacija
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch (Usisivač)
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(cacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('./index.html');
      }
    })
  );
});
