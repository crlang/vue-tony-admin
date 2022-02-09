import { withInstall } from '@/utils'
import collapseContainer from './src/CollapseContainer/index.vue'
import scrollContainer from './src/ScrollContainer.vue'
import lazyContainer from './src/LazyContainer.vue'

export * from './src/typing'
export const CollapseContainer = withInstall(collapseContainer)
export const ScrollContainer = withInstall(scrollContainer)
export const LazyContainer = withInstall(lazyContainer)
