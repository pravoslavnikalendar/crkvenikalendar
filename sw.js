const cacheName = 'pravoslavna-riznica-final-v54';
// Ovde ostavljamo SAMO glavne ulaze i kostur aplikacije
const assets = [
  './',
  './index.html',
  './psaltir.html',
  './molitvenik.html',
  './novi-zavet.html',
  './ohridski-prolog.html',
  './duhovne-pouke.html',
  './duhovne-poucne-price.html',
  './praznici.html',
  './post-i-trapave-sedmice.html',
  './vaskrsnji-kalendar.html'
  // SVA JEVANĐELJA, MESECE I ŽITIJA SMO SKLONILI ODAVDE. 
  // Oni ostaju na GitHubu, a aplikacija će ih sama naučiti u hodu!
];

// Instalacija - sada je munjevita jer ima samo 11 fajlova
self.addEventListener('install', evt => {
  self.skipWaiting(); 
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Skladištim kostur Riznice u keš...');
      return cache.addAll(assets);
    })
  );
});

// Aktivacija i čišćenje starih verzija (da otkočimo "Loading...")
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

// Fetch - Tvoj pametni kod koji sada radi bez opterećenja
self.addEventListener('fetch', evt => {
  // Ignorišemo zahteve koji nisu HTTP/HTTPS (npr. chrome-extension ili apple protokoli koji baguju iOS)
  if (!evt.request.url.startsWith('http')) return;

  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      
      // Ako je već u memoriji, daj ga odmah (brzina za offline!)
      return cacheRes || fetch(evt.request).then(fetchRes => {
        
        // Ako nije u memoriji, skini ga sa neta i ODMAH zapamti za offline
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
