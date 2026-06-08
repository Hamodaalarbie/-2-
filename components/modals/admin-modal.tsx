'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { Modal } from '@/components/modal'
import { useStore } from '@/components/providers'

export function AdminModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, loginAdmin } = useStore()
  const router = useRouter()
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
    const ok = await loginAdmin(code, password)
    setLoading(false)
    if (ok) { onClose(); router.push('/admin') }
    else setError(lang === 'ar' ? 'بيانات الإدارة غير صحيحة' : 'Invalid admin credentials')
  }

  return (
    <Modal open={open} onClose={onClose} scheme="admin" title={lang === 'ar' ? 'دخول الإدارة' : 'Admin Login'}>
      <div className="space-y-3">
        <div className="relative">
          <ShieldCheck className="absolute right-3 top-3 size-5 text-muted-foreground" />
          <input value={code} onChange={(e) => setCode(e.target.value)}
            placeholder={lang === 'ar' ? 'كود المدير' : 'Admin Code'}
            className="w-full rounded-xl border border-border bg-secondary/50 py-3 pe-10 ps-4 outline-none focus:border-[#e91e8c]"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
        </div>
        <div className="relative">
          <Lock className="absolute right-3 top-3 size-5 text-muted-foreground" />
          <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder={lang === 'ar' ? 'كلمة المرور' : 'Password'}
            className="w-full rounded-xl border border-border bg-secondary/50 py-3 pe-10 ps-10 outline-none focus:border-[#e91e8c]"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-3 text-muted-foreground">
            {showPass ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" />{error}
          </div>
        )}
        <button onClick={handleLogin} disabled={loading}
          className="w-full rounded-xl bg-gradient-marid py-3 font-bold text-white transition hover:opacity-90 disabled:opacity-60">
          {loading ? '...' : lang === 'ar' ? 'دخول الإدارة' : 'Admin Login'}
        </button>
      </div>
    </Modal>
  )
}
