import type { BasicTableProps, TableActionType } from '../types/table'
import { ComputedRef, nextTick, Ref, unref } from 'vue'
import { error } from '@/utils/log'

export function useBasicTableFn(
  propsRef: ComputedRef<BasicTableProps>,
  tableRef: Ref<ComponentRef>,
  emit: EmitType
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

  const getBasicEmits = {
    onSelect: (selection, row) => {
      emit('select', selection, row)
    },
    onSelectAll: (selection) => {
      emit('select-all', selection)
    },
    onSelectionChange: (selection) => {
      emit('selection-change', selection)
    },
    onCellMouseEnter: (row, column, cell, event) => {
      emit('cell-mouse-enter', row, column, cell, event)
    },
    onCellMouseLeave: (row, column, cell, event) => {
      emit('cell-mouse-leave', row, column, cell, event)
    },
    onCellClick: (row, column, cell, event) => {
      emit('cell-click', row, column, cell, event)
    },
    onCellDblclick: (row, column, cell, event) => {
      emit('cell-dblclick', row, column, cell, event)
    },
    onCellContextmenu: (row, column, cell, event) => {
      emit('cell-contextmenu', row, column, cell, event)
    },
    onRowClick: (row, column, event) => {
      emit('row-click', row, column, event)
    },
    onRowContextmenu: (row, column, event) => {
      emit('row-contextmenu', row, column, event)
    },
    onRowDblclick: (row, column, event) => {
      emit('row-dblclick', row, column, event)
    },
    onHeaderClick: (column, event) => {
      emit('header-click', column, event)
    },
    onHeaderContextmenu: (column, event) => {
      emit('header-contextmenu', column, event)
    },
    onSortChange: ({ column, prop, order }) => {
      emit('sort-change', { column, prop, order })
    },
    onFilterChange: (filters) => {
      emit('filter-change', filters)
    },
    onCurrentChange: (currentRow, oldCurrentRow) => {
      emit('current-change', currentRow, oldCurrentRow)
    },
    onHeaderDragend: (newWidth, oldWidth, column, event) => {
      emit('header-dragend', newWidth, oldWidth, column, event)
    },
    onExpandChange: (row, expandedRows_or_expanded) => {
      emit('expand-change', row, expandedRows_or_expanded)
    },
  }

  return {
    // events
    getBasicEmits,
    // methods
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
