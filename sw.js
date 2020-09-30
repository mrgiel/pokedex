const CACHE_NAME = 'v1.02';
const FILES_TO_CACHE = [
    '/offline.html',
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

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      return response || fetch(evt.request);
    })
  );
});



