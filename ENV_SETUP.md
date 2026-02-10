# 環境変数ファイルの設定

`.env.local` ファイルを `content-auto-webapp/` ディレクトリに作成し、以下の内容をコピーしてください：

```env
# Supabase
# 以下をSupabaseプロジェクトから取得して設定してください
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Claude API
CLAUDE_API_KEY=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

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1468809191052283936/Ewo9if8ED_2b_DVTOmxFAN_oAX9fLUZ4ilqtH25u7k_npf-9b8CZQ7_ENOO-5lPkpwgA

# Vercel Cron Secret
# ランダムな文字列を生成して設定してください（例: openssl rand -hex 32）
CRON_SECRET=your_random_secret_here
```

## 設定手順

1. `content-auto-webapp/` ディレクトリに `.env.local` ファイルを作成
2. 上記の内容をコピー＆ペースト
3. Supabaseの設定値を取得して置き換え：
   - Supabaseプロジェクトの Settings > API から取得
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings > API > service_role key)
4. `CRON_SECRET` にランダムな文字列を設定（例: `openssl rand -hex 32` で生成）

## 注意事項

- `.env.local` は `.gitignore` に含まれているため、GitHubにプッシュされません
- 本番環境（Vercel）では、環境変数をVercelのダッシュボードで設定してください
