import type { BasicTableProps } from '../types/table'
import type { ElePagination } from '@/components/ElementPlus'

import { computed, unref, ref, ComputedRef, watchEffect } from 'vue'
import { isBoolean } from '@/utils/is'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGE_LAYOUT_OPTIONS } from '../const'

/**
 * 使用分页实例
 *
 * Use pagination
 * @param propsRef
 */
export function usePagination(propsRef: ComputedRef<BasicTableProps>) {
  const configRef = ref<ElePagination>({})

  /**
   * 获取分页信息
   *
   * Get pagination info
   */
  const getTablePagination = computed((): ElePagination => {
    const { pagination } = unref(propsRef)

    if (isBoolean(pagination) || !pagination) {
      return false
    }

    return {
      // Default
      currentPage: 1,
      defaultCurrentPage: 1,
      pageSize: PAGE_SIZE,
      defaultPageSize: PAGE_SIZE,
      pageSizes: PAGE_SIZE_OPTIONS,
      layout: PAGE_LAYOUT_OPTIONS,
      background: true,
      // init
      ...pagination,
      // dync
      ...unref(configRef),
    }
  })

  /**
   * 更新分页信息
   *
   * Set pagination
   * @param info ElePagination
   */
  function setPagination(info: Partial<ElePagination>) {
    const paginationInfo = unref(getTablePagination)
    configRef.value = {
      ...(paginationInfo || {}),
      ...info,
    }
  }
  /**
   * 获取分页信息
   *
   * Get pagination
   */
  function getPagination() {
    return unref(getTablePagination)
  }

  watchEffect(() => {
    const { pagination } = unref(propsRef)
    console.log('pagination', pagination)
    if (!isBoolean(pagination) && pagination) {
      configRef.value = {
        ...unref(configRef),
        ...pagination,
      }
    }
  })

  return { getTablePagination, getPagination, setPagination }
}
