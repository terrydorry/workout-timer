// Service Worker for Workout Timer PWA
const CACHE_NAME = 'workout-timer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];

// インストール時の処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // すぐにアクティベート
  self.skipWaiting();
});

// アクティベート時の処理（古いキャッシュの削除）
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // すべてのクライアントを制御
  return self.clients.claim();
});

// フェッチ時の処理（オフライン対応）
self.addEventListener('fetch', (event) => {
  // GETリクエストのみキャッシュ
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // キャッシュがあればそれを返す
        if (cachedResponse) {
          return cachedResponse;
        }

        // ネットワークから取得を試みる
        return fetch(event.request)
          .then((response) => {
            // 有効なレスポンスでない場合はそのまま返す
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // レスポンスをクローンしてキャッシュに保存
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // ネットワークエラーの場合、オフライン用のフォールバック
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
