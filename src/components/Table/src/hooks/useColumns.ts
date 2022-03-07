import type { BasicColumn, BasicTableProps, CellFormat, GetColumnsParams } from '../types/table'
import type { ComputedRef } from 'vue'

import { computed, Ref, ref, toRaw, unref, watch } from 'vue'
// import { renderEditCell } from '../components/editable'
import { usePermission } from '@/hooks/web/usePermission'
// import { useI18n } from '@/hooks/web/useI18n'
import { isArray, isBoolean, isFunction, isMap, isString } from '@/utils/is'
import { cloneDeep, isEqual } from 'lodash-es'
import { formatToDate } from '@/utils/dateUtil'
import { useI18n } from '@/hooks/web/useI18n'

function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { key, dataIndex, children } = item
  item.align = item.align || 'center'
  if (ellipsis) {
    if (!key) {
      item.key = dataIndex
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis,
      })
    }
  }
  if (children && children.length) {
    handleChildren(children, !!ellipsis)
  }
}

function handleChildren(children: BasicColumn[] | undefined, ellipsis: boolean) {
  if (!children) return
  children.forEach((item) => {
    const { children } = item
    handleItem(item, ellipsis)
    handleChildren(children, ellipsis)
  })
}

function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  columns: BasicColumn[]
) {
  const { t } = useI18n()

  const { showIndexColumn, indexColumnProps } = unref(propsRef)

  if (!showIndexColumn) return

  const isFixedLeft = columns.some((item) => item.fixed === 'left')

  const hasIndexColumn = columns.some((item) => item.type === 'index')

  if (hasIndexColumn) return

  columns.unshift({
    type: 'index',
    width: 50,
    label: t('component.table.index'),
    prop: 'columnIndex',
    ...(isFixedLeft
      ? {
        fixed: 'left',
      }
      : {}),
    ...indexColumnProps,
  })
}

function handleCheckboxColumn(
  propsRef: ComputedRef<BasicTableProps>,
  columns: BasicColumn[]
) {
  const { showCheckboxColumn } = unref(propsRef)

  if (!showCheckboxColumn) return

  const isFixedLeft = columns.some((item) => item.fixed === 'left')
  const hasCheckboxColumn = columns.some((item) => item.type === 'selection')

  if (hasCheckboxColumn) return

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

  const { t } = useI18n()

  columns[hasIndex] =
    {
      width: 120,
      label: t('component.table.operation'),
      prop: 'action',
      type: 'action',
      // fixed: 'right',
      ...columns[hasIndex],
    }
}

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>
) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>
  let cacheColumns = unref(propsRef).columns

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef))

    handleIndexColumn(propsRef, columns)
    handleCheckboxColumn(propsRef, columns)
    handleActionColumn(propsRef, columns)
    if (!columns) {
      return []
    }
    const { ellipsis } = unref(propsRef)

    columns.forEach((item) => {
      const { customRender, slots } = item

      handleItem(
        item,
        Reflect.has(item, 'ellipsis') ? !!item.ellipsis : !!ellipsis && !customRender && !slots
      )
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
          dataIndex,
        } = column

        if (!slots || !slots?.title) {
          column.slots = { title: `header-${dataIndex}`, ...(slots || {}) }
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

  function setCacheColumnsByField(dataIndex: string | undefined, value: Partial<BasicColumn>) {
    if (!dataIndex || !value) {
      return
    }
    cacheColumns.forEach((item) => {
      if (item.dataIndex === dataIndex) {
        Object.assign(item, value)
        return
      }
    })
  }
  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: Partial<BasicColumn>[] | string[]) {
    const columns = cloneDeep(columnList)
    if (!isArray(columns)) return

    if (columns.length <= 0) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]

    const cacheKeys = cacheColumns.map((item) => item.dataIndex)

    if (!isString(firstColumn)) {
      columnsRef.value = columns as BasicColumn[]
    } else {
      const columnKeys = columns as string[]
      const newColumns: BasicColumn[] = []
      cacheColumns.forEach((item) => {
        if (columnKeys.includes(item.dataIndex! || (item.key as string))) {
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
            cacheKeys.indexOf(prev.dataIndex as string) -
            cacheKeys.indexOf(next.dataIndex as string)
          )
        })
      }
      columnsRef.value = newColumns
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {}
    let columns = toRaw(unref(getColumnsRef))
    if (ignoreIndex) {
      columns = columns.filter((item) => item.type !== 'index')
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.type !== 'action')
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
    setCacheColumnsByField,
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

// format cell
export function formatCell(text: string, format: CellFormat, record: Recordable, index: number) {
  if (!format) {
    return text
  }

  // custom function
  if (isFunction(format)) {
    return format(text, record, index)
  }

  try {
    // date type
    const DATE_FORMAT_PREFIX = 'date|'
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX)) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, '')

      if (!dateFormat) {
        return text
      }
      return formatToDate(text, dateFormat)
    }

    // Map
    if (isMap(format)) {
      return format.get(text)
    }
  } catch (error) {
    return text
  }
}
