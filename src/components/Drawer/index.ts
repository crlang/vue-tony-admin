import { withInstall } from '@/utils'
import basicDrawer from './src/BasicDrawer.vue'

export * from './src/typing'
export const BasicDrawer = withInstall(basicDrawer)
export { useDrawer, useDrawerInner } from './src/useDrawer'
