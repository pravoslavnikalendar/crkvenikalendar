
const cacheName = 'pravoslavlje-v3'; // Promenili smo verziju na v3 da bi telefon znao da treba ponovo da učita
const assets = [
  './',
  './index.html',
  './manifest.json',
  './ikona.png',
  './ikona192.png',
  './ikona512.png',
  './papir.png'
];

// Instalacija i čuvanje fajlova u keš
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Skladištenje fajlova za offline rad...');
      return cache.addAll(assets);
    })
  );
});

// Aktivacija i brisanje starog keša
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

// Ključni deo: Omogućava da se sajt otvori bez interneta
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).catch(() => {
        if (evt.request.url.indexOf('.html') > -1) {
          return caches.match('./index.html');
        }
      });
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
