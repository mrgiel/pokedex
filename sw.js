const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'sw.js',
    'manifest.json',
    '/css/app.css',
    '/js/app.js',
    '/images/backbutton.png'
]





self.addEventListener('install', e => {
    console.log('SW Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(()=> self.skipWaiting())
    );
});


self.addEventListener('activate', e => {
    console.log('SW Activated');

    e.waitUntil(
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

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})


