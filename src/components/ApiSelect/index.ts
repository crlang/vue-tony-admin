import apiSelect from './src/ApiSelect.vue'
import { withInstall } from '@/utils'

export * from './src/typing'
export const ApiSelect = withInstall(apiSelect)

export default ApiSelect
