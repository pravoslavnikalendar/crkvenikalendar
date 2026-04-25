
const cacheName = 'pravoslavlje-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './ikona.png',
  './ikona192.png',
  './ikona512.png',
  './papir.png'
];

// Instalacija i čuvanje fajlova
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Skladištenje fajlova u keš...');
      return cache.addAll(assets);
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
