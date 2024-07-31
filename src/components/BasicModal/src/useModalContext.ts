import type { InjectionKey } from 'vue'

import { createContext, useContext } from '@/hooks/core/useContext'

/**
 * 弹窗上下文支持的 props
 */
export interface ModalContextProps {
  /**
   * 刷新弹窗高度
   */
  redoModalHeight: () => void
}

const key: InjectionKey<ModalContextProps> = Symbol('ModalContext')

/**
 * 创建弹窗上下文
 */
export function createModalContext(context: ModalContextProps) {
  return createContext<ModalContextProps>(context, key)
}

/**
 * 使用弹窗上下文
 */
export function useModalContext() {
  return useContext<ModalContextProps>(key)
}
