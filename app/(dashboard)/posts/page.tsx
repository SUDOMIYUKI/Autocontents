'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PostList from '@/components/dashboard/PostList'
import { Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/types/post.types'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      if (response.ok) {
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_name: 'monday' }),
      })

      const data = await response.json()
      if (response.ok) {
        fetchPosts()
        alert('投稿を生成しました！')
      } else {
        alert('エラー: ' + data.error)
      }
    } catch (error: any) {
      alert('エラー: ' + error.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            投稿管理
          </h1>
          <p className="text-gray-600 mt-2">
            投稿の生成・管理・公開
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleGenerate}>
            <Plus className="w-4 h-4 mr-2" />
            投稿を生成
          </Button>
          <Link href="/posts/new">
            <Button variant="outline">
              新規作成
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>投稿一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
