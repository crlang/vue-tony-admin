declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'element-plus/lib/locale/lang/*' {
  import { Language } from 'element-plus/lib/locale/index'
  const locale: Language & ReadonlyRecordable
  export default locale as Language & ReadonlyRecordable
}

declare module 'virtual:*' {
  const result: any
  export default result
}
