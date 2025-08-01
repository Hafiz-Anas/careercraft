import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'

interface AuthStore {
  user: User | null
  loading: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user, loading: false }),
      setLoading: (loading) => set({ loading })
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user
      })
    }
  )
)