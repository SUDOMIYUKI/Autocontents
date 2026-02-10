# Supabase OAuth認証の設定手順

Google認証を有効にするための設定手順です。

## 1. SupabaseダッシュボードでOAuthプロバイダーを設定

### Google認証の設定

1. Supabaseダッシュボードにログイン
2. **Authentication** > **Providers** を開く
3. **Google** を有効にする
4. Google Cloud Consoleで以下を設定：
   - [Google Cloud Console](https://console.cloud.google.com/) にアクセス
   - プロジェクトを作成（または既存のプロジェクトを選択）
   - **APIとサービス** > **認証情報** を開く
   - **OAuth 2.0 クライアント ID** を作成
   - **承認済みのリダイレクト URI** に以下を追加：
     ```
     https://paaghmcuglmpylagqlof.supabase.co/auth/v1/callback
     ```
   - **クライアント ID** と **クライアント シークレット** をコピー
5. Supabaseダッシュボードに戻り、Google認証の設定に以下を入力：
   - **Client ID (for OAuth)**: Google Cloud Consoleで取得したクライアントID
   - **Client Secret (for OAuth)**: Google Cloud Consoleで取得したクライアントシークレット

## 2. リダイレクトURLの設定

Supabaseダッシュボードで以下を設定：

1. **Authentication** > **URL Configuration** を開く
2. **Redirect URLs** に以下を追加：
   ```
   http://localhost:3001/auth/callback
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```
   （本番環境のドメインに置き換えてください）

## 3. 動作確認

1. 開発サーバーを起動：
   ```bash
   npm run dev
   ```

2. ブラウザで http://localhost:3001 にアクセス

3. ログインページまたはサインアップページで：
   - 「Googleでログイン」ボタンをクリック
   - OAuth認証が正常に動作することを確認

## 注意事項

- ローカル開発環境では `http://localhost:3001/auth/callback` をリダイレクトURLに追加してください
- 本番環境では、実際のドメインのリダイレクトURLを追加してください
- Google認証は、Google Cloud Consoleでの設定が必要です

## トラブルシューティング

### エラー: "redirect_uri_mismatch"
- SupabaseのリダイレクトURL設定を確認
- Google/AppleのリダイレクトURL設定を確認

### エラー: "invalid_client"
- GoogleのクライアントIDとシークレットが正しく設定されているか確認
- 環境変数が正しく読み込まれているか確認
