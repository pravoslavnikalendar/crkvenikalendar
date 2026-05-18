const cacheName = 'riznica-final-v49';
const assets = [
  '/',
  './index.html',
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
    }).then(() => self.clients.claim())
  );
});



self.addEventListener('install', evt => {
self.skipWaiting();
evt.waitUntil(
caches.open(cacheName).then(cache => {
return cache.addAll([
'./',
'./index.html',
'./psaltir.html',
'./molitvenik.html'
]);
})
);
});


self.addEventListener('install', evt => {
self.skipWaiting();
evt.waitUntil(
caches.open(cacheName).then(cache => {
return cache.addAll([
'./',
'./index.html',
'./psaltir.html',
'./molitvenik.html'
]);
})
);
});
