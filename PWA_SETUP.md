# PWA設定ガイド

このアプリはPWA（Progressive Web App）対応です。スマートフォンのホーム画面に追加して、アプリのように使用できます。

## アイコンの作成

PWAとして動作させるには、アイコン画像が必要です。以下の手順で作成してください：

1. **アイコン画像の準備**
   - 192x192ピクセルのPNG画像（`icon-192.png`）
   - 512x512ピクセルのPNG画像（`icon-512.png`）
   - 背景は透明または単色推奨

2. **アイコンの配置**
   - `public/icon-192.png` に配置
   - `public/icon-512.png` に配置

3. **アイコン作成ツール（オンライン）**
   - [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - [Favicon.io](https://favicon.io/)

## スマートフォンでのインストール方法

### iOS (Safari)
1. Safariでアプリを開く
2. 共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」を選択
4. 「追加」をタップ

### Android (Chrome)
1. Chromeでアプリを開く
2. メニュー（⋮）をタップ
3. 「ホーム画面に追加」または「アプリをインストール」を選択
4. 「追加」または「インストール」をタップ

## 動作確認

- オフラインでも動作する（Service Workerによるキャッシュ）
- ホーム画面から起動できる
- フルスクリーン表示（ブラウザUIなし）

## 注意事項

- アイコン画像を配置しないと、PWAとして正しく動作しません
- HTTPS環境（またはlocalhost）で動作します
- Service Workerは本番環境で動作します


