'use client'

import { motion } from 'motion/react'
import { ArrowLeft, Send, TrendingUp, Users, Wallet } from 'lucide-react'
import { useStore } from '@/components/providers'

interface HeroProps {
  onInvestor: () => void
  onPartner: () => void
}

export function Hero({ onInvestor, onPartner }: HeroProps) {
  const { lang, content, contactLinks, projects, users } = useStore()

  const stats = [
    {
      icon: Users,
      value: '1,000+',
      label: lang === 'ar' ? 'مستثمر وشريك' : 'Investors & Partners',
    },
    {
      icon: TrendingUp,
      value: `${projects.length * 4}+`,
      label: lang === 'ar' ? 'مشروع ناجح' : 'Successful Projects',
    },
    {
      icon: Wallet,
      value: '24M',
      label: lang === 'ar' ? 'ج.م رأس مال' : 'EGP Capital',
    },
  ]

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      {/* orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-20 top-10 size-72 rounded-full bg-[#1e90ff]/15 blur-3xl" />
        <div className="absolute -left-20 top-40 size-72 rounded-full bg-[#00c6ff]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-[#1e90ff]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#1e90ff]/30 bg-[#1e90ff]/10 px-4 py-1.5 text-sm font-semibold text-[#1e90ff]"
        >
          {lang === 'ar' ? '⚡ منصة الاستثمار الأولى' : '⚡ The #1 Investment Platform'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-balance text-4xl font-extrabold leading-tight text-gradient-wave sm:text-6xl"
        >
          {lang === 'ar' ? content.heroTitleAr : content.heroTitleEn}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {lang === 'ar' ? content.heroSubAr : content.heroSubEn}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onInvestor}
            className="flex items-center gap-2 rounded-2xl bg-gradient-wave px-6 py-3 font-bold text-white shadow-lg shadow-[#1e90ff]/25 transition hover:opacity-90"
          >
            {lang === 'ar' ? 'كن مستثمراً' : 'Become an Investor'}
            <ArrowLeft className="size-4 rtl:rotate-0 ltr:rotate-180" />
          </button>
          <button
            onClick={onPartner}
            className="rounded-2xl border border-[#1e90ff]/40 px-6 py-3 font-bold text-[#1e90ff] transition hover:bg-[#1e90ff]/10"
          >
            {lang === 'ar' ? 'كن شريكاً' : 'Become a Partner'}
          </button>
          <a
            href={contactLinks.telegramLanding}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-secondary px-6 py-3 font-bold transition hover:bg-secondary/70"
          >
            <Send className="size-4" />
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </a>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass card-frame rounded-3xl p-5"
            >
              <s.icon className="mx-auto mb-2 size-6 text-[#1e90ff]" />
              <div className="text-3xl font-extrabold text-gradient-wave">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
