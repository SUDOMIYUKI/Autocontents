import { createClient } from '@/lib/supabase/server'
import StatsCard from '@/components/dashboard/StatsCard'
import PostList from '@/components/dashboard/PostList'
import { FileText, Calendar, CheckCircle, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  // 統計情報取得
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const totalPosts = posts?.length || 0
  const publishedPosts = posts?.filter(p => p.status === 'published').length || 0
  const scheduledPosts = posts?.filter(p => p.status === 'scheduled').length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ダッシュボード
        </h1>
        <p className="text-gray-600 mt-2">
          自動投稿システムの概要
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="今月の投稿"
          value={totalPosts}
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="公開済み"
          value={publishedPosts}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="予約投稿"
          value={scheduledPosts}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="次回投稿"
          value="9:00 AM"
          icon={Calendar}
          color="purple"
          subtitle="明日"
        />
      </div>

      {/* 最近の投稿 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">最近の投稿</h2>
        <PostList posts={posts || []} />
      </div>
    </div>
  )
}
