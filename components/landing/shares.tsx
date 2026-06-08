'use client'

import { useStore } from '@/components/providers'
import { ShareCard } from '@/components/share-card'

export function Shares() {
  const { lang, shares } = useStore()
  const ar = lang === 'ar'

  const published = shares.filter((s) => s.published)

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e91e8c]">
            {ar ? 'الأسهم المتاحة' : 'Available Shares'}
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            {ar ? 'استثمر في حصصنا' : 'Invest in Our Shares'}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((s) => (
            <ShareCard key={s.id} share={s} />
          ))}
        </div>
      </div>
    </section>
  )
}