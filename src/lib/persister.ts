// lib/persister.ts
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const localStoragePersister =createSyncStoragePersister({
  storage: window.localStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
  throttleTime: 1000,
})
