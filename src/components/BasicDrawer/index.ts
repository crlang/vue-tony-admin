import basicDrawer from './src/BasicDrawer.vue'
import { withInstall } from '@/utils'

export * from './src/typing'
export { useDrawer, useDrawerInner } from './src/useDrawer'
export const BasicDrawer = withInstall(basicDrawer)
export default BasicDrawer
