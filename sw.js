const dynamicCache = 'dynamic-cache-v1';
const staticCacheName = 'cache-static-v1';
const staticResources = [
  '/',
  'offline.html',
  'index.html',
  'sw.js',
  'manifest.json',
  '/css/app.css',
  '/js/app.js',
  '/images/backbutton.png'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(staticResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

// fetch event
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          if (cacheRes){
          console.log(cacheRes)
            return cacheRes;
          }
            return fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
   );
});


