import { useAppStore } from '@/store/modules/app'
import { toggleClass } from './util'

/**
 * Change the status of the project's color weakness mode
 */
export function updateColorWeak(colorWeak: boolean) {
  const appStore = useAppStore()
  toggleClass(colorWeak, 'weak-mode', document.documentElement)
  appStore.setProjectConfig({
    colorWeak: colorWeak,
  })
}
