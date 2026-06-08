'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import * as Icons from 'lucide-react'
import { useStore } from '@/components/providers'
import { createClient } from '@/lib/supabase/client'
import type { LucideIcon } from 'lucide-react'
import type { Level, SiteContent } from '@/lib/types'

const defaultContent: SiteContent = {
  welcomeAr: '',
  welcomeEn: '',
  heroTitleAr: '',
  heroTitleEn: '',
  heroSubAr: '',
  heroSubEn: '',
  clientPortalAr: '',
  clientPortalEn: '',
}

export function WelcomeLevels() {
  const { lang } = useStore()
  const [levels, setLevels] = useState<Level[]>([])
  const [content, setContent] = useState<SiteContent>(defaultContent)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('levels').select('*').then(({ data }) => {
      if (data) setLevels(data)
    })
    supabase.from('site_content').select('*').single().then(({ data }) => {
      if (data) setContent(data)
    })
  }, [])

  const sorted = [...levels].sort((a, b) => a.minPoints - b.minPoints)

  return (
    <section className="px-4 py-16 sm:px-6" id="levels">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass card-frame mb-12 rounded-3xl p-8 text-center"
        >
          <p className="mx-auto max-w-2xl text-pretty text-lg font-semibold leading-relaxed">
            {lang === 'ar' ? content.welcomeAr : content.welcomeEn}
          </p>
        </motion.div>

        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient-wave">
            {lang === 'ar' ? 'مستويات العضوية' : 'Membership Levels'}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          {lang === 'ar'
            ? 'ارتقِ في المستويات واحصل على مزايا حصرية مع كل إنجاز.'
            : 'Climb the levels and unlock exclusive benefits with every achievement.'}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((l, i) => {
            const Icon = (Icons[l.icon as keyof typeof Icons] ??
              Icons.Award) as LucideIcon
            return (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass card-frame rounded-3xl p-6 text-center"
              >
                <div
                  className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${l.color}22`, color: l.color }}
                >
                  <Icon className="size-7" />
                </div>
                <h3 className="text-lg font-bold" style={{ color: l.color }}>
                  {lang === 'ar' ? l.nameAr : l.nameEn}
                </h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {l.minPoints.toLocaleString()}{' '}
                  {lang === 'ar' ? 'نقطة' : 'pts'}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {lang === 'ar' ? l.requirementsAr : l.requirementsEn}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}