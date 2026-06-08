'use client'

import { useStore } from '@/components/providers'

export function useAppContext() {
  return useStore()
}