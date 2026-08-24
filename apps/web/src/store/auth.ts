import { create } from 'zustand'
import { setAccessToken } from '@/lib/api'

type User = { id: string; name: string; email: string; role: 'student' | 'admin' | 'editor' }

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User, accessToken: string) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user, accessToken) => {
    setAccessToken(accessToken)
    set({ user, isAuthenticated: true })
  },
  logout: () => {
    setAccessToken(null)
    set({ user: null, isAuthenticated: false })
  },
}))
