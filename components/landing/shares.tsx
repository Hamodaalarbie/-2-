'use client'

import { motion } from 'motion/react'
import { Sparkles, AlertTriangle } from 'lucide-react'
import { useStore } from '@/components/providers'
import { ShareCard } from '@/components/share-card'

export function Shares() {
  const { lang, shares, products } = useStore()
  const published = shares.filter((s) => s.published)
  const activeProducts = products.filter((p) => p.active)

  return (
    <section className="px-4 py-16 sm:px-6" id="shares">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient-wave">
            {lang === 'ar' ? 'الحصص والمنتجات المالية' : 'Shares & Financial Products'}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          {lang === 'ar'
            ? 'اشترِ حصصاً في مشاريعنا أو اشترك في منتجاتنا المالية عالية العائد.'
            : 'Buy shares in our projects or subscribe to high-yield financial products.'}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((s) => (
            <ShareCard key={s.id} share={s} />
          ))}
        </div>

        <h3 className="mt-16 text-center text-2xl font-extrabold">
          <span className="text-gradient-marid">
            {lang === 'ar' ? 'المنتجات المالية' : 'Financial Products'}
          </span>
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {activeProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass card-frame rounded-3xl p-6"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-marid text-white shadow-lg">
                <Sparkles className="size-6" />
              </div>
              <h4 className="text-lg font-bold">
                {lang === 'ar' ? p.nameAr : p.nameEn}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {lang === 'ar' ? p.descAr : p.descEn}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-gradient-marid">
                    {p.returnRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lang === 'ar' ? 'عائد سنوي' : 'annual return'}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-sm font-bold">
                    {p.minInvest.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lang === 'ar' ? 'حد أدنى' : 'minimum'}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#ff9500]">
                <AlertTriangle className="size-3.5" />
                {lang === 'ar'
                  ? 'الخروج المبكر: خصم 10%'
                  : 'Early exit: 10% penalty'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
