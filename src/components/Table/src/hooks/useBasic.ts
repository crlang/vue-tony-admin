import type { BasicTableProps, TableActionType } from '../types/table'
import { ComputedRef, nextTick, Ref, unref } from 'vue'
import { error } from '@/utils/log'

export function useBasicTableFn(
  propsRef: ComputedRef<BasicTableProps>,
  tableRef: Ref<ComponentRef>
) {
  async function getTable() {
    const table = unref(tableRef)
    if (!table) {
      error(
        'The table instance has not been obtained, please make sure that the table has been rendered when performing the table operation!'
      )
    }
    await nextTick()
    return table as TableActionType
  }
  async function clearSelection(): Promise<Recordable> {
    const table = await getTable()
    return table.clearSelection()
  }
  async function toggleRowSelection(row: any, selected: boolean): Promise<Recordable> {
    const table = await getTable()
    return table.toggleRowSelection(row, selected)
  }
  async function toggleAllSelection(): Promise<Recordable> {
    const table = await getTable()
    return table.toggleAllSelection()
  }
  async function toggleRowExpansion(row: any, expanded: boolean): Promise<Recordable> {
    const table = await getTable()
    return table.toggleRowExpansion(row, expanded)
  }
  async function setCurrentRow(row: any): Promise<Recordable> {
    const table = await getTable()
    return table.setCurrentRow(row)
  }
  async function clearSort(): Promise<Recordable> {
    const table = await getTable()
    return table.clearSort()
  }
  async function clearFilter(columnKeys: string[]): Promise<Recordable> {
    const table = await getTable()
    return table.clearFilter(columnKeys)
  }
  async function doLayout(): Promise<Recordable> {
    const table = await getTable()
    return table.doLayout()
  }
  async function sort(prop: string, order: string): Promise<Recordable> {
    const table = await getTable()
    return table.sort(prop, order)
  }

  return {
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
  }
}
