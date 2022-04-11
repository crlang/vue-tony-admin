// Register icon sprite
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/index.scss'
import App from './App.vue'
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
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
import { ElLoading } from 'element-plus'

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
  // Not recommended, the project has been introduced on demand
  // 不建议，项目已经按需引入
  // app.use(ElementPlus)
  app.use(ElLoading)

  app.mount('#app')
}

bootstrap()
