import type { ComputedRef, Ref } from 'vue'
import { inject, provide } from 'vue'
import type { BasicTableProps, TableActionMethods } from '../typing'

const key = Symbol('basic-table')

type Instance = TableActionMethods & {
  wrapRef: Ref<Nullable<HTMLElement>>
  getBindValues: ComputedRef<Recordable>
}

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>
}

/**
 * 创建表格上下文
 *
 * @param instance Instance
 */
export function createTableContext(instance: Instance) {
  provide(key, instance)
}

/**
 * 注入表格上下文
 */
export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
