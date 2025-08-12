// service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
    console.log('Workbox loaded 🎉');
    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        new workbox.strategies.NetworkFirst()
    );
} else {
    console.log('Workbox failed to load 😢');
}
