
const cacheName = 'pravoslavlje-v4'; // Povećali smo na v4 da telefon shvati promenu
const assets = [
  './',
  './index.html',
  './manifest.json',
  './svetitelji.json',
  './ikona.png',
  './ikona192.png',
  './ikona512.png',
  './papir.png'
];

// 1. Instalacija: Odmah preuzmi kontrolu i snimi osnovne fajlove
self.addEventListener('install', evt => {
  self.skipWaiting(); 
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Skladištenje osnovnih fajlova...');
      return cache.addAll(assets);
    })
  );
});

// 2. Aktivacija: Obriši stare verzije (v1, v2, v3) da ne troše prostor
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

// 3. Glavna magija: "Usisivač" koji pamti mesece i Prologe za offline rad
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      // Ako već imamo u memoriji (offline), vrati to.
      // Ako nemamo, idi na internet i usput snimi taj fajl za sledeći put!
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(cacheName).then(cache => {
          // Snimamo fajl (npr. maj-2026.html) u keš memoriju
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => {
      // Ako baš nema ni interneta ni tog fajla u memoriji, prikaži početnu
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('./index.html');
      }
    })
  );
});
