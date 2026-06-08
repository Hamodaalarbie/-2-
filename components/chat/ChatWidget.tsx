'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle, Send, X } from 'lucide-react'
import { useStore } from '@/components/providers'

export function ChatWidget() {
  const { lang, user, messages, sendMessage, contactLinks } = useStore()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const thread = user
    ? messages
        .filter(
          (m) =>
            (m.fromId === user.id && m.toId === 'admin') ||
            (m.fromId === 'admin' && m.toId === user.id),
        )
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    : []

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [thread.length, open])

  if (!user || user.role !== 'partner') return null

  function send() {
    if (!text.trim()) return
    sendMessage('admin', text.trim())
    setText('')
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="glass card-frame fixed bottom-24 end-5 z-50 flex h-[500px] w-[90vw] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-border shadow-2xl"
          >
            <div className="flex items-center justify-between bg-gradient-wave px-4 py-3 text-white">
              <span className="font-bold">
                {lang === 'ar' ? 'محادثة مع الإدارة' : 'Chat with Admin'}
              </span>
              <div className="flex items-center gap-1">
                <a
                  href={contactLinks.telegramPartner}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-1.5 transition hover:bg-white/20"
                  aria-label="Telegram"
                >
                  <Send className="size-4" />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 transition hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {thread.map((m) => {
                const own = m.fromId === user.id
                return (
                  <div
                    key={m.id}
                    className={`flex ${own ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                        own
                          ? 'bg-gradient-wave text-white'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {m.body}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={lang === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
                className="flex-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm outline-none focus:border-[#1e90ff]"
              />
              <button
                onClick={send}
                className="flex size-9 items-center justify-center rounded-xl bg-gradient-wave text-white"
                aria-label="Send"
              >
                <Send className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 end-5 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-wave text-white shadow-xl shadow-[#1e90ff]/30 transition hover:scale-105"
        aria-label={lang === 'ar' ? 'محادثة' : 'Chat'}
      >
        <MessageCircle className="size-6" />
      </button>
    </>
  )
}
