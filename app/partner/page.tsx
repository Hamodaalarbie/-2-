'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Zap, TrendingUp, Briefcase, ListChecks, Layers, Wallet, HelpCircle, Gift, Copy, Check, Star, ArrowLeftRight, ShoppingCart, ChevronRight } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/shell'
import { useStore } from '@/components/providers'
import { createClient } from '@/lib/supabase/client'

const STAR_RANKS: Record<string, { stars: number; badge: string; color: string; label: string; labelEn: string }> = {
  iron:     { stars: 1, badge: '🛡️', color: '#9ca3af', label: 'حديد',   labelEn: 'Iron' },
  bronze:   { stars: 2, badge: '🥉', color: '#cd7f32', label: 'برونز',  labelEn: 'Bronze' },
  silver:   { stars: 3, badge: '🥈', color: '#94a3b8', label: 'فضة',    labelEn: 'Silver' },
  gold:     { stars: 4, badge: '🥇', color: '#f59e0b', label: 'ذهب',    labelEn: 'Gold' },
  platinum: { stars: 5, badge: '💎', color: '#38bdf8', label: 'بلاتين', labelEn: 'Platinum' },
  royal:    { stars: 5, badge: '👑', color: '#e91e8c', label: 'رويال',  labelEn: 'Royal' },
}

function Stars({ rank }: { rank: string }) {
  const r = STAR_RANKS[rank] ?? STAR_RANKS.iron
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={10} fill={i < r.stars ? r.color : 'transparent'} stroke={i < r.stars ? r.color : '#444'} />
      ))}
    </div>
  )
}

export default function PartnerDashboard() {
  return (
    <DashboardShell requiredRole="partner">
      <PartnerContent />
    </DashboardShell>
  )
}

