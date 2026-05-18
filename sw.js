const cacheName = 'pravoslavna-riznica-final-v56';
const assets = [
  './',
  './index.html',
  './molitvenik.html',
  './psaltir.html',
  './kalendar.html',
  './prolog.html',
  './novizavet.html',
  './stil.css',
  './skripta.js',
  './manifest.json',
  './ikona.png',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png'
];

// 1. Instalacija - sada uspešno zaključava svih 13 fajlova jer su nazivi 100% tačni!
self.addEventListener('install', evt => {
  self.skipWaiting(); 
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Skladištim kostur Riznice u keš...');
      return cache.addAll(assets);
    })
  );
});

// 2. Aktivacija i čišćenje starih verzija
self.addEventListener('activate', evt => {
  evt.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(keys => {
        return Promise.all(keys
          .filter(key => key !== cacheName)
          .map(key => caches.delete(key))
        );
      })
    ])
  );
});

// 3. Fetch - Pametni imuni usisivač koji ignoriše Google Drive i čuva tvoj sajt
self.addEventListener('fetch', evt => {
  if (!evt.request.url.startsWith('http')) return;

  // Spas za Google Drive audio fajlove
  if (evt.request.url.includes('google.com') || evt.request.url.includes('googleusercontent.com')) {
    return; 
  }

  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      if (cacheRes) return cacheRes;

      return fetch(evt.request).then(fetchRes => {
        if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic') {
          return fetchRes;
        }

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
