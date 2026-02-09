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
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: '未認証' }, { status: 401 })
    }

    const { sample_posts } = await request.json()

    if (!sample_posts) {
      return NextResponse.json(
        { error: 'sample_postsが必要です' },
        { status: 400 }
      )
    }

    // Claude APIで分析
    const analysisPrompt = `
以下は、あるユーザーの過去のSNS投稿です。
この人の文章スタイルを詳細に分析してください。

【過去投稿】
${sample_posts}

【分析してほしい項目】
1. **基本トーン**: 親しみやすい、真面目、ユーモラス、内省的など
2. **語尾パターン**: よく使う語尾を10個抽出(例: 〜だよね、〜かな)
3. **文章構成**: 書き始めのパターン(日常シーン、問いかけなど)
4. **特徴的な表現**: この人ならではのフレーズ(5個)
5. **避けてる表現**: 使わない言葉(例: 〜すべき、絶対に)
6. **改行・余白**: 短文多用、長文主体など

分析結果を以下のJSON形式で出力してください:

{
  "style": {
    "tone": {
      "primary": "...",
      "secondary": "..."
    },
    "sentence_endings": {
      "thinking": ["...", "..."],
      "friendly": ["...", "..."],
      "casual": ["...", "..."]
    },
    "structure": {
      "opening": {
        "type": "...",
        "examples": ["...", "..."]
      }
    },
    "signature_phrases": ["...", "..."],
    "avoid": ["...", "..."],
    "rhythm": {
      "sentence_length": "...",
      "paragraph_style": "..."
    }
  }
}

JSON部分のみを出力してください:
`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: analysisPrompt }],
    })

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''

    // JSONパース
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('JSON形式の応答が得られませんでした')
    }

    const styleGuide = JSON.parse(jsonMatch[0])

    // Supabaseに保存
    const { error: upsertError } = await supabase
      .from('style_guides')
      .upsert({
        user_id: user.id,
        style_data: styleGuide,
        updated_at: new Date().toISOString(),
      })

    if (upsertError) throw upsertError

    return NextResponse.json({
      success: true,
      style_guide: styleGuide,
    })

  } catch (error: any) {
    console.error('Style analysis error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
