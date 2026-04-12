// Ενεργοποίηση άμεσα
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Καθαρισμός όλων των παλιών caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Ασφαλές fetch handler
self.addEventListener('fetch', event => {
  // ΜΗΝ αγγίζεις το index.html (navigate requests)
  if (event.request.mode === 'navigate') {
    return; // αφήνει το Cloudflare να το σερβίρει
  }

  // Για όλα τα άλλα αρχεία, απλά κάνε fetch
  event.respondWith(fetch(event.request));
});
