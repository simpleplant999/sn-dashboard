// lib/persister.ts
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export const localStoragePersister =
  typeof window !== 'undefined'
    ? createSyncStoragePersister({
        storage: window.localStorage,
        key: 'REACT_QUERY_OFFLINE_CACHE',
        throttleTime: 1000,
      })
    : undefined
