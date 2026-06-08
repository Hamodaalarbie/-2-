'use client'

import { Send, MessageCircle } from 'lucide-react'
import { useStore } from '@/components/providers'
import { Logo } from '@/components/logo'

const defaultLinks = {
  telegramLanding: '#',
  whatsappLanding: '#',
  telegramPartner: '#',
  whatsappPartner: '#',
}

export function Footer() {
  const { lang } = useStore()
  const store = useStore() as any
  const contactLinks = store.contactLinks ?? defaultLinks

  return (
    <footer className="border-t border-border/60 px-4 py-12 sm:px-6">
      <div
        className="mx-auto mb-10 h-px max-w-7xl"
        style={{
          background:
            'linear-gradient(90deg,transparent,#1e90ff,#00c6ff,transparent)',
        }}
      />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <Logo size="md" />
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {lang === 'ar'
            ? 'منصة عرباوي — استثمارك في أيدٍ أمينة. انضم إلى آلاف المستثمرين والشركاء.'
            : 'Arabaawy Platform — your investment in trusted hands. Join thousands of investors and partners.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={contactLinks.telegramLanding}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-gradient-wave px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            <Send className="size-4" />
            {lang === 'ar' ? 'تيليجرام' : 'Telegram'}
          </a>
          <a
            href={contactLinks.whatsappLanding}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-[#1e90ff]/40 px-5 py-2.5 text-sm font-bold text-[#1e90ff] transition hover:bg-[#1e90ff]/10"
          >
            <MessageCircle className="size-4" />
            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} عرباوي / Arabaawy.{' '}
          {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}