// Register icon sprite
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import { ElLoading } from 'element-plus'
import App from './App.vue'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupErrorHandle } from '@/logics/error-handle'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@/store'
import { setupGlobDirectives } from '@/directives'
import { registerGlobComp } from '@/components/registerGlobComp'
import '@/design/util.scss'
import '@/design/index.scss'

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // 初始化内部系统配置
  initAppConfigStore()

  // 注册全局组件
  registerGlobComp(app)

  // 配置路由
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  // 注册全局指令
  setupGlobDirectives(app)

  // 配置全局错误处理
  setupErrorHandle(app)

  // https://router.vuejs.org/api/interfaces/Router.html#isReady
  // await router.isReady();

  // 全局注册 element plus
  // 不建议，项目已经按需引入
  // app.use(ElementPlus)

  // 如果需要 v-loading 用法，则需引入下面内容
  // app.use(ElLoading)

  app.mount('#app')
}

bootstrap()
