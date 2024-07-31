import pageWrapper from './src/PageWrapper.vue'
import { withInstall } from '@/utils'

export { PageWrapperFixedHeightKey } from './src/helper'

/**
 * 组件已全局注册
 */
export const PageWrapper = withInstall(pageWrapper)
export default PageWrapper
