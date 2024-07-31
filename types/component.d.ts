/**
 * 定义全局组件的智能提示
 */
declare module 'vue' {
  export interface GlobalComponents {
    // PageWrapper 全局组件类型声明
    PageWrapper: typeof import('@/components/PageWrapper')['default']
  }
}

export {}
