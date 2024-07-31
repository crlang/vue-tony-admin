import type { ComputedRef, InjectionKey, Ref } from 'vue'

import { createContext, useContext } from '@/hooks/core/useContext'

export interface PageContextProps {
  /**
   * 内容区高度
   */
  contentHeight: ComputedRef<number>
  /**
   * 页面高度
   */
  pageHeight: Ref<number>
  /**
   * 设置页面高度
   */
  setPageHeight: (height: number) => Promise<void>
}

/**
 * 页面上下文Key
 */
const key: InjectionKey<PageContextProps> = Symbol('pageContext')

/**
 * 创建页面上下文
 *
 * @param context
 */
export function createPageContext(context: PageContextProps) {
  return createContext<PageContextProps>(context, key, { native: true })
}

/**
 * 页面上下文
 */
export function usePageContext() {
  return useContext<PageContextProps>(key)
}
