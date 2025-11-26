const CACHE_NAME = 'hitster-cache-v1';
const BASE = '/hitster/';

const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'fondo.png',
  BASE + 'manifest.json',
  BASE + 'icon192.png',
  BASE + 'icon512.png'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
