'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Languages, Sun, Moon, LogOut } from 'lucide-react'
import { useStore } from '@/components/providers'
import { Logo } from '@/components/logo'
import type { Role } from '@/lib/types'

interface ShellProps {
  children: ReactNode
  requiredRole: Role
}

export function DashboardShell({ children, requiredRole }: ShellProps) {
  const { user, lang, theme, toggleLang, toggleTheme, logout } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    } else if (user.role !== requiredRole) {
      const dest =
        user.role === 'admin'
          ? '/admin'
          : user.role === 'partner'
            ? '/partner'
            : '/dashboard'
      router.replace(dest)
    }
  }, [user, requiredRole, router])

  if (!user || user.role !== requiredRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-10 animate-spin rounded-full border-2 border-[#1e90ff] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 glass">
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              'linear-gradient(90deg,transparent,#1e90ff,#00c6ff,transparent)',
          }}
        />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo size="sm" scheme={user.role === 'admin' ? 'admin' : 'default'} />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">
              {user.name}
            </span>
            <button
              onClick={toggleLang}
              className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Toggle language"
            >
              <Languages className="size-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
            <button
              onClick={() => {
                logout()
                router.replace('/')
              }}
              className="flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-sm font-semibold transition hover:bg-destructive hover:text-white"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'خروج' : 'Logout'}
              </span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  )
}
