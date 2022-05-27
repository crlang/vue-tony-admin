import type { BasicColumn, BasicTableProps, GetColumnsParams } from '../typing'
import type { ComputedRef } from 'vue'
import type { ElePagination } from '@/components/ElementPlus'

import { computed, Ref, ref, toRaw, unref, watch } from 'vue'
import { usePermission } from '@/hooks/web/usePermission'
import { isArray, isBoolean, isFunction, isString } from '@/utils/is'
import { cloneDeep, isEqual } from 'lodash-es'
import { PAGE_SIZE } from '../const'

function handleItem(item: BasicColumn) {
  const { columnKey, prop, children } = item
  item.align = item.align || 'center'
  if (!columnKey) {
    item.columnKey = prop
  }
  if (children && children.length) {
    handleChildren(children)
  }
}

function handleChildren(children: BasicColumn[] | undefined) {
  if (!children) return
  children.forEach((item) => {
    const { children } = item
    handleItem(item)
    handleChildren(children)
  })
}

function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  columns: BasicColumn[],
  getPaginationRef: ComputedRef<boolean | ElePagination>
) {
  const { showIndexColumn } = unref(propsRef)

  if (!showIndexColumn) return

  const hasIndexColumn = columns.some((item) => item.type === 'index')

  if (hasIndexColumn) return

  const isFixedLeft = columns.some((item) => item.fixed === 'left')

  columns.unshift({
    type: 'index',
    width: 72,
    label: '序号',
    prop: 'columnIndex',
    customRender: ({ index }) => {
      const paginationInfo = unref(getPaginationRef)
      if (isBoolean(paginationInfo)) {
        return `${index + 1}`
      }
      const { currentPage = 1, pageSize = PAGE_SIZE } = paginationInfo
      return ((currentPage < 1 ? 1 : currentPage) - 1) * pageSize + index + 1
    },
    ...(isFixedLeft
      ? {
        fixed: 'left',
      }
      : {}),
  })
}

function handleCheckboxColumn(
  propsRef: ComputedRef<BasicTableProps>,
  columns: BasicColumn[]
) {
  const { showCheckboxColumn } = unref(propsRef)

  if (!showCheckboxColumn) return

  const hasCheckboxColumn = columns.some((item) => item.type === 'selection')

  if (hasCheckboxColumn) return

  const isFixedLeft = columns.some((item) => item.fixed === 'left')

  columns.unshift({
    type: 'selection',
    width: 50,
    prop: 'columnSelection',
    ...(isFixedLeft
      ? {
        fixed: 'left',
      }
      : {}),
  })
}

function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
  const hasIndex = columns.findIndex((column) => column.actions)
  // nonexistent
  if (hasIndex < 0) return

  // processed
  if (columns[hasIndex]?.type === 'action') return

  columns[hasIndex] =
    {
      width: 120,
      label: '操作',
      prop: 'action',
      type: 'action',
      // fixed: 'right',
      ...columns[hasIndex],
    }
}

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | ElePagination>
) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>
  let cacheColumns = unref(propsRef).columns

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef))

    handleIndexColumn(propsRef, columns, getPaginationRef)
    handleCheckboxColumn(propsRef, columns)
    handleActionColumn(propsRef, columns)
    if (!columns) {
      return []
    }
    columns.forEach((item) => {
      handleItem(item)
    })
    return columns
  })

  function isIfShow(column: BasicColumn): boolean {
    const ifShow = column.ifShow

    let isIfShow = true

    if (isBoolean(ifShow)) {
      isIfShow = ifShow
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(column)
    }
    return isIfShow
  }
  const { hasPermission } = usePermission()

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef))

    const columns = cloneDeep(viewColumns)
    return columns
      .filter((column) => {
        return hasPermission(column.auth) && isIfShow(column)
      })
      .map((column) => {
        const {
          slots,
          prop,
        } = column

        if (!slots || !slots?.title) {
          column.slots = { title: `header-${prop}`, ...(slots || {}) }
          column.customTitle = column.title
          Reflect.deleteProperty(column, 'title')
        }

        return column
      })
  })

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
      cacheColumns = columns?.filter((item) => !item.type) ?? []
    }
  )

  function setColumns(columnList: BasicColumn[] | string[]) {
    const columns = cloneDeep(columnList)
    if (!isArray(columns)) return

    if (columns.length <= 0) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]

    const cacheKeys = cacheColumns.map((item) => item.prop)

    if (!isString(firstColumn)) {
      columnsRef.value = columns as BasicColumn[]
    } else {
      const columnKeys = columns as string[]
      const newColumns: BasicColumn[] = []
      cacheColumns.forEach((item) => {
        if (columnKeys.includes(item.prop)) {
          newColumns.push({
            ...item,
            defaultHidden: false,
          })
        } else {
          newColumns.push({
            ...item,
            defaultHidden: true,
          })
        }
      })

      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            cacheKeys.indexOf(prev.prop as string) -
            cacheKeys.indexOf(next.prop as string)
          )
        })
      }
      columnsRef.value = newColumns
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, ignoreCheckbox, ignoreExpand, sort } = opt || {}
    let columns = toRaw(unref(getColumnsRef))

    if (ignoreIndex) {
      columns = columns.filter((item) => item.type !== 'index')
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.type !== 'action')
    }
    if (ignoreCheckbox) {
      columns = columns.filter((item) => item.type !== 'selection')
    }
    if (ignoreExpand) {
      columns = columns.filter((item) => item.type !== 'expand')
    }
    if (sort) {
      columns = sortFixedColumn(columns)
    }

    return columns
  }

  function getCacheColumns() {
    return cacheColumns
  }

  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns,
  }
}

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = []
  const fixedRightColumns: BasicColumn[] = []
  const defColumns: BasicColumn[] = []

  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column)
      continue
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column)
      continue
    }
    defColumns.push(column)
  }

  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.defaultHidden
  )
}
