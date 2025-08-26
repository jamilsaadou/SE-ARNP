'use client'

import { ReactNode } from 'react'
import ErrorBoundary from '../ui/error-boundary'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}
