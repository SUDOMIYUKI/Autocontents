# コンテンツ自動化システム - Webアプリ版

Next.js製のWebアプリケーションで、あなたの文章スタイルでSNS投稿を自動生成・投稿するシステムです。

## 機能

- ✅ ユーザー登録・ログイン（Supabase認証）
- ✅ ダッシュボード（統計情報・投稿一覧）
- ✅ 文章スタイル学習（過去投稿から自動分析）
- ✅ 投稿生成（Claude API）
- ✅ 投稿管理（下書き・予約投稿・公開）
- ✅ スケジュール管理
- ✅ 自動投稿（Vercel Cron）

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS + shadcn/ui
- **認証・DB**: Supabase
- **AI**: Claude API (Anthropic)
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係インストール

```bash
cd content-auto-webapp
npm install
```

### 2. Supabaseプロジェクト作成

1. https://supabase.com でプロジェクトを作成
2. SQL Editorで `supabase/schema.sql` を実行してテーブルを作成

### 3. 環境変数設定

`.env.local` を作成し、以下を設定：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Claude API
CLAUDE_API_KEY=your_claude_api_key

# Discord Webhook (オプション)
DISCORD_WEBHOOK_URL=your_discord_webhook

# Vercel Cron Secret
CRON_SECRET=your_random_secret
```

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

### 5. Vercelデプロイ

```bash
# Vercel CLIインストール
npm i -g vercel

# デプロイ
vercel --prod
```

## プロジェクト構成

```
content-auto-webapp/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証ページ
│   ├── (dashboard)/       # ダッシュボード
│   └── api/               # API Routes
├── components/             # Reactコンポーネント
│   ├── ui/                # shadcn/ui
│   ├── layout/            # レイアウト
│   └── dashboard/         # ダッシュボード
├── lib/                    # ユーティリティ
│   └── supabase/          # Supabase設定
├── types/                  # TypeScript型定義
└── supabase/              # Supabaseスキーマ
```

## 使い方

### 1. ユーザー登録

1. `/signup` でアカウント作成
2. プロフィール情報を入力

### 2. スタイル学習

1. `/learn` にアクセス
2. 過去のSNS投稿を10〜20個貼り付け
3. 「スタイルを分析」をクリック
4. 自動でスタイルガイドが生成される

### 3. 投稿生成

1. `/posts` にアクセス
2. 「投稿を生成」をクリック
3. 生成された投稿を確認・編集
4. 公開または予約投稿

### 4. 設定

1. `/settings` でユーザー情報を編集
2. `/settings/schedule` でスケジュール設定

## Supabaseデータベース設計

以下のテーブルが作成されます：

- `profiles` - ユーザープロフィール
- `user_configs` - ユーザー設定
- `style_guides` - スタイルガイド
- `post_templates` - 投稿テンプレート
- `posts` - 投稿履歴
- `schedules` - スケジュール

詳細は `supabase/schema.sql` を参照してください。

## API Routes

- `POST /api/style/analyze` - スタイル学習
- `POST /api/posts/generate` - 投稿生成
- `GET /api/posts` - 投稿一覧取得
- `GET /api/settings` - 設定取得
- `POST /api/settings` - 設定保存
- `GET /api/cron/auto-post` - 自動投稿Cron

## バックエンド連携

既存のPythonバックエンドシステムと連携する場合：

1. PythonシステムをAPIサーバーとして起動
2. Next.jsのAPI RoutesからPython APIを呼び出し
3. データはSupabaseで一元管理

## トラブルシューティング

### エラー: Supabase接続エラー

- `.env.local` の環境変数が正しく設定されているか確認
- Supabaseプロジェクトが有効か確認

### エラー: Claude APIエラー

- `CLAUDE_API_KEY` が正しく設定されているか確認
- APIキーが有効か確認

### エラー: 認証エラー

- Supabaseの認証設定を確認
- RLS (Row Level Security) ポリシーが正しく設定されているか確認

## ライセンス

このプロジェクトはココナラで販売可能な汎用システムです。

## サポート

問題が発生した場合は、GitHubのIssuesで報告してください。
