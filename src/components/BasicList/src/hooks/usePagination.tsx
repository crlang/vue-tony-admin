import type { ComputedRef } from 'vue'
import { computed, ref, unref, watchEffect } from 'vue'
import type { BasicListProps } from '../typing'
import { PAGE_LAYOUT_OPTIONS, PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const'
import type { ElePagination } from '@/components/ElementPlus'

import { isBoolean, isFunction } from '@/utils/is'

/**
 * 处理列表分页
 *
 * @param propsRef
 */
export function usePagination(propsRef: ComputedRef<BasicListProps>) {
  const configRef = ref<ElePagination>({})

  /**
   * 获取分页信息
   */
  const getListPagination = computed((): ElePagination | boolean => {
    const { pagination, api, dataSource } = unref(propsRef)
    if (!pagination && !isFunction(api)) {
      return false
    }

    if (pagination?.show === false) {
      return false
    }

    if (!isFunction(api)) {
      pagination.total = dataSource?.length || 0
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
    const paginationInfo = unref(getListPagination)
    configRef.value = {
      ...(paginationInfo || {}),
      ...(info || {}),
    }
  }
  /**
   * 获取分页信息
   *
   */
  function getPagination() {
    return unref(getListPagination)
  }

  watchEffect(() => {
    const { pagination } = unref(propsRef)
    if (pagination && !isBoolean(pagination)) {
      configRef.value = {
        ...pagination,
        ...unref(configRef),
      }
    }
  })

  return { getListPagination, getPagination, setPagination }
}
