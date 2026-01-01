# GitHubリポジトリ初期化スクリプト (PowerShell版)

Write-Host "GitHubリポジトリの初期化を開始します..." -ForegroundColor Green

# Gitリポジトリが既に存在するか確認
if (Test-Path .git) {
    Write-Host "既にGitリポジトリが存在します。" -ForegroundColor Yellow
    $continue = Read-Host "続行しますか？ (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit
    }
} else {
    git init
    Write-Host "Gitリポジトリを初期化しました。" -ForegroundColor Green
}

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Workout Timer App"

Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Cyan
Write-Host "1. GitHubでリポジトリを作成してください"
Write-Host "2. 以下のコマンドを実行してください:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "または、GitHub CLIを使用している場合:" -ForegroundColor Yellow
Write-Host "   gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push"


