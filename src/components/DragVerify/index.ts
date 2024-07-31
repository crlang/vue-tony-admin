import basicDragVerify from './src/DragVerify.vue'
import rotateDragVerify from './src/ImgRotate.vue'
import { withInstall } from '@/utils'

export * from './src/typing'
export const BasicDragVerify = withInstall(basicDragVerify)
export const RotateDragVerify = withInstall(rotateDragVerify)