function PartnerContent() {
  const { user, lang, refreshUser } = useStore()
  const router = useRouter()
  const [notifications, setNotifications] = useState<any[]>([])
  const [settings, setSettings] = useState<any>(null)
  const [promoCode, setPromoCode] = useState('')
  const [promoMsg, setPromoMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [showSharesCard, setShowSharesCard] = useState(false)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const h = new Date().getHours()
    setGreeting(h < 12 ? (lang === 'ar' ? 'صباح الخير' : 'Good Morning') : h < 17 ? (lang === 'ar' ? 'مساء الخير' : 'Good Afternoon') : (lang === 'ar' ? 'مساء النور' : 'Good Evening'))
  }, [lang])

  const load = useCallback(async () => {
    if (!user) return
    const supabase = createClient()
    const [{ data: notifs }, { data: sets }] = await Promise.all([
      supabase.from('notifications').select('*').or(`target_user_id.eq.${user.id},target_all.eq.true`).order('created_at', { ascending: false }).limit(10),
      supabase.from('settings').select('*').limit(1).single(),
    ])
    if (notifs) setNotifications(notifs)
    if (sets) setSettings(sets)
  }, [user])

  useEffect(() => { load() }, [load])

  const copyCode = () => {
    if (!user) return
    navigator.clipboard.writeText(user.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const redeemPromo = async () => {
    if (!promoCode.trim() || !user) return
    const supabase = createClient()
    const { data: promo } = await supabase.from('promo_codes').select('*').eq('code', promoCode.trim().toUpperCase()).single()
    if (!promo) { setPromoMsg({ type: 'error', text: lang === 'ar' ? 'كود غير صحيح' : 'Invalid code' }); return }
    if (promo.used_count >= promo.max_uses) { setPromoMsg({ type: 'error', text: lang === 'ar' ? 'تم استخدام الكود' : 'Code already used' }); return }
    const newPoints = user.points + promo.points_value
    await supabase.from('users').update({ points: newPoints }).eq('id', user.id)
    await supabase.from('promo_codes').update({ used_count: promo.used_count + 1 }).eq('id', promo.id)
    await refreshUser()
    setPromoCode('')
    setPromoMsg({ type: 'success', text: `${lang === 'ar' ? 'تم إضافة' : 'Added'} ${promo.points_value} ${lang === 'ar' ? 'نقطة!' : 'points!'}` })
    setTimeout(() => setPromoMsg(null), 3000)
  }

  if (!user) return null

  const rank = STAR_RANKS[user.rank] ?? STAR_RANKS.iron
  const unread = notifications.filter(n => !n.is_read).length

  const ACTIONS = [
    { icon: ListChecks, label: lang === 'ar' ? 'المهام' : 'Tasks', action: () => router.push('/tasks'), color: '#1e90ff' },
    { icon: Layers, label: lang === 'ar' ? 'المشاريع' : 'Projects', action: () => router.push('/projects'), color: '#1e90ff' },
    { icon: Wallet, label: lang === 'ar' ? 'السحب' : 'Withdraw', action: () => {}, color: '#22c55e' },
    { icon: ArrowLeftRight, label: lang === 'ar' ? 'تحويل' : 'Convert', action: () => {}, color: '#38bdf8' },
    { icon: HelpCircle, label: lang === 'ar' ? 'مساعدة' : 'Help', action: () => {}, color: '#f59e0b' },
  ]

  return (
    <div className="space-y-5 max-w-lg mx-auto">

      {/* Welcome Card */}
      <div className="rounded-2xl p-5 relative overflow-hidden card-frame" style={{ background: 'linear-gradient(135deg, rgba(30,144,255,0.08), var(--card))' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-[#1e90ff] mb-0.5">{greeting} 👋</p>
            <h1 className="text-xl font-black text-foreground">{user.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg">{rank.badge}</span>
              <div>
                <p className="text-xs font-bold" style={{ color: rank.color }}>{lang === 'ar' ? rank.label : rank.labelEn}</p>
                <Stars rank={user.rank} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            {user.dept && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#1e90ff]/10">
                <Briefcase size={12} color="#1e90ff" />
                <span className="text-xs font-bold text-[#1e90ff]">{user.dept}</span>
              </div>
            )}
            <button onClick={copyCode} className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-border bg-secondary/50 transition hover:bg-secondary">
              <span className="text-xs font-mono text-muted-foreground">{user.code}</span>
              {copied ? <Check size={11} color="#22c55e" /> : <Copy size={11} color="#9ca3af" />}
            </button>
          </div>
        </div>
      </div>

      {/* Shares Card */}
      <div
        className="rounded-2xl p-5 cursor-pointer transition-all active:scale-95"
        style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), var(--card))', border: '1.5px solid rgba(34,197,94,0.3)' }}
        onClick={() => setShowSharesCard(!showSharesCard)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} color="#22c55e" />
            <h3 className="font-bold text-sm text-foreground">{lang === 'ar' ? 'محفظة الأسهم' : 'Share Portfolio'}</h3>
          </div>
          <ChevronRight size={16} className="text-muted-foreground transition-transform" style={{ transform: showSharesCard ? 'rotate(90deg)' : 'none' }} />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-black text-[#22c55e]">{user.shares.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{lang === 'ar' ? 'سهم' : 'Shares'}</p>
          </div>
          {settings && (
            <div className="text-left">
              <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'القيمة' : 'Value'}</p>
              <p className="text-lg font-black text-foreground">{(user.shares * (settings.share_price_per_point ?? 10)).toLocaleString()} {lang === 'ar' ? 'ج' : 'EGP'}</p>
            </div>
          )}
        </div>
        {showSharesCard && (
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 bg-[#22c55e] text-black">
              <ArrowLeftRight size={14} />{lang === 'ar' ? 'تحويل لنقاط' : 'Convert'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); router.push('/market') }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 border border-[#1e90ff]/40 text-[#1e90ff]">
              <ShoppingCart size={14} />{lang === 'ar' ? 'السوق' : 'Market'}
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4 card-frame" style={{ background: 'var(--card)' }}>
          <Zap size={18} color="#1e90ff" />
          <p className="text-2xl font-black text-foreground mt-1">{user.points.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'نقطة' : 'Points'}</p>
        </div>
        <div className="rounded-2xl p-4 card-frame" style={{ background: 'var(--card)' }}>
          <Briefcase size={18} color="#1e90ff" />
          <p className="text-2xl font-black text-foreground mt-1">{user.dept ?? '-'}</p>
          <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'القسم' : 'Department'}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-bold text-muted-foreground mb-3">{lang === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}</h3>
        <div className="grid grid-cols-3 gap-3">
          {ACTIONS.map((a) => (
            <button key={a.label} onClick={a.action}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border border-border transition-all active:scale-95 hover:bg-secondary"
              style={{ background: 'var(--card)' }}>
              <div className="p-2 rounded-xl" style={{ background: `${a.color}18` }}>
                <a.icon size={20} color={a.color} />
              </div>
              <span className="text-xs font-bold text-muted-foreground">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Promo Code */}
      <div className="rounded-2xl p-4 card-frame" style={{ background: 'var(--card)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Gift size={18} color="#1e90ff" />
          <h3 className="text-sm font-bold text-foreground">{lang === 'ar' ? 'كود الترقية' : 'Promo Code'}</h3>
        </div>
        <div className="flex gap-2">
          <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder={lang === 'ar' ? 'أدخل الكود' : 'Enter code'}
            className="flex-1 rounded-xl border border-border bg-secondary/50 py-2.5 px-4 text-sm text-foreground outline-none focus:border-[#1e90ff]"
            onKeyDown={(e) => e.key === 'Enter' && redeemPromo()} />
          <button onClick={redeemPromo} className="px-4 rounded-xl font-bold text-sm bg-gradient-wave text-white">
            {lang === 'ar' ? 'استرداد' : 'Redeem'}
          </button>
        </div>
        {promoMsg && <p className="mt-2 text-sm" style={{ color: promoMsg.type === 'success' ? '#22c55e' : '#ef4444' }}>{promoMsg.text}</p>}
      </div>

      {/* Notifications */}
      <div className="rounded-2xl p-4 card-frame" style={{ background: 'var(--card)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell size={18} color="#1e90ff" />
            <h3 className="text-sm font-bold text-foreground">{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</h3>
            {unread > 0 && <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-[#1e90ff] text-white">{unread}</span>}
          </div>
        </div>
        {notifications.length === 0
          ? <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}</p>
          : notifications.slice(0, 3).map((n) => (
            <div key={n.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <div className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: n.is_read ? '#333' : '#1e90ff' }} />
              <div>
                <p className="text-sm font-bold text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground truncate">{n.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
