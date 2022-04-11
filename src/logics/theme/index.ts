import { useAppStore } from '@/store/modules/app'
import { setCssVar } from './util'

export async function changeTheme(color: string) {
  const appStore = useAppStore()
  setCssVar('--primary-color', color)

  appStore.setProjectConfig({
    themeColor: color,
  })
}
