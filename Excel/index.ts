import { withInstall } from '@/utils'
import impExcel from './src/ImportExcel.vue'
import expExcelModal from './src/ExportExcelModal.vue'

export * from './src/typing'
export const ImpExcel = withInstall(impExcel)
export const ExpExcelModal = withInstall(expExcelModal)
export { jsonToSheetXlsx, aoaToSheetXlsx } from './src/Export2Excel'
