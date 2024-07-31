import type { InjectionKey, Ref } from 'vue'
import type { Emitter } from '@/utils/mitt'
import { createContext, useContext } from '@/hooks/core/useContext'

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Emitter
  activeName: Ref<string>
}

const key: InjectionKey<SimpleRootMenuContextProps> = Symbol('simple-root-menu')

export function createSimpleRootMenuContext(context: SimpleRootMenuContextProps) {
  return createContext<SimpleRootMenuContextProps>(context, key, { readonly: false, native: true })
}

export function useSimpleRootMenuContext() {
  return useContext<SimpleRootMenuContextProps>(key)
}
