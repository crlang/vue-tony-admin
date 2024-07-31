import type { ComputedRef } from 'vue'
import { computed, ref, unref, watchEffect } from 'vue'
import type { BasicTableProps } from '../typing'
import { PAGE_LAYOUT_OPTIONS, PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const'
import type { ElePagination } from '@/components/ElementPlus'

/**
 * 处理表格分页
 *
 * @param propsRef
 */
export function usePagination(propsRef: ComputedRef<BasicTableProps>) {
  const configRef = ref<ElePagination>({})

  /**
   * 获取分页信息
   */
  const getTablePagination = computed((): ElePagination => {
    const { pagination, api } = unref(propsRef)

    if (typeof pagination === 'boolean' || (!pagination && (!api || typeof api !== 'function'))) {
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
   * @param info ElePagination
   */
  function setPagination(info: Partial<ElePagination>) {
    const paginationInfo = unref(getTablePagination)
    configRef.value = {
      ...(paginationInfo || {}),
      ...(info || {}),
    }
  }
  /**
   * 获取分页信息
   */
  function getPagination() {
    return unref(getTablePagination)
  }

  watchEffect(() => {
    const { pagination } = unref(propsRef)
    if (typeof pagination !== 'boolean' && pagination) {
      configRef.value = {
        ...pagination,
        ...unref(configRef),
      }
    }
  })

  return { getTablePagination, getPagination, setPagination }
}
