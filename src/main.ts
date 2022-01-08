import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
// Register icon sprite
import 'virtual:svg-icons-register'
// if (import.meta.env.DEV) {
import('element-plus/dist/index.css')
// }
import App from './App.vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupErrorHandle } from '@/logics/error-handle'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@/store'
import { setupGlobDirectives } from '@/directives'
import { setupI18n } from '@/locales/setupI18n'
import { registerGlobComp } from '@/components/registerGlobComp'
import '@/design/util.scss'
import '@/design/index.scss'

async function bootstrap() {
  const app = createApp(App)

  // Configure store
  setupStore(app)

  // Initialize internal system configuration
  initAppConfigStore()

  // Register global components
  registerGlobComp(app)

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)

  // Configure routing
  setupRouter(app)

  // router-guard
  setupRouterGuard(router)

  // Register global directive
  setupGlobDirectives(app)

  // Configure global error handling
  setupErrorHandle(app)

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  // Register global element plus
  app.use(ElementPlus, {
    size: 'small',
  })

  app.mount('#app')
}

bootstrap()
