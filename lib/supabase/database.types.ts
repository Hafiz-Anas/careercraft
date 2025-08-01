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
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url: string | null
          created_at: string
          subscription: 'free' | 'premium'
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url?: string | null
          created_at?: string
          subscription?: 'free' | 'premium'
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          created_at?: string
          subscription?: 'free' | 'premium'
        }
      }
      cvs: {
        Row: {
          id: string
          user_id: string
          title: string
          personal_info: Json
          education: Json
          experience: Json
          skills: Json
          projects: Json
          certifications: Json
          template_id: string
          customization: Json
          created_at: string
          updated_at: string
          is_public: boolean
          slug: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          personal_info: Json
          education?: Json
          experience?: Json
          skills?: Json
          projects?: Json
          certifications?: Json
          template_id: string
          customization?: Json
          created_at?: string
          updated_at?: string
          is_public?: boolean
          slug?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          personal_info?: Json
          education?: Json
          experience?: Json
          skills?: Json
          projects?: Json
          certifications?: Json
          template_id?: string
          customization?: Json
          created_at?: string
          updated_at?: string
          is_public?: boolean
          slug?: string | null
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string
          preview_image: string
          category: 'modern' | 'classic' | 'creative'
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          preview_image: string
          category: 'modern' | 'classic' | 'creative'
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string
          preview_image?: string
          category?: 'modern' | 'classic' | 'creative'
          created_at?: string
          is_active?: boolean
        }
      }
      analytics: {
        Row: {
          id: string
          cv_id: string
          views: number
          downloads: number
          shares: number
          last_viewed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cv_id: string
          views?: number
          downloads?: number
          shares?: number
          last_viewed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cv_id?: string
          views?: number
          downloads?: number
          shares?: number
          last_viewed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}