const cacheName = 'pravoslavna-riznica-final-v55';
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
  './ikona192.png'
];

// 1. Instalacija - sada je munjevita jer ima samo 11 fajlova Kostura
self.addEventListener('install', evt => {
  self.skipWaiting(); 
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Skladištim kostur Riznice u keš...');
      return cache.addAll(assets);
    })
  );
});

// 2. Aktivacija i čišćenje starih verzija (da otkočimo "Loading...")
self.addEventListener('activate', evt => {
  evt.waitUntil(
    Promise.all([
      self.clients.claim(), // Prisiljava telefon da odmah sluša ovaj novi kod
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
  // Ignorišemo zahteve koji nisu HTTP/HTTPS (npr. chrome-extension ili apple protokoli koji baguju iOS)
  if (!evt.request.url.startsWith('http')) return;

  // SPAS ZA GOOGLE DRIVE: Ako zahtev ide ka Google-u ili Drive-u, pusti ga direktno na net, NE POKUŠAVAJ DA GA USISAŠ!
  if (evt.request.url.includes('google.com') || evt.request.url.includes('googleusercontent.com')) {
    return; // Service Worker se sklanja s puta, muzika svira onlajn, nema pucanja koda!
  }

  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      
      // Ako je već u memoriji, daj ga odmah (brzina za offline!)
      if (cacheRes) return cacheRes;

      // Ako nije u memoriji, skini ga sa neta
      return fetch(evt.request).then(fetchRes => {
        
        // Ako server vrati grešku (npr. 404), nemoj to da stavljaš u keš
        if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic') {
          return fetchRes;
        }

        // Ako je sve u redu i fajl je naš (sa GitHub-a), zapamti ga za offline
        return caches.open(cacheName).then(cache => {
          // Ovde se dešava magija: tvoj klik na Mateja ili Januar se ovde tiho snima
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => {
      // Ako nema neta, a traži se HTML stranica koja nije snimljena, baci na početnu
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('./index.html');
      }
    })
  );
});
