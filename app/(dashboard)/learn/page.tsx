'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Loader2 } from 'lucide-react'

export default function LearnPage() {
  const [samplePosts, setSamplePosts] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/style/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sample_posts: samplePosts }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      alert('エラー: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          文章スタイル学習
        </h1>
        <p className="text-gray-600 mt-2">
          過去の投稿からあなたの文章スタイルを学習します
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            スタイル分析
          </CardTitle>
          <CardDescription>
            過去のSNS投稿やnote記事を10〜20個貼り付けてください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={samplePosts}
            onChange={(e) => setSamplePosts(e.target.value)}
            placeholder={`例:

クローゼットの前で、ふと立ち止まった。

「これ、いつ着るんやろう」

手に取ったのは、3年前に買ったブラウス...

---

また同じような人を好きになってる...

って気づいた時...

---

(10〜20投稿分を貼り付け)`}
            className="min-h-[400px] font-mono text-sm"
          />

          <Button 
            onClick={handleAnalyze}
            disabled={!samplePosts || loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                スタイルを分析
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">
              ✅ 分析完了!
            </CardTitle>
            <CardDescription>
              あなたの文章スタイルを学習しました
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result.style_guide, null, 2)}
              </pre>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              このスタイルで今後の投稿が生成されます
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
