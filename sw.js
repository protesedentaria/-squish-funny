const PREFIX='squish-funny-'+new URL(self.registration.scope).pathname+'-';
const CACHE_NAME = PREFIX+'808802278fb8';
const ASSETS = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './game.js',
  './game.css',
  './i18n.js',
  './pwa.js',
  './icon.svg',
  './favicon.png',
  './ui-icons.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => (k.startsWith(PREFIX)||/^squish-funny-v\d+$/.test(k)) && k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url=new URL(event.request.url);
  if (event.request.method !== 'GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope)) return;
  if (event.request.mode === 'navigate') {
    // Serve HTML and scripts from the same complete release, online or offline.
    event.respondWith(caches.open(CACHE_NAME).then(async cache=>(await cache.match('./index.html'))||fetch(event.request)));
    return;
  }
  // Only cache our own assets. Never send HTML in place of missing scripts/images.
  if(ASSETS.some(path=>new URL(path,self.registration.scope).href===url.href))
    event.respondWith(caches.open(CACHE_NAME).then(async cache=>(await cache.match(event.request))||fetch(event.request)));
});
