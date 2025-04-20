'use client'

import { ReactNode, useEffect, useState } from 'react'

export function ClientTransition({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <>{children}</> : null
}

export default ClientTransition 