'use client'

import { Languages, Sun, Moon, Shield } from 'lucide-react'
import { useStore } from '@/components/providers'
import { Logo } from '@/components/logo'

interface NavbarProps {
  onAdmin: () => void
  onLogin: () => void
  onPartner: () => void
}

export function Navbar({ onAdmin, onLogin, onPartner }: NavbarProps) {
  const { lang, theme, toggleLang, toggleTheme } = useStore()

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass">
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(90deg,transparent,#1e90ff,#00c6ff,transparent)',
        }}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo size="md" />
        <div className="flex items-center gap-1.5 sm:gap-2">
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
            onClick={onPartner}
            className="hidden rounded-xl border border-[#1e90ff]/40 px-3 py-2 text-sm font-semibold text-[#1e90ff] transition hover:bg-[#1e90ff]/10 sm:block"
          >
            {lang === 'ar' ? 'تسجيل شريك' : 'Join as Partner'}
          </button>
          <button
            onClick={onLogin}
            className="rounded-xl bg-gradient-wave px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#1e90ff]/20 transition hover:opacity-90"
          >
            {lang === 'ar' ? 'دخول' : 'Login'}
          </button>
          <button
            onClick={onAdmin}
            className="rounded-xl p-2 text-[#e91e8c] transition hover:bg-[#e91e8c]/10"
            aria-label="Admin"
          >
            <Shield className="size-5" />
          </button>
        </div>
      </nav>
    </header>
  )
}
