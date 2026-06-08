'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Users } from 'lucide-react'
import { useStore } from '@/components/providers'

export function Projects() {
  const { lang, projects } = useStore()
  const active = projects.filter((p) => p.active)

  return (
    <section className="px-4 py-16 sm:px-6" id="projects">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient-wave">
            {lang === 'ar' ? 'مشاريعنا' : 'Our Projects'}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          {lang === 'ar'
            ? 'فرص استثمارية حقيقية بعوائد مدروسة وشفافية كاملة.'
            : 'Real investment opportunities with calculated returns and full transparency.'}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {active.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass card-frame group overflow-hidden rounded-3xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={p.imageUrl || '/placeholder.svg'}
                  alt={lang === 'ar' ? p.titleAr : p.titleEn}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full bg-gradient-wave px-3 py-1 text-xs font-bold text-white">
                  {p.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">
                  {lang === 'ar' ? p.titleAr : p.titleEn}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {lang === 'ar' ? p.descAr : p.descEn}
                </p>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {lang === 'ar' ? 'نسبة التمويل' : 'Funded'}
                    </span>
                    <span className="font-bold text-[#1e90ff]">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-wave"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="size-4 text-[#1e90ff]" />
                  {p.investorsCount} {lang === 'ar' ? 'مستثمر' : 'investors'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
