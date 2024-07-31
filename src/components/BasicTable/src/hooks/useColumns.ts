import type { ComputedRef } from 'vue'

import { computed, ref, unref, watch } from 'vue'
import { cloneDeep, isEqual } from 'lodash-es'
import type { BasicColumn, BasicTableProps, GetColumnsParams } from '../typing'

import { COLUMN_POSITION_ALIGN, PAGE_SIZE } from '../const'
import type { ElePagination } from '@/components/ElementPlus'
import { usePermission } from '@/hooks/web/usePermission'

/**
 * 处理表格列
 *
 * @param propsRef
 * @param getPaginationRef
 */
export function useColumns(propsRef: ComputedRef<BasicTableProps>, getPaginationRef: ComputedRef<boolean | ElePagination>) {
  let cacheColumns = unref(propsRef).columns
  const columnsRef = ref(cacheColumns)
  const { hasPermission } = usePermission()

  /**
   * 获取表格列 - 内部
   */
  const getColumnsRef = computed(() => {
    const { showIndexColumn, showCheckboxColumn } = unref(propsRef)
    const columns = cloneDeep(unref(columnsRef))

    if (!columns || columns.length === 0) {
      return []
    }

    if (showIndexColumn) {
      handleIndexColumn(columns, getPaginationRef)
    }
    if (showCheckboxColumn) {
      handleCheckboxColumn(columns)
    }

    handleActionColumn(columns)

    columns.forEach((item) => {
      handleItem(item)
    })
    return columns
  })

  /**
   * 获取可视列，剔除了无权限或隐藏的列
   */
  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef))

    const columns = cloneDeep(viewColumns)
    return columns
      .filter((column) => {
        return hasPermission(column.auth) && isIfShow(column)
      })
      .map((column) => {
        if (column.defaultValue && column.defaultValue !== 0) {
          column.formatter = (row, { property, columnKey }) => {
            const item = row[property || columnKey]
            if (!item && item !== 0) {
              return column.defaultValue
            }
            return item
          }
        }
        return column
      })
  })

  /**
   * 更新列，支持列数据或者prop字段集
   *
   * @param columnList BasicColumn[] | string[]
   */
  function setColumns(columnList: BasicColumn[] | string[]) {
    if (!Array.isArray(columnList))
      return

    const columns = cloneDeep(columnList)

    if (columns.length <= 0) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]

    if (typeof firstColumn !== 'string') {
      columnsRef.value = columns as BasicColumn[]
    }
    else {
      const cacheKeys = cacheColumns.map(item => item.prop)
      const columnKeys = columns as string[]
      const newColumns: BasicColumn[] = []

      cacheColumns.forEach((item) => {
        if (columnKeys.includes(item.prop)) {
          newColumns.push({
            ...item,
            defaultHidden: false,
          })
        }
        else {
          newColumns.push({
            ...item,
            defaultHidden: true,
          })
        }
      })

      // 根据另一个数组排序
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.prop as string) - cacheKeys.indexOf(next.prop as string)
        })
      }
      columnsRef.value = newColumns
    }
  }

  /**
   * 获取表格列
   *
   * @param opt GetColumnsParams
   */
  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, ignoreCheckbox, ignoreExpand, sort } = opt || {}
    let columns = unref(getColumnsRef)

    // 忽略索引列
    if (ignoreIndex) {
      columns = columns.filter(item => item.type !== 'index')
    }
    // 忽略操作列
    if (ignoreAction) {
      columns = columns.filter(item => item.type !== 'action')
    }
    // 忽略复选框列
    if (ignoreCheckbox) {
      columns = columns.filter(item => item.type !== 'selection')
    }
    // 忽略展开列
    if (ignoreExpand) {
      columns = columns.filter(item => item.type !== 'expand')
    }
    // 重新排序列
    if (sort) {
      columns = sortFixedColumn(columns)
    }

    return columns
  }

  /**
   * 获取缓存列
   */
  function getCacheColumns() {
    return cacheColumns
  }

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      if (columns?.length) {
        columnsRef.value = columns
        cacheColumns = columns.filter(item => !item.type)
      }
    },
  )

  return {
    getColumnsRef,
    getViewColumns,
    getCacheColumns,
    getColumns,
    setColumns,
  }
}

