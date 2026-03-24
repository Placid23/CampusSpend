
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectToVendors() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/vendors')
  }, [router])

  return null
}
