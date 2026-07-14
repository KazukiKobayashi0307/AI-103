// Azure AI-103 対策アプリ - Service Worker
// シェル(HTML/JS/アイコン)をキャッシュし、TWA/PWAのインストール要件を満たす。
// キャッシュ名の末尾番号を上げるだけで、次回アクセス時に確実に更新版へ切り替わる。
const CACHE_NAME = "ai103-shell-v6";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./questions.js",
  "./questions1b.js",
  "./questions2.js",
  "./questions3.js",
  "./questions4.js",
  "./questions5.js",
  "./questions6.js",
  "./questions7.js",
  "./questions8.js",
  "./glossary.js",
  "./textbook.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(SHELL_FILES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

// ネットワーク優先: オンライン時は常に最新を取得(問題を追加した際に古いキャッシュへ
// 固定されるのを防ぐ)。オフライン時のみキャッシュへフォールバックする。
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(event.request);
    })
  );
});
