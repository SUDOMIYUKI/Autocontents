import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: '未認証' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const { data: config } = await supabase
      .from('user_configs')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ profile, config })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: '未認証' }, { status: 401 })
    }

    const body = await request.json()

    // プロフィール更新
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        name: body.name,
        age: body.age ? parseInt(body.age) : null,
        profession: body.profession || null,
        bio: body.bio || null,
        updated_at: new Date().toISOString(),
      })

    if (profileError) throw profileError

    // 設定更新
    if (body.tone) {
      const { error: configError } = await supabase
        .from('user_configs')
        .upsert({
          user_id: user.id,
          tone: body.tone,
          updated_at: new Date().toISOString(),
        })

      if (configError) throw configError
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
