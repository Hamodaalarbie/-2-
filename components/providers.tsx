'use client'

import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode
} from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ContactLinks, SiteContent } from '@/lib/types'

type Lang = 'ar' | 'en'
type Theme = 'dark' | 'light'
type Role = 'admin' | 'investor' | 'partner'

export interface User {
  id: string
  name: string
  phone: string
  code: string
  password: string
  role: Role
  rank: string
  dept: string | null
  points: number
  shares: number
  wallet_balance: number
  status: string
  email: string | null
  national_id: string | null
  security_question: string | null
  security_answer: string | null
  created_at: string
}

interface StoreValue {
  lang: Lang
  theme: Theme
  user: User | null
  toggleLang: () => void
  toggleTheme: () => void
  login: (code: string, password: string) => Promise<User | null>
  loginAdmin: (code: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (u: User | null) => void
  refreshUser: () => Promise<void>
  projects: any[]
  services: any[]
  shares: any[]
  products: any[]
  levels: any[]
  users: any[]
  content: SiteContent
  contactLinks: ContactLinks
}

const defaultContent: SiteContent = {
  welcomeAr: '', welcomeEn: '',
  heroTitleAr: '', heroTitleEn: '',
  heroSubAr: '', heroSubEn: '',
  clientPortalAr: '', clientPortalEn: '',
}

const defaultLinks: ContactLinks = {
  telegramPartner: '#', telegramLanding: '#',
  whatsappPartner: '#', whatsappLanding: '#',
}

const StoreContext = createContext<StoreValue>({
  lang: 'ar', theme: 'dark', user: null,
  toggleLang: () => {}, toggleTheme: () => {},
  login: async () => null, loginAdmin: async () => false,
  logout: () => {}, setUser: () => {}, refreshUser: async () => {},
  projects: [], services: [], shares: [], products: [],
  levels: [], users: [], content: defaultContent, contactLinks: defaultLinks,
})

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar')
  const [theme, setTheme] = useState<Theme>('dark')
  const [user, setUserState] = useState<User | null>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [shares, setShares] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [levels, setLevels] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [contactLinks, setContactLinks] = useState<ContactLinks>(defaultLinks)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('arabaawy_user')
      if (stored) setUserState(JSON.parse(stored))
      const storedLang = localStorage.getItem('arabaawy_lang') as Lang
      if (storedLang) setLang(storedLang)
      const storedTheme = localStorage.getItem('arabaawy_theme') as Theme
      if (storedTheme) setTheme(storedTheme)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [theme, lang])

  useEffect(() => {
    const supabase = createClient()
    supabase.from('projects').select('*').then(({ data }) => { if (data) setProjects(data) })
    supabase.from('services').select('*').then(({ data }) => { if (data) setServices(data) })
    supabase.from('shares').select('*').then(({ data }) => { if (data) setShares(data) })
    supabase.from('financial_products').select('*').then(({ data }) => { if (data) setProducts(data) })
    supabase.from('levels').select('*').then(({ data }) => { if (data) setLevels(data) })
    supabase.from('users').select('*').then(({ data }) => { if (data) setUsers(data) })
    supabase.from('site_content').select('*').single().then(({ data }) => { if (data) setContent(data) })
    supabase.from('contact_links').select('*').single().then(({ data }) => { if (data) setContactLinks(data) })
  }, [])

  const setUser = (u: User | null) => {
    setUserState(u)
    if (u) localStorage.setItem('arabaawy_user', JSON.stringify(u))
    else localStorage.removeItem('arabaawy_user')
  }

  const toggleLang = () => {
    const next = lang === 'ar' ? 'en' : 'ar'
    setLang(next)
    localStorage.setItem('arabaawy_lang', next)
  }

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('arabaawy_theme', next)
  }

  const login = async (code: string, password: string): Promise<User | null> => {
    const supabase = createClient()
    const { data } = await supabase.from('users').select('*')
      .eq('code', code.trim().toUpperCase())
      .eq('password', password.trim())
      .neq('role', 'admin').single()
    if (!data) return null
    if (data.status !== 'active') return null
    setUser(data)
    return data
  }

  const loginAdmin = async (code: string, password: string): Promise<boolean> => {
    const supabase = createClient()
    const { data } = await supabase.from('users').select('*')
      .eq('code', code.trim().toUpperCase())
      .eq('password', password.trim())
      .eq('role', 'admin').single()
    if (!data) return false
    setUser(data)
    return true
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') window.location.href = '/'
  }

  const refreshUser = useCallback(async () => {
    if (!user) return
    const supabase = createClient()
    const { data } = await supabase.from('users').select('*').eq('id', user.id).single()
    if (data) setUser(data)
  }, [user])

  return (
    <StoreContext.Provider value={{
      lang, theme, user, toggleLang, toggleTheme,
      login, loginAdmin, logout, setUser, refreshUser,
      projects, services, shares, products, levels, users,
      content, contactLinks,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}