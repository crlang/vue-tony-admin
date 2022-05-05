import { PageWrapper } from '@/components/PageWrapper'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PageWrapper: typeof PageWrapper
  }
}

export {}
