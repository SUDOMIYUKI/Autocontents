export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed'

export interface Post {
  id: string
  user_id: string
  content: string
  platform: string
  status: PostStatus
  scheduled_at: string | null
  published_at: string | null
  metadata: Record<string, any> | null
  created_at: string
  updated_at: string
}
