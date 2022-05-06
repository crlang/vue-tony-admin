import type { ComputedRef, Ref } from 'vue'

/**
 * 添加动态属性
 *
 * Add dynamic props
 */
export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
