'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Lock, Clock } from 'lucide-react'
import { useStore } from '@/components/providers'
import { ShareRing } from '@/components/share-ring'
import type { Share } from '@/lib/types'

const PENDING_AR = 'طلبك قيد المراجعة، يستغرق حتى 48 ساعة عمل ⏳'
const PENDING_EN = 'Your request is under review, up to 48 business hours ⏳'

export function ShareCard({ share }: { share: Share }) {
  const { lang, buyShare, sellShare } = useStore()
  const [toast, setToast] = useState(false)
  const soldPct = Math.round(((share.total - share.available) / share.total) * 100)

  function act(kind: 'buy' | 'sell') {
    if (kind === 'buy') buyShare(share.id, 1)
    else sellShare(share.id, 1)
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <div className="glass card-frame relative flex min-w-[260px] flex-col items-center rounded-3xl p-5">
      <h3 className="mb-3 text-center font-bold">{share.name}</h3>
      <ShareRing percent={soldPct} size={130}>
        <span className="text-2xl font-extrabold text-gradient-wave">{soldPct}%</span>
        <span className="text-[11px] text-muted-foreground">
          {lang === 'ar' ? 'مُباع' : 'sold'}
        </span>
      </ShareRing>
      <div className="mt-3 text-center">
        <div className="text-2xl font-extrabold text-gradient-wave">
          {share.price.toLocaleString()}{' '}
          <span className="text-sm font-bold">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {share.available} {lang === 'ar' ? 'حصة متاحة' : 'available'}
        </div>
      </div>
      <div className="mt-4 grid w-full grid-cols-2 gap-2">
        <button
          disabled={!share.buyEnabled}
          onClick={() => act('buy')}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-wave py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!share.buyEnabled && <Lock className="size-3.5" />}
          {lang === 'ar' ? 'شراء' : 'Buy'}
        </button>
        <button
          disabled={!share.sellEnabled}
          onClick={() => act('sell')}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#1e90ff]/40 py-2.5 text-sm font-bold text-[#1e90ff] transition hover:bg-[#1e90ff]/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!share.sellEnabled && <Lock className="size-3.5" />}
          {lang === 'ar' ? 'بيع' : 'Sell'}
        </button>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-3 flex items-center gap-2 rounded-xl bg-[#ff9500]/15 px-3 py-2 text-center text-xs font-semibold text-[#ff9500]"
          >
            <Clock className="size-4 shrink-0" />
            {lang === 'ar' ? PENDING_AR : PENDING_EN}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
