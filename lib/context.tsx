'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = {
  id: string
  email: string
  // أضف أي حقول تحتاجها
}

type AppContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const logout = () => setUser(null)

  return (
    <AppContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}