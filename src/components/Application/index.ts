import appLogo from './src/AppLogo.vue'
import appProvider from './src/AppProvider.vue'
import appDarkModeToggle from './src/AppDarkModeToggle.vue'
import { withInstall } from '@/utils'

export { useAppProviderContext } from './src/useAppContext'

export const AppLogo = withInstall(appLogo)
export const AppProvider = withInstall(appProvider)
export const AppDarkModeToggle = withInstall(appDarkModeToggle)
