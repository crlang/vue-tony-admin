import { withInstall } from '@/utils'
import basicModal from './src/BasicModal.vue'

export * from './src/typing'
export { useModalContext } from './src/hooks/useModalContext'
export { useModal, useModalInner } from './src/hooks/useModal'
export const BasicModal = withInstall(basicModal)
export default BasicModal
