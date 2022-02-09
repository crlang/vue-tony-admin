import { withInstall } from '@/utils'
import qrCode from './src/Qrcode.vue'

export * from './src/typing'
export const QrCode = withInstall(qrCode)
