'use client'

import { useStore } from '@/components/providers'
import { Medal, Award, Trophy, Gem } from 'lucide-react'

const ICONS: Record<string, typeof Medal> = {
  Medal, Award, Trophy, Gem,
}

export function WelcomeLevels() {
  const { lang, levels } = useStore()
  const ar = lang === 'ar'

  return (
    <section className="border-t border-border/60 bg-card/50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
            {ar ? 'مستويات العضوية' : 'Membership Levels'}
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            {ar ? 'ارتقِ في المستويات' : 'Level Up Your Journey'}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l) => {
            const Icon = ICONS[l.icon] ?? Medal
            return (
              <div
                key={l.id}
                className="glass card-frame rounded-3xl p-6 text-center"
              >
                <div
                  className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl"
                  style={{ background: `${l.color}20`, border: `1.5px solid ${l.color}` }}
                >
                  <Icon className="size-7" style={{ color: l.color }} />
                </div>
                <h3 className="mb-1 text-lg font-black" style={{ color: l.color }}>
                  {ar ? l.nameAr : l.nameEn}
                </h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  {l.minPoints.toLocaleString()}+ {ar ? 'نقطة' : 'pts'}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {ar ? l.requirementsAr : l.requirementsEn}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}