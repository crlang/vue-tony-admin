import type {
  BasicTableProps,
  TableActionType,
  FetchParams,
  BasicColumn,
  GetColumnsParams
} from '../typing'
import type { DynamicProps } from '#/utils'
import type { FormActionType } from '@/components/Form'
import type { WatchStopHandle } from 'vue'
import type { ElePagination } from '@/components/ElementPlus'

import { getDynamicProps } from '@/utils'
import { ref, onUnmounted, unref, watch } from 'vue'
import { isProdMode } from '@/utils/env'
import { error } from '@/utils/log'

type Props = Partial<DynamicProps<BasicTableProps>>;

type UseTableMethod = TableActionType & {
  getFormRef: () => FormActionType;
};

export function useTable(tableProps?: Props): [
  (instance: TableActionType, formInstance: UseTableMethod) => void,
  TableActionType & {
    getFormRef: () => FormActionType;
  },
] {
  const tableRef = ref<Nullable<TableActionType>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)
  const formRef = ref<Nullable<UseTableMethod>>(null)

  let stopWatch: WatchStopHandle

  function register(instance: TableActionType, formInstance: UseTableMethod) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null
        loadedRef.value = null
      })

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return

    tableRef.value = instance
    formRef.value = formInstance
    tableProps && instance.setTableProps(getDynamicProps(tableProps))
    loadedRef.value = true

    stopWatch?.()

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setTableProps(getDynamicProps(tableProps))
      },
      {
        immediate: true,
        deep: true,
      }
    )
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef)
    if (!table) {
      error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!'
      )
    }
    return table as TableActionType
  }

  const methods: TableActionType & {
    getFormRef: () => FormActionType;
  } = {
    // Element Plus
    clearSelection: () => {
      getTableInstance().clearSelection()
    },
    toggleRowSelection: (row: any, selected: boolean) => {
      getTableInstance().toggleRowSelection(row, selected)
    },
    toggleAllSelection: () => {
      getTableInstance().toggleAllSelection()
    },
    toggleRowExpansion: (row: any, expanded: boolean) => {
      getTableInstance().toggleRowExpansion(row, expanded)
    },
    setCurrentRow: (row: any) => {
      getTableInstance().setCurrentRow(row)
    },
    clearSort: () => {
      getTableInstance().clearSort()
    },
    clearFilter: (columnKeys: string[]) => {
      getTableInstance().clearFilter(columnKeys)
    },
    doLayout: () => {
      getTableInstance().doLayout()
    },
    sort: (prop: string, order: string) => {
      getTableInstance().sort(prop, order)
    },

    // Advanced
    reload: async (opt?: FetchParams) => {
      getTableInstance().reload(opt)
    },
    setTableProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setTableProps(props)
    },
    getColumns: ({ ignoreIndex = false }:GetColumnsParams = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || []
      return columns
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns)
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading)
    },
    getDataSource: () => {
      return getTableInstance().getDataSource()
    },
    getRawDataSource: () => {
      return getTableInstance().getRawDataSource()
    },
    setTableData: <T = Recordable>(values: T[]) => {
      return getTableInstance().setTableData(values)
    },
    getCacheColumns: () => {
      return getTableInstance().getCacheColumns()
    },
    redoHeight: () => {
      getTableInstance().redoHeight()
    },
    setPagination: (info: Partial<ElePagination>) => {
      return getTableInstance().setPagination(info)
    },
    getPagination: () => {
      return getTableInstance().getPagination()
    },
    getFormRef: () => {
      return unref(formRef) as unknown as FormActionType
    },
    expandAll: () => {
      getTableInstance().expandAll()
    },
    collapseAll: () => {
      getTableInstance().collapseAll()
    },
    deleteTableDataRecord: (record: Recordable | Recordable[]) => {
      return getTableInstance().deleteTableDataRecord(record)
    },
    insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => {
      return getTableInstance().insertTableDataRecord(record, index)
    },
    updateTableDataRecord: (rowKey: string | number, record: Recordable) => {
      return getTableInstance().updateTableDataRecord(rowKey, record)
    },
    findTableDataRecord: (rowKey: string | number) => {
      return getTableInstance().findTableDataRecord(rowKey)
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value)
    },
  }

  return [register, methods]
}
