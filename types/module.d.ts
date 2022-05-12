declare module '*.vue' {
  import type { App, DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any> & {
    install(app: App): void
  }
  export default component
}

declare module 'virtual:*' {
  const result: any
  export default result
}
