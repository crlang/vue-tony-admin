import { darken } from '@/utils/color'
import { useAppStore } from '@/store/modules/app'
import { setCssVar } from './util'

const HEADER_BG_COLOR = '--header-background-color'
const HEADER_BG_HOVER_COLOR = '--header-background-hover-color'
const HEADER_TEXT_COLOR = '--header-text-color'
const HEADER_TEXT_HOVER_COLOR = '--header-text-hover-color'

const SIDER_BG_COLOR = '--sider-background-color'
const SIDER_BG_HOVER_COLOR = '--sider-background-hover-color'
const SIDER_TEXT_COLOR = '--sider-text-color'
const SIDER_TEXT_HOVER_COLOR = '--sider-text-hover-color'

/**
 * Change the background color of the top header
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const appStore = useAppStore()
  if (!color) {
    color = appStore.getHeaderSetting.bgColor

    if (!color) {
      color = '#151515'
    }
  }

  const dyncColor = dyncGenerateColor(color)

  // color
  setCssVar(HEADER_BG_COLOR, color)
  setCssVar(HEADER_TEXT_COLOR, dyncColor.text)

  // hover color
  setCssVar(HEADER_BG_HOVER_COLOR, dyncColor.backgroundHover)
  setCssVar(HEADER_TEXT_HOVER_COLOR, dyncColor.textHover)
}

/**
 * Change the background color of the left menu
 * @param color
 */
export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore()

  if (!color) {
    color = appStore.getMenuSetting.bgColor
    if (!color) {
      color = '#212121'
    }
  }

  const dyncColor = dyncGenerateColor(color)

  setCssVar(SIDER_BG_COLOR, color)
  setCssVar(SIDER_TEXT_COLOR, dyncColor.text)

  // hover color
  setCssVar(SIDER_BG_HOVER_COLOR, dyncColor.backgroundHover)
  setCssVar(SIDER_TEXT_HOVER_COLOR, dyncColor.textHover)
}

/**
 * Dynamically generate text color
 * @param color
 */
function dyncGenerateColor(color?: string) {
  return {
    text: darken(color, 75),
    textHover: darken(color, 90),
    backgroundHover: darken(color, 5),
  }
}
