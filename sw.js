const cacheName = 'riznica-final-v48';
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
    })
  );
});

self.addEventListener('fetch', evt => {



evt.respondWith(



caches.match(evt.request).then(response => {



return response || fetch(evt.request).then(fetchRes => {



return caches.open(cacheName).then(cache => {



cache.put(evt.request, fetchRes.clone());



return fetchRes;



});



}).catch(() => {



// Offline fallback za HTML stranice



if (evt.request.headers.get('accept').includes('text/html')) {



return caches.match('./index.html');



}



});



})



);



});
