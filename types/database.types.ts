export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          age: number | null
          profession: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          age?: number | null
          profession?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number | null
          profession?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_configs: {
        Row: {
          id: string
          user_id: string
          tone: string
          target_audience: Json | null
          main_themes: Json | null
          platforms: Json | null
          links: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tone: string
          target_audience?: Json | null
          main_themes?: Json | null
          platforms?: Json | null
          links?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tone?: string
          target_audience?: Json | null
          main_themes?: Json | null
          platforms?: Json | null
          links?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      style_guides: {
        Row: {
          id: string
          user_id: string
          style_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          style_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          style_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      post_templates: {
        Row: {
          id: string
          user_id: string
          day_of_week: string
          template_data: Json
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          day_of_week: string
          template_data: Json
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          day_of_week?: string
          template_data?: Json
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          platform: string
          status: string
          scheduled_at: string | null
          published_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          platform: string
          status: string
          scheduled_at?: string | null
          published_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          platform?: string
          status?: string
          scheduled_at?: string | null
          published_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          user_id: string
          day_of_week: string
          time: string
          platform: string
          template_name: string
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          day_of_week: string
          time: string
          platform: string
          template_name: string
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          day_of_week?: string
          time?: string
          platform?: string
          template_name?: string
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
