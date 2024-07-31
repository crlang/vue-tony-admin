import { useDark, useToggle } from '@vueuse/core'

import { darkHeaderColor, darkSidebarColor, primaryColor } from '@/settings/designSetting'
import { useAppStore } from '@/store/modules/app'
import { colorIsDark, darken, lighten } from '@/utils/color'

const HEADER_HEIGHT = '--header-height'
const TABS_HEIGHT = '--tabs-height'

const HEADER_BG_COLOR = '--header-background-color'
const HEADER_BG_HOVER_COLOR = '--header-background-hover-color'
const HEADER_TEXT_COLOR = '--header-text-color'
const HEADER_TEXT_HOVER_COLOR = '--header-text-hover-color'

const SIDER_BG_COLOR = '--sider-background-color'
const SIDER_BG_HOVER_COLOR = '--sider-background-hover-color'
const SIDER_TEXT_COLOR = '--sider-text-color'
const SIDER_TEXT_HOVER_COLOR = '--sider-text-hover-color'

/**
 * 是否黑暗模式
 */
export const isDark = useDark()

/**
 * 更新主题暗模式
 *
 * @param mode 模式
 */
export const toggleDarkMode = useToggle(isDark)

/**
 * 修改主题颜色
 *
 * @param color
 */
export async function changeTheme(color: string) {
  const appStore = useAppStore()
  color = color || primaryColor
  if (!color)
    return

  appStore.setProjectConfig({
    themeColor: color,
  })

  setCssVar('--primary-color', color)

  // Cover Element Plus 主题
  setCssVar('--el-color-primary', color)
  for (let i = 1; i <= 20; i++) {
    setCssVar(`--el-color-primary-light-${i}`, lighten(color, i * 5))
    setCssVar(`--el-color-primary-dark-${i}`, darken(color, i * 5))
  }
}

/**
 * 更改头部区块的颜色
 *
 * @param color
 */
export function updateHeaderColor(color?: string) {
  const appStore = useAppStore()
  color = color || appStore?.getHeaderSetting?.bgColor || '#151515'

  if (isDark.value) {
    color = darkHeaderColor
  }

  const dyncColor = dyncGenerateColor(color)

  setCssVar(HEADER_BG_COLOR, dyncColor.background)
  setCssVar(HEADER_TEXT_COLOR, dyncColor.text)

  setCssVar(HEADER_BG_HOVER_COLOR, dyncColor.backgroundHover)
  setCssVar(HEADER_TEXT_HOVER_COLOR, dyncColor.textHover)
}

/**
 * 修改侧边菜单区块颜色
 *
 * @param color
 */
export function updateSidebarColor(color?: string) {
  const appStore = useAppStore()
  color = color || appStore?.getMenuSetting?.bgColor || '#212121'

  if (isDark.value) {
    color = darkSidebarColor
  }

  const dyncColor = dyncGenerateColor(color)

  setCssVar(SIDER_BG_COLOR, dyncColor.background)
  setCssVar(SIDER_TEXT_COLOR, dyncColor.text)

  setCssVar(SIDER_BG_HOVER_COLOR, dyncColor.backgroundHover)
  setCssVar(SIDER_TEXT_HOVER_COLOR, dyncColor.textHover)
}

/**
 * 动态颜色生成器
 *
 * @param color
 */
function dyncGenerateColor(color?: string) {
  const isDark = colorIsDark(color)

  return {
    text: isDark ? lighten(color, 75) : darken(color, 75),
    textHover: isDark ? lighten(color, 90) : darken(color, 90),
    background: color,
    backgroundHover: isDark ? lighten(color, 10) : darken(color, 10),
  }
}

/**
 * 切换类
 *
 * @param flag boolean
 * @param clsName string
 * @param target HTMLElement
 */
export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target || document.body
  if (targetEl.classList.contains(clsName)) {
    if (!flag) {
      targetEl.classList.remove(clsName)
    }
  }
  else {
    if (flag) {
      targetEl.classList.add(clsName)
    }
  }
}

/**
 * 自定义设置HTML元素的属性
 *
 * @param prop
 * @param val
 * @param target
 */
export function setCssVar(prop: string, val: any, target?: HTMLElement = null) {
  const targetEl = target || document.documentElement
  targetEl.style.setProperty(prop, val)
}

/**
 * 获取自定义设置的HTML元素属性
 *
 * @param prop string
 * @param target HTMLElement
 */
export function getCssVar(prop: string, target?: HTMLElement = null) {
  const targetEl = target || document.documentElement
  return getComputedStyle(targetEl).getPropertyValue(prop) || ''
}

/**
 * 设置为灰色模式
 */
export function updateGrayMode(gray: boolean) {
  const appStore = useAppStore()
  toggleClass(gray, 'gray-mode', document.documentElement)
  appStore.setProjectConfig({
    grayMode: gray,
  })
}

/**
 * 设置为色弱模式
 */
export function updateColorWeak(colorWeak: boolean) {
  const appStore = useAppStore()
  toggleClass(colorWeak, 'weak-mode', document.documentElement)
  appStore.setProjectConfig({
    colorWeak,
  })
}

/**
 * 初始化页面基础模块尺寸
 */
export function initBasicHeight(headerHeight, tabsHeight) {
  setCssVar(HEADER_HEIGHT, `${headerHeight}px`)
  setCssVar(TABS_HEIGHT, `${tabsHeight}px`)
}
