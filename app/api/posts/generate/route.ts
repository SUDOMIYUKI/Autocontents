import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: '未認証' }, { status: 401 })
    }

    const { template_name, topic } = await request.json()

    // ユーザー設定取得
    const { data: config } = await supabase
      .from('user_configs')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const { data: styleGuide } = await supabase
      .from('style_guides')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const { data: template } = await supabase
      .from('post_templates')
      .select('*')
      .eq('user_id', user.id)
      .eq('day_of_week', template_name)
      .single()

    if (!config || !styleGuide || !template) {
      return NextResponse.json(
        { error: '設定が見つかりません' },
        { status: 404 }
      )
    }

    // プロンプト生成
    const prompt = buildPrompt(config, styleGuide.style_data, template.template_data, topic)

    // Claude APIで生成
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const generatedPost = message.content[0].type === 'text'
      ? message.content[0].text
      : ''

    // 投稿として保存
    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        content: generatedPost,
        platform: 'threads',
        status: 'draft',
      })
      .select()
      .single()

    if (insertError) throw insertError

    return NextResponse.json({
      success: true,
      post,
    })

  } catch (error: any) {
    console.error('Post generation error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

function buildPrompt(config: any, styleGuide: any, template: any, topic?: string) {
  return `
あなたは${config.age || 30}歳の${config.profession || 'ユーザー'}「${config.name || 'ユーザー'}」として、SNS投稿文を作成してください。

【あなたのプロフィール】
${config.bio || ''}

【文章スタイル】
トーン: ${styleGuide.style?.tone?.primary || '親しみやすい'}, ${styleGuide.style?.tone?.secondary || '内省的'}

語尾の特徴:
${styleGuide.style?.sentence_endings ? Object.entries(styleGuide.style.sentence_endings)
  .map(([cat, endings]: any) => `  ${cat}: ${endings.join(', ')}`)
  .join('\n') : 'なし'}

避けるべき表現:
${styleGuide.style?.avoid?.join(', ') || 'なし'}

【今日の投稿設定】
タイプ: ${template.type || '投稿'}
スタイル: ${template.style || ''}
トーン: ${template.tone || ''}

${topic ? `テーマ: ${topic}` : ''}

上記の設定に従って、投稿文のみを出力してください(説明不要):
`
}
