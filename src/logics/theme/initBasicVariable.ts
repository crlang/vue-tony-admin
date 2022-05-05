import projectSetting from '@/settings/projectSetting'
import { setCssVar } from './util'

const HEADER_HEIGHT = '--header-height'
const TABS_HEIGHT = '--tabs-height'

/**
 * 初始化页面基础模块尺寸
 *
 * Initialize page base module size
 */
export function initBasicHeight() {
  const hsh = projectSetting.headerSetting.height + 'px'
  const mtsh = projectSetting.multiTabsSetting.height + 'px'

  setCssVar(HEADER_HEIGHT, hsh)
  setCssVar(TABS_HEIGHT, mtsh)
}
