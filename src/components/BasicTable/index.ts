import { withInstall } from '@/utils'
import basicTable from './src/BasicTable.vue'

// export { default as BasicTable } from './src/BasicTable.vue'
// export { default as TableAction } from './src/components/TableAction.vue'
// export type { FormSchema, FormProps } from '@/components/Form/src/types/form'

export * from './src/typing'
export { useTable } from './src/hooks/useTable'
export const BasicTable = withInstall(basicTable)
export default BasicTable
