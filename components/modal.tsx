'use client'

import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type Scheme = 'default' | 'admin' | 'investor' | 'featured'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  scheme?: Scheme
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const BAR: Record<Scheme, string> = {
  default: 'bg-gradient-wave',
  investor: 'bg-gradient-wave',
  admin: 'bg-gradient-pink',
  featured: 'bg-gradient-marid',
}

const WIDTH = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }

export function Modal({
  open,
  onClose,
  title,
  scheme = 'default',
  children,
  size = 'md',
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`glass card-frame relative w-full ${WIDTH[size]} overflow-hidden rounded-3xl border border-border shadow-2xl`}
          >
            <div className={`h-[2px] w-full ${BAR[scheme]}`} />
            <div className="flex items-center justify-between px-6 pt-5">
              {title && <h2 className="text-xl font-bold">{title}</h2>}
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                aria-label="إغلاق"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto px-6 pb-6 pt-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
