import basicTable from './src/BasicTable.vue'
import { withInstall } from '@/utils'

export * from './src/typing'
export { useTable } from './src/hooks/useTable'
export const BasicTable = withInstall(basicTable)
export default BasicTable
