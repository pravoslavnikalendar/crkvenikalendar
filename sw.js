const cacheName = 'pravoslavlje-v7'; // Povećaj na v5 da telefon osveži memoriju
const assets = [
  './',
  './index.html',
  './manifest.json',
  './svetitelji.json',
  './ikona.png',
  './papir.jpg', 
  './papir.png', 
  './serafimi.png', 
  './matej.html',
  './marko.html',
  './luka.html',
  './jovan.html',
  './snaga.png',
  './pehar.png',
  './bogorodica.png',
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
  './prolog-decembar.html',
  // MOLITVE IZ MOLITVENIKA:
  './o-molitvi-sv-jovan-krostantski.html',
  './jutarnje-molitve.html',
  './molitveno-pravilo-serafima-sarovskog.html',
  './bogorodice-djevo.html',
  './simbol-vere.html',
  './molitva-za-decu.html',
  './molitva-za-roditelje.html',
  './molitva-za-otvorenje-uma.html',
  './molitva-svetog-filareta.html',
  './velikoposna-molitva-svetog-jefrema-sirina.html',
  './molitva-pokajnika.html',
  './molitve-andjelu-cuvaru.html',
  './molitva-isusu-hristu.html',
  './molitve-svetim-arhangelima-za-svaki-dan-u-nedelji.html',
  './molitve-presvetoj-bogorodici-za-svaki-dan-u-nedelji.html',
  './molitva-za-spasenje-od-rasejanosti-uma.html',
  './molitva-bogorodici.html',
  './molitva-u-tuzi-dusevnoj.html',
  './molitva-za-upokojene.html',
  './molitva-za-upokojene-prestavljenih.html',
  './molitva-za-zastitu-od-necistih-sila.html',
  './pokajna-molitva.html',
  './molitva-za-oprostaj-greha.html',
  './molitva-presvetoj-bogorodici-brzopomocnici.html',
  './molitve-za-svetu-tajnu-braku.html',
  './molitva-presvetoj-bogorodici-u-nevolji-i-potistenosti.html',
  './molitvе-svetom-vasiliju-ostroskom.html',
  './molitva-protiv-hulnih-pomisli.html',
  './zahvalna-molitva.html',
  './molitva-za-umnozenje-ljubavi.html',
  './molitva-za-one-koji-putuju.html',
  './molitva-svetom-naumu-ohridskom-cudotvorcu.html',
  './molitva-za-bolesnika.html',
  './molitva-pred-ispovest.html',
  './podsetnik-za-ispovest.html',
  './molitva-pred-sveto-pricesce.html',
  './molitva-posle-svetog-pricesca.html',
  './molitve-pre-i-posle-ucenja.html',
  './molitve-pre-spavanja.html',
  './molitva-pre-uzimanja-nafore-i-svete-vode.html',
  './hrabrost-za-molitvu.html',
  './ucenje-starca-vasilija-o-isusovoj-molitvi.html'
 
];

// Ostatak skripte (install, activate, fetch) je dobar i ne moraš ga menjati, 
// samo neka ostane onako kako si mi poslala ispod ovog spiska!

self.addEventListener('install', evt => {
  self.skipWaiting(); 
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

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