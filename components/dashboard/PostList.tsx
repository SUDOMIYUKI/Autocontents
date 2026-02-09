import { Post } from '@/types/post.types'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface PostListProps {
  posts: Post[]
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
}

const statusLabels = {
  draft: '下書き',
  scheduled: '予約投稿',
  published: '公開済み',
  failed: '失敗',
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        投稿がありません
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-900 line-clamp-3">
                {post.content}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{post.platform}</span>
                <span>
                  {format(new Date(post.created_at), 'yyyy年MM月dd日 HH:mm', {
                    locale: ja,
                  })}
                </span>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                statusColors[post.status as keyof typeof statusColors]
              }`}
            >
              {statusLabels[post.status as keyof typeof statusLabels]}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
