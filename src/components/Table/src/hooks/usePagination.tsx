import type { BasicTableProps } from '../types/table'
import type { ElePagination } from '@/components/ElementPlus'

import { computed, unref, ref, ComputedRef, watchEffect } from 'vue'
import { isBoolean } from '@/utils/is'
import { PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGE_LAYOUT_OPTIONS } from '../const'
// import { useI18n } from '@/hooks/web/useI18n'

// interface ItemRender {
//   page: number;
//   type: 'page' | 'prev' | 'next';
//   originalElement: any;
// }

// function itemRender({ page, type, originalElement }: ItemRender) {
//   if (type === 'prev') {
//     return page === 0 ? null : <LeftOutlined />
//   } else if (type === 'next') {
//     return page === 1 ? null : <RightOutlined />
//   }
//   return originalElement
// }

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  // const { t } = useI18n()

  const configRef = ref<ElePagination>({})
  const show = ref(true)

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

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false
    }

    return {
      currentPage: 1,
      defaultCurrentPage: 1,
      pageSize: PAGE_SIZE,
      defaultPageSize: PAGE_SIZE,
      pageSizes: PAGE_SIZE_OPTIONS,
      layout: PAGE_LAYOUT_OPTIONS,
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

  function getShowPagination() {
    return unref(show)
  }

  async function setShowPagination(v: boolean) {
    show.value = v
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination }
}
