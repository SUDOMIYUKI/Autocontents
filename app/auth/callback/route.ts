import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // プロフィールが存在しない場合は作成
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // プロフィールの存在確認
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // プロフィールが存在しない場合は作成
    if (!profile) {
      const name = user.user_metadata?.full_name || 
                  user.user_metadata?.name || 
                  user.email?.split('@')[0] || 
                  'ユーザー'
      
      await supabase
        .from('profiles')
        .insert({
          id: user.id,
          name,
          email: user.email,
        })
    }
  }

  // ダッシュボードにリダイレクト
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
