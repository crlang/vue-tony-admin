import { useAppStore } from '@/store/modules/app'
import { toggleClass } from './util'

/**
 * Change project gray mode status
 */
export function updateGrayMode(gray: boolean) {
  const appStore = useAppStore()
  toggleClass(gray, 'gray-mode', document.documentElement)
  appStore.setProjectConfig({
    grayMode: gray,
  })
}
