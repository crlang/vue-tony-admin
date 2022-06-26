import { colorIsDark, darken, lighten } from '@/utils/color'
import { useAppStore } from '@/store/modules/app'
import { ThemeEnum } from '@/enums/appEnum'
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
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK
  if (!color) {
    color = appStore.getHeaderSetting.bgColor

    if (!color) {
      color = '#151515'
    }
  }

  const isDark = colorIsDark(color)
  const dyncColor = dyncGenerateColor(color)

  // color
  setCssVar(HEADER_BG_COLOR, color)
  setCssVar(HEADER_TEXT_COLOR, dyncColor.text)

  // hover color
  setCssVar(HEADER_BG_HOVER_COLOR, dyncColor.backgroundHover)
  setCssVar(HEADER_TEXT_HOVER_COLOR, dyncColor.textHover)

  appStore.setProjectConfig({
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  })
}

/**
 * Change the background color of the left menu
 * @param color
 */
export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore()

  const darkMode = appStore.getDarkMode === ThemeEnum.DARK
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

  // only #ffffff is light
  // Only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase())

  appStore.setProjectConfig({
    menuSetting: {
      theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  })
}

/**
 * Dynamically generate text color
 * @param color
 */
function dyncGenerateColor(color?: string) {
  const isDark = colorIsDark(color)

  return {
    text: isDark ? lighten(color, 75) : darken(color, 75),
    textHover: isDark ? lighten(color, 90) : darken(color, 90),
    backgroundHover: isDark ? lighten(color, 5) : darken(color, 5),
  }
}
