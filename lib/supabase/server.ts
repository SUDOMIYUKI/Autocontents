import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // デバッグ用ログ（本番環境では削除）
  if (process.env.NODE_ENV === 'development') {
    console.log('Environment variables check:')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✓ Set' : '✗ Missing')
  }
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.\n' +
      `NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓' : '✗'}\n` +
      `NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey ? '✓' : '✗'}\n` +
      'Make sure .env.local file exists in the content-auto-webapp directory.'
    )
  }
  
  return createServerComponentClient({
    cookies: () => cookieStore,
    supabaseUrl,
    supabaseKey,
  })
}
