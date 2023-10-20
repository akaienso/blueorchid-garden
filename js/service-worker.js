self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/data/messages.js',
        '/img/garden.jpg',
        '/img/garden-preview.jpg',
        '/img/icons/favicon-16x16.png',
        '/img/icons/favicon-32x32.png',
        '/img/icons/48-icon-blue_orchid.png',
        '/img/icons/256-icon-blue_orchid.png',
        '/img/icons/android-chrome-192x192.png',
        '/img/icons/android-chrome-512x512.png',
        '/img/icons/apple-touch-icon.png.png',
        '/favicon.ico',
        '/js/scripts.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
