import { isDevMode } from '@/utils/env'

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// aes encryption key
export const cacheCipher = {
  key: 'NnwHZ@h@P1NY@6ci',
  iv: '9tnPDWBC1.2heMem',
}

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode()
