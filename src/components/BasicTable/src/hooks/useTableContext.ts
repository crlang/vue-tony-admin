import type { Ref } from 'vue'
import type { BasicTableProps, TableActionMethods } from '../typing'
import { provide, inject, ComputedRef } from 'vue'

const key = Symbol('basic-table')

type Instance = TableActionMethods & {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
