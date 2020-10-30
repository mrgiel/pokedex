const CACHE_NAME = 'v1';
const FILES_TO_CACHE = [
    'index.html',
    'sw.js',
    'manifest.json',
    '/css/app.css',
    '/js/app.js',
    '/images/backbutton.png'
  ];




self.addEventListener('install', evt => {
    console.log('SW Installed');

    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});


self.addEventListener('activate', evt => {
    console.log('SW Activated');
    evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          if (cacheRes){
            return cacheRes;
          }
            return fetch(evt.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
        
   );
});

