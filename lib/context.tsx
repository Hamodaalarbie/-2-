'use client'

import { useStore } from '@/components/providers'

export function useAppContext() {
  const store = useStore()
  return {
    user: store.user,
    setUser: store.setUser,
    logout: store.logout,
  }
}
