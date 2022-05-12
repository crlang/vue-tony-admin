/**
 * 定义全局组件的智能提示
 *
 * Intellitips for defining global components
 */
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PageWrapper: typeof import('@/components/PageWrapper')
  }
}

export {}
