import type { CreateStorageParams } from './storageCache'
import { createStorage as create } from './storageCache'
import { getStorageShortName } from '@/utils/env'
import projectSetting from '@/settings/projectSetting'

export type Options = Partial<CreateStorageParams>

function createOptions(storage: Storage, options: Options = {}): Options {
  return {
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export function createStorage(storage: Storage = sessionStorage, options: Options = {}) {
  return create(createOptions(storage, options))
}

export function createSessionStorage(options: Options = {}) {
  return createStorage(sessionStorage, { ...options, timeout: projectSetting.cacheTime })
}

export function createLocalStorage(options: Options = {}) {
  return createStorage(localStorage, { ...options, timeout: projectSetting.cacheTime })
}

export default WebStorage
