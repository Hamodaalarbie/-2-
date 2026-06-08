'use client'

import { useStore } from '@/components/providers'
import Logo from '@/components/logo'

export function Footer() {
  const { lang, contactLinks } = useStore()
  const ar = lang === 'ar'

  return (
    <footer className="border-t border-border/60 px-4 py-10 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-center">
          <Logo size="sm" />
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <a
            href={contactLinks.telegramLanding}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[#1e90ff]/30 bg-[#1e90ff]/10 px-4 py-2 text-xs font-bold text-[#1e90ff] transition hover:bg-[#1e90ff]/20"
          >
            📱 Telegram
          </a>
          <a
            href={contactLinks.whatsappLanding}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-2 text-xs font-bold text-[#22c55e] transition hover:bg-[#22c55e]/20"
          >
            💬 WhatsApp
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          {ar
            ? '© 2025 عرباوي — جميع الحقوق محفوظة'
            : '© 2025 Arabaawy — All rights reserved'}
        </p>
      </div>
    </footer>
  )
}