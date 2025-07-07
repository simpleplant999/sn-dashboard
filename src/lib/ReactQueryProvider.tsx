// components/ReactQueryProvider.tsx
'use client'

import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ReactNode, useState } from 'react'
import { localStoragePersister } from '@/lib/persister'

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24, // 24h
          },
        },
      })
  )

  if (!localStoragePersister) return null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 24,
        // Uncomment to version your cache:
        // buster: 'v1',
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
