import { useAppStore } from '@/store/modules/app'
import { setCssVar } from './util'

const HEADER_HEIGHT = '--header-height'
const TABS_HEIGHT = '--tabs-height'

export function updateHeaderHeight() {
  const appStore = useAppStore()
  const height = appStore.getProjectConfig.headerSetting.height + 'px'

  setCssVar(HEADER_HEIGHT, height)
}

export function updateTabsHeight() {
  const appStore = useAppStore()
  const height = appStore.getProjectConfig.multiTabsSetting.height + 'px'

  setCssVar(TABS_HEIGHT, height)
}
