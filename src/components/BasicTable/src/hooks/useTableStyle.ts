import type { ComputedRef } from 'vue'
import type { BasicTableProps, TableCustomRecord } from '../typing'
import { unref } from 'vue'
import { isFunction } from '@/utils/is'

export function useTableStyle(propsRef: ComputedRef<BasicTableProps>) {
  function getRowClassName(record: TableCustomRecord, index: number) {
    const { rowClassName } = unref(propsRef)
    const classNames: string[] = []
    if (rowClassName && isFunction(rowClassName)) {
      classNames.push(rowClassName(record, index))
    }
    return classNames.filter((cls) => !!cls).join(' ')
  }

  return { getRowClassName }
}
