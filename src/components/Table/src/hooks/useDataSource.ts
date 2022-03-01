import type { BasicTableProps, FetchParams } from '../types/table'
import type { PaginationProps } from '../types/pagination'
import {
  ref,
  unref,
  ComputedRef,
  computed,
  onMounted,
  watch,
  reactive,
  Ref,
  watchEffect
} from 'vue'
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { buildUUID } from '@/utils/uuid'
import { isFunction, isBoolean } from '@/utils/is'
import { get, cloneDeep } from 'lodash-es'
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const'

interface ActionType {
  getPaginationInfo: ComputedRef<PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  getFieldsValue: () => Recordable;
  tableData: Ref<Recordable[]>;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}
export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    getFieldsValue,
    tableData,
  }: ActionType,
  emit: EmitType
) {
  // const tableData = ref<Recordable[]>([])

  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  })
  const dataSourceRef = ref<Recordable[]>([])
  const rawDataSourceRef = ref<Recordable>({})

  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef)
      !api && dataSource && (dataSourceRef.value = dataSource)
    },
    {
      immediate: true,
    }
  )

  watch(
    () => unref(getPaginationInfo),
    (v, v2) => {
      if (v2 && (v.page !== v2?.page || v.size !== v2?.size)) {
        fetch({ page: v.page, size: v.size || PAGE_SIZE })
      }
    },
    {
      immediate: true,
    }
  )

  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) return
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = buildUUID()
      }
      if (item.children && item.children.length) {
        setTableKey(item.children)
      }
    })
  }

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey
  })

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef)
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey
  })

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef)
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef)
    }
    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0]
      const lastItem = dataSource[dataSource.length - 1]

      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(unref(dataSourceRef))
          data.forEach((item) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = buildUUID()
            }
            if (item.children && item.children.length) {
              setTableKey(item.children)
            }
          })
          dataSourceRef.value = data
        }
      }
    }
    return unref(dataSourceRef)
  })

  async function updateTableData(index: number, key: string, value: any) {
    const record = dataSourceRef.value[index]
    if (record) {
      dataSourceRef.value[index][key] = value
    }
    return dataSourceRef.value[index]
  }

  function updateTableDataRecord(
    rowKey: string | number,
    record: Recordable
  ): Recordable | undefined {
    const row = findTableDataRecord(rowKey)

    if (row) {
      for (const field in row) {
        if (Reflect.has(record, field)) row[field] = record[field]
      }
      return row
    }
  }

  function deleteTableDataRecord(record: Recordable | Recordable[]): Recordable | undefined {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return
    const records = !Array.isArray(record) ? [record] : record
    const recordIndex = records
      .map((item) => dataSourceRef.value.findIndex((s) => s.key === item.key)) // 取序号
      .filter((item) => item !== undefined)
      .sort((a, b) => b - a) // 从大到小排序
    for (const index of recordIndex) {
      unref(dataSourceRef).splice(index, 1)
      unref(propsRef).dataSource?.splice(index, 1)
    }
    setPagination({
      total: unref(propsRef).dataSource?.length,
    })
    return unref(propsRef).dataSource
  }

  function insertTableDataRecord(record: Recordable, index: number): Recordable | undefined {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return
    index = index ?? dataSourceRef.value?.length
    unref(dataSourceRef).splice(index, 0, record)
    unref(propsRef).dataSource?.splice(index, 0, record)
    return unref(propsRef).dataSource
  }

  function findTableDataRecord(rowKey: string | number) {
    if (!dataSourceRef.value || dataSourceRef.value.length === 0) return

    const rowKeyName = unref(getRowKey)
    if (!rowKeyName) return

    const { childrenColumnName = 'children' } = unref(propsRef)

    const findRow = (array: any[]) => {
      let ret
      array.some(function iter(r) {
        if (typeof rowKeyName === 'function') {
          if ((rowKeyName(r) as string) === rowKey) {
            ret = r
            return true
          }
        } else {
          if (Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey) {
            ret = r
            return true
          }
        }
        return r[childrenColumnName] && r[childrenColumnName].some(iter)
      })
      return ret
    }

    // const row = dataSourceRef.value.find(r => {
    //   if (typeof rowKeyName === 'function') {
    //     return (rowKeyName(r) as string) === rowKey
    //   } else {
    //     return Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey
    //   }
    // })
    return findRow(dataSourceRef.value)
  }

  async function fetch(opt?: FetchParams) {
    const { api, searchInfo, fetchSetting, beforeFetch, afterFetch, useSearchForm, pagination } =
      unref(propsRef)
    if (!api || !isFunction(api)) return
    try {
      setLoading(true)
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting
      )
      let pageParams: Recordable = {}

      const { page = 1, size = PAGE_SIZE } = (unref(getPaginationInfo) as PaginationProps) ?? {}

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {}
      } else {
        pageParams[pageField] = (opt && opt.page) || page
        pageParams[sizeField] = size
      }

      const { sortInfo = {}, filterInfo } = searchState

      let params: Recordable = {
        ...pageParams,
        ...(useSearchForm ? getFieldsValue() : {}),
        ...searchInfo,
        ...(opt?.searchInfo ?? {}),
        ...sortInfo,
        ...filterInfo,
        ...(opt?.sortInfo ?? {}),
        ...(opt?.filterInfo ?? {}),
      }
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params
      }

      const res = await api(params)
      rawDataSourceRef.value = res

      const isArrayResult = Array.isArray(res)

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField)
      const resultTotal: number = isArrayResult ? 0 : get(res, totalField)
      const resultPage: number = isArrayResult ? 1 : get(res, pageField)

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / size)
        if (page > currentTotalPage) {
          setPagination({
            page: currentTotalPage,
          })
          fetch(opt)
        }
      }

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems)) || resultItems
      }
      dataSourceRef.value = resultItems
      setPagination({
        total: resultTotal || 0,
      })
      if (opt && opt.page) {
        setPagination({
          page: opt.page || 1,
        })
      }
      emit('fetch-success', {
        items: unref(resultItems),
        page: resultPage,
        total: resultTotal,
      })
    } catch (error) {
      console.error('===fetch error===', error)
      emit('fetch-error', error)
      dataSourceRef.value = []
      setPagination({
        total: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  function setTableData<T = Recordable>(values: T[]) {
    dataSourceRef.value = values
  }

  function getDataSource<T = Recordable>() {
    return getDataSourceRef.value as T[]
  }

  function getRawDataSource<T = Recordable>() {
    return rawDataSourceRef.value as T
  }

  async function reload(opt?: FetchParams) {
    await fetch(opt)
  }

  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch()
    }, 16)
  })

  return {
    getDataSourceRef,
    getDataSource,
    getRawDataSource,
    getRowKey,
    setTableData,
    getAutoCreateKey,
    fetch,
    reload,
    updateTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    findTableDataRecord,
  }
}
