import { useDark, useToggle } from '@vueuse/core'

/**
 * 是否黑暗模式
 *
 * Whether dark mode
 */
export const isDark = useDark()

/**
 * 更新主题暗模式
 *
 * Update theme dark mode
 * @param mode 模式
 */
export const toggleDarkMode = useToggle(isDark)
