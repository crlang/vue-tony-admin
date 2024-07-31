import basicDescription from './src/BasicDescription.vue'
import { withInstall } from '@/utils'

export * from './src/typing'
export { useDescription } from './src/useDescription'
export const BasicDescription = withInstall(basicDescription)
export default BasicDescription
