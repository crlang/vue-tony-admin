import { withInstall } from '@/utils'
import qrCode from './src/QrCode.vue'

export * from './src/typing'
export const QrCode = withInstall(qrCode)