/**
 * 处理列
 *
 * @param item BasicColumn
 */
function handleItem(item: BasicColumn) {
  const { columnKey, prop, children } = item

  item.align = item.align || COLUMN_POSITION_ALIGN

  if (!columnKey) {
    item.columnKey = prop
  }

  handleChildren(children)
}

/**
 * 处理子列
 *
 * @param children BasicColumn[]
 */
function handleChildren(children: BasicColumn[] | undefined) {
  if (!children || children.length === 0)
    return

  children.forEach((item) => {
    const { children } = item
    handleItem(item)
    handleChildren(children)
  })
}

/**
 * 处理索引列
 *
 * @param columns BasicColumn[]
 * @param getPaginationRef
 */
function handleIndexColumn(columns: BasicColumn[], getPaginationRef: ComputedRef<boolean | ElePagination>) {
  // 如果存在自定义索引列，则不处理
  const hasIndexColumn = columns.some(item => item.type === 'index')
  if (hasIndexColumn)
    return

  // 如果存在左固定，则默认左固定
  const isFixedLeft = columns.some(item => item.fixed === 'left')

  columns.unshift({
    type: 'index',
    width: 72,
    label: '序号',
    prop: 'columnIndex',
    customRender: ({ index }) => {
      const paginationInfo = unref(getPaginationRef)
      // 如果存在分页，计算所在分页的索引
      if (paginationInfo) {
        const { currentPage = 1, pageSize = PAGE_SIZE } = paginationInfo
        return ((currentPage < 1 ? 1 : currentPage) - 1) * pageSize + index + 1
      }

      return `${index + 1}`
    },
    fixed: isFixedLeft ? 'left' : undefined,
  })
}

/**
 * 处理复选框列
 *
 * @param columns BasicColumn[]
 */
function handleCheckboxColumn(columns: BasicColumn[]) {
  // 存在子项则不渲染复选框
  const hasChildrenColumn = columns.some(item => item?.children?.length)
  if (hasChildrenColumn)
    return

  // 如果存在自定义复选框列，则不处理
  const hasCheckboxColumn = columns.some(item => item.type === 'selection')
  if (hasCheckboxColumn)
    return

  const isFixedLeft = columns.some(item => item.fixed === 'left')

  columns.unshift({
    type: 'selection',
    width: 50,
    prop: 'columnSelection',
    fixed: isFixedLeft ? 'left' : undefined,
  })
}

/**
 * 处理操作列
 *
 * @param columns BasicColumn[]
 */
function handleActionColumn(columns: BasicColumn[]) {
  // 如果存在自定义操作列，则不处理
  const hasActionColumn = columns.some(item => item.type === 'action')
  if (hasActionColumn)
    return

  // 确认是否存在操作列
  const hasIndex = columns.findIndex(column => column.actions)
  if (hasIndex < 0)
    return

  const isFixedRight = columns.some(item => item.fixed === 'right')
  columns[hasIndex] = {
    width: 150,
    label: '操作',
    prop: 'action',
    type: 'action',
    fixed: isFixedRight ? 'right' : undefined,
    ...columns[hasIndex],
  }
}

/**
 * 判断当前列是否需要显示，默认显示
 *
 * @param column BasicColumn
 */
function isIfShow(column: BasicColumn): boolean {
  const ifShow = column?.ifShow

  let isIfShow = true

  if (typeof ifShow === 'boolean') {
    isIfShow = ifShow
  }

  if (typeof ifShow === 'function') {
    isIfShow = ifShow(column)
  }

  return isIfShow
}

/**
 * 重新排序列，分离左右固定列并剔除默认隐藏列
 *
 * @param columns
 */
function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = []
  const fixedRightColumns: BasicColumn[] = []
  const defColumns: BasicColumn[] = []
  // 左/右固定的放在首尾
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
  // 剔除默认隐藏列
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(item => !item.defaultHidden)
}
