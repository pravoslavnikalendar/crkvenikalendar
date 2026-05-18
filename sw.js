const cacheName = 'riznica-final-v47';
const assets = [
  '/',
  './index.html',
  './manifest.json',
  './svetitelji.json',
  './ikona.png',
  './papir.jpg', 
  './papir.png', 
  './matej.html',
  './marko.html',
  './luka.html',
  './jovan.html',
  './serafimi.png',
  './sabor.png', 
  './krst.png',
  './snaga.png',
  './bogorodica-pehar.png',
  './bogorodica.png',
  './andjeo.png',
  './bog-cuti.png',
  './bogorodica-hrist.png',
  './bozija-volja.png',
  './hram.png',
  './isceliteljka.png',
  './krst-ornament-veliki.png',
  './mojstiker.png',
  './oprostaj.png',
  './pokajnik.png',
  './prastaj-i-ljubi.png',
  './ljubi-i-prastaj.png',
  './stiker-bog.png',
  './sve-primi-mirno.png',
  './svako-dobro.png',
  './trojerucica.png',
  './pricest.png',
  './gospode-oprosti-i-osvetli-mi-put.png',
  './tisina-snaga.png',
  './bogojavljenje.jpg',
  './blagovesti.jpg',
  './bozic.jpg',
  './cveti.jpg',
  './djurdjevdan.jpg',
  './duhovski-ponedeljak.jpg',
  './duhovski-utorak.jpg',
  './ivanjdan.jpg',
  './jovankrstitelj.jpg',
  './kirilo-metodije.jpg',
  './justin.jpg',
  './konstantin-jelena.jpg',
  './krstovdan.jpg',
  './mala-gospojina.jpg',
  './mitrovdan.jpg',
  './nikolaj.jpg',
  './nikoljdan.jpg',
  './petar-cetinjski.jpg',
  './petrovdan.jpg',
  './preobrazenje.jpg',
  './prorok-ilija.jpg',
  './sabor.jpg',
  './silazak-duha-svetoga.jpg',
  './sv-sava.jpg',
  './sveta-petka.jpg',
  './sveta-tri-jerarha.jpg',
  './sveti-prvomucenik-stefan.jpg',
  './sveti-vasilije-veliki.jpg',
  './usekovanje.jpg',
  './uspenije.jpg',
  './vasilije-ostroski.jpg',
  './vaskrs.jpg',
  './vaskrsni-ponedeljak.jpg',
  './vaskrsni-utorak.jpg',
  './vavedenje.jpg',
  './vaznesenje.jpg',
  './veliki-petak.jpg',
  './vidovdan.jpg',
  './oce-nas-aramejski.mp3',
  './psaltir.html',
  './molitvenik.html',


];

// 1. ИНСТАЛАЦИЈА - Спремање за рад без интернета
self.addEventListener('install', evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Ризница се спрема за рад без интернета...');
      return cache.addAll(assets);
    })
  );
});

// 2. АКТИВАЦИЈА - Брише старе верзије кеша (ово форсира телефон да узме нове измене)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
evt.respondWith(
caches.match(evt.request).then(cacheRes => {
return cacheRes || fetch(evt.request).then(fetchRes => {
return caches.open(cacheName).then(cache => {
cache.put(evt.request, fetchRes.clone());
return fetchRes;
});
}).catch(() => {
// Ako je HTML stranica offline
if (evt.request.mode === 'navigate') {
return caches.match('./index.html');
}
});
})
);
});
