const cacheName = 'cache-static-v1';
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


self.addEventListener('activate', event => {
  console.log('SW Activated');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
              cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(staticResources);
      })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          if (cacheRes){
            return cacheRes;
          }
            return fetch(evt.request).then(fetchRes => {
                return caches.open(cacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
   );
});


