import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  // Cron秘密鍵チェック
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const currentHour = now.getHours()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' })

    // 今の時間に投稿すべきスケジュールを取得
    const { data: schedules } = await supabase
      .from('schedules')
      .select('*, profiles(*)')
      .eq('enabled', true)
      .eq('day_of_week', currentDay)

    // 投稿生成・実行
    for (const schedule of schedules || []) {
      const scheduleHour = parseInt(schedule.time.split(':')[0])
      
      if (scheduleHour === currentHour) {
        // ここで投稿生成APIを呼び出す
        // (実際のバックエンドシステムと連携)
        console.log(`Generating post for user ${schedule.user_id}`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
