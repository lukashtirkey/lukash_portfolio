# Helper script to push portfolio fixes to GitHub
Param(
    [string]$RepoUrl = "https://github.com/lukashtirkey/lukash_portfolio.git"
)

Write-Host "Setting up Git remote to: $RepoUrl" -ForegroundColor Cyan

# Remove origin if already exists
git remote remove origin 2>$null

git remote add origin $RepoUrl
git branch -M main

Write-Host "Pushing fixes (package.json, server.js, README.md) to GitHub..." -ForegroundColor Yellow
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully pushed to GitHub! Render will now auto-deploy your portfolio." -ForegroundColor Green
} else {
    Write-Host "Push failed. Please check your GitHub permissions or upload package.json and server.js manually on GitHub." -ForegroundColor Red
}
