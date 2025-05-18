// This is the service worker with the Workbox framework

// Import and configure the Workbox modules
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

workbox.setConfig({ debug: false });

// Use the precache method from workbox to cache app assets
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// HTML caching strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === "document",
  new workbox.strategies.NetworkFirst({
    cacheName: "html-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
      }),
      // Provide a fallback if network fails
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
    networkTimeoutSeconds: 3, // Timeout after 3 seconds
  })
);

// CSS and JS caching strategy
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// Image caching strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// Font caching strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === "font",
  new workbox.strategies.CacheFirst({
    cacheName: "font-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  })
);

// Background sync for saved cards when offline
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/api"),
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin("apiQueue", {
        maxRetentionTime: 24 * 60, // Retry for up to 24 hours (in minutes)
      }),
    ],
  }),
  "POST"
);

// Fallback to offline page when network is not available
workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.destination === "document") {
    return workbox.precaching.matchPrecache("/offline.html");
  }
  return Response.error();
});

// Listen for messages from the application
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
