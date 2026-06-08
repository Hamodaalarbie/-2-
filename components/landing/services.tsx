'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import * as Icons from 'lucide-react'
import { useStore } from '@/components/providers'
import type { LucideIcon } from 'lucide-react'

export function Services() {
  const { lang, services } = useStore()
  const active = services.filter((s) => s.active).sort((a, b) => a.order - b.order)

  return (
    <section className="px-4 py-16 sm:px-6" id="services">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient-wave">
            {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          {lang === 'ar'
            ? 'حلول استثمارية متكاملة مصممة لتحقيق أهدافك المالية.'
            : 'Complete investment solutions designed to achieve your financial goals.'}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {active.map((s, i) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass card-frame group overflow-hidden rounded-3xl"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={s.imageUrl || '/placeholder.svg'}
                    alt={lang === 'ar' ? s.titleAr : s.titleEn}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-2xl bg-gradient-wave text-white shadow-lg">
                    <Icon className="size-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">
                    {lang === 'ar' ? s.titleAr : s.titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {lang === 'ar' ? s.descAr : s.descEn}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {s.columns.map((c, ci) => (
                      <div
                        key={ci}
                        className="rounded-2xl bg-secondary/60 px-3 py-2 text-center"
                      >
                        <div className="text-[11px] text-muted-foreground">
                          {lang === 'ar' ? c.labelAr : c.labelEn}
                        </div>
                        <div className="text-sm font-bold text-[#1e90ff]">
                          {lang === 'ar' ? c.valueAr : c.valueEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
