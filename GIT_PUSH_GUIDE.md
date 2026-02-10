# GitHubにプッシュする手順

## 1. リモートリポジトリを追加

```bash
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
```

またはSSHを使用する場合:

```bash
git remote add origin git@github.com:ユーザー名/リポジトリ名.git
```

## 2. ブランチ名を確認・変更（必要に応じて）

```bash
# 現在のブランチ名を確認
git branch

# mainブランチに変更したい場合
git branch -M main
```

## 3. プッシュ

```bash
git push -u origin main
```

（ブランチ名がmasterの場合は `git push -u origin master`）

## 注意事項

- `.env.local` ファイルは `.gitignore` に含まれているため、プッシュされません
- 環境変数はGitHubのSecretsに設定してください（Vercelデプロイ時）
- `node_modules` も `.gitignore` に含まれているため、プッシュされません
