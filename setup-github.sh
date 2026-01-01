#!/bin/bash
# GitHubリポジトリ初期化スクリプト

echo "GitHubリポジトリの初期化を開始します..."

# Gitリポジトリが既に存在するか確認
if [ -d .git ]; then
    echo "既にGitリポジトリが存在します。"
    read -p "続行しますか？ (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    git init
    echo "Gitリポジトリを初期化しました。"
fi

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Workout Timer App"

echo ""
echo "次のステップ:"
echo "1. GitHubでリポジトリを作成してください"
echo "2. 以下のコマンドを実行してください:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "または、GitHub CLIを使用している場合:"
echo "   gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push"


