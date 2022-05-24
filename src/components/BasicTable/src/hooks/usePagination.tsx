import type { BasicTableProps } from '../types/table'
import type { ElePagination } from '@/components/ElementPlus'

import { computed, unref, ref, ComputedRef, watchEffect } from 'vue'
import { isBoolean } from '@/utils/is'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGE_LAYOUT_OPTIONS } from '../const'

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<ElePagination>({})

  watchEffect(() => {
    const { pagination } = unref(refProps)
    if (!isBoolean(pagination) && pagination) {
      configRef.value = {
        ...unref(configRef),
        ...(pagination ?? {}),
      }
    }
  })

  const getPaginationInfo = computed((): ElePagination => {
    const { pagination } = unref(refProps)

    if ((isBoolean(pagination) && !pagination)) {
      return false
    }

    return {
      currentPage: 1,
      defaultCurrentPage: 1,
      pageSize: PAGE_SIZE,
      defaultPageSize: PAGE_SIZE,
      pageSizes: PAGE_SIZE_OPTIONS,
      layout: PAGE_LAYOUT_OPTIONS,
      background: true,
      ...(pagination ?? {}),
      ...unref(configRef),
    }
  })

  function setPagination(info: Partial<ElePagination>) {
    const paginationInfo = unref(getPaginationInfo)
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    }
  }

  function getPagination() {
    return unref(getPaginationInfo)
  }

  return { getPagination, getPaginationInfo, setPagination }
}
