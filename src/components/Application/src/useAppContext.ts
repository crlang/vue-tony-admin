import type { InjectionKey, Ref } from 'vue'
import { createContext, useContext } from '@/hooks/core/useContext'

export interface AppProviderContextProps {
  isMobile: Ref<boolean>
}

const key: InjectionKey<AppProviderContextProps> = Symbol('appProviderContext')

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key)
}
