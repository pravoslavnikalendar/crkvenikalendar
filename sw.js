
const cacheName = 'pravoslavlje-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './ikona.png',
  './papir.png'
];

// Instalacija i čuvanje fajlova
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Otvaranje fajlova čak i kad nema interneta
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(rec => {
      return rec || fetch(evt.request);
    })
  );
});
