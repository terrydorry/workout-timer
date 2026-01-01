# Netlifyデプロイガイド

このアプリをNetlifyでGitHub連携して公開する手順です。

## 前提条件

- GitHubアカウント
- Netlifyアカウント（無料プランでOK）

## デプロイ手順

### 1. GitHubリポジトリの作成

#### 方法A: 手動でコマンドを実行

```bash
# プロジェクトディレクトリに移動
cd workout-timer

# Gitリポジトリを初期化（まだの場合）
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Workout Timer App"

# GitHubでリポジトリを作成後、リモートを追加
# （YOUR_USERNAMEとYOUR_REPO_NAMEを実際の値に置き換える）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# メインブランチを設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

#### 方法B: スクリプトを使用（Windows）

```powershell
# PowerShellで実行
.\setup-github.ps1

# その後、GitHubでリポジトリを作成してから
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### 方法C: GitHub CLIを使用（推奨）

```bash
# GitHub CLIでリポジトリを作成してプッシュ（一括実行）
gh repo create workout-timer --public --source=. --remote=origin --push
```

### 2. Netlifyでの設定

1. **Netlifyにログイン**
   - [Netlify](https://www.netlify.com/) にアクセスしてログイン

2. **新しいサイトを作成**
   - ダッシュボードで「Add new site」→「Import an existing project」を選択

3. **GitHubと連携**
   - 「GitHub」を選択して認証
   - 作成したリポジトリを選択

4. **ビルド設定（自動検出されるはず）**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - これらは `netlify.toml` に設定済みなので、自動的に適用されます

5. **デプロイ**
   - 「Deploy site」をクリック
   - ビルドが完了すると、自動的にURLが発行されます

### 3. カスタムドメイン（オプション）

- Netlifyダッシュボードで「Domain settings」からカスタムドメインを設定可能
- 無料プランでもカスタムドメインが使用できます

### 4. 環境変数（必要に応じて）

- 現在は環境変数は不要ですが、将来的に必要になった場合は
- Netlifyダッシュボードの「Site settings」→「Environment variables」で設定

## 自動デプロイ

GitHubにプッシュすると、自動的にNetlifyでビルド・デプロイされます。

```bash
# 変更をコミット
git add .
git commit -m "Update: 変更内容の説明"

# GitHubにプッシュ（自動デプロイが開始される）
git push
```

## PWA動作確認

デプロイ後、以下を確認してください：

1. **HTTPSでアクセスできること**
   - Netlifyは自動的にHTTPSを提供します

2. **Service Workerが動作していること**
   - ブラウザの開発者ツール（F12）→「Application」タブ→「Service Workers」で確認

3. **マニフェストが読み込まれていること**
   - 開発者ツール→「Application」タブ→「Manifest」で確認

4. **スマートフォンでインストールできること**
   - iOS: Safariで開いて「ホーム画面に追加」
   - Android: Chromeで開いて「アプリをインストール」

## トラブルシューティング

### ビルドエラー

- Netlifyのビルドログを確認
- ローカルで `npm run build` が成功することを確認

### Service Workerが動作しない

- HTTPSでアクセスしていることを確認
- ブラウザのキャッシュをクリア
- Service Workerを登録解除して再登録

### アイコンが表示されない

- `public/icon-192.png` と `public/icon-512.png` が存在することを確認
- マニフェストファイルのパスが正しいことを確認

## 参考リンク

- [Netlify公式ドキュメント](https://docs.netlify.com/)
- [PWA設定ガイド](./PWA_SETUP.md)
