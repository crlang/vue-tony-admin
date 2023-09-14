import type { BasicListProps } from '../typing';
import type { ElePagination } from '@/components/ElementPlus';

import { computed, unref, ref, ComputedRef, watchEffect } from 'vue';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS, PAGE_LAYOUT_OPTIONS } from '../const';
import { isBoolean, isFunction } from '@/utils/is';

/**
 * 处理列表分页
 *
 * Handling list pagination
 * @param propsRef
 */
export function usePagination(propsRef: ComputedRef<BasicListProps>) {
  const configRef = ref<ElePagination>({});

  /**
   * 获取分页信息
   *
   * Get pagination info
   */
  const getListPagination = computed((): ElePagination | boolean => {
    const { pagination, api, dataSource } = unref(propsRef);
    if (!pagination && !isFunction(api)) {
      return false;
    }

    if (pagination?.show === false) {
      return false;
    }

    if (!isFunction(api)) {
      pagination.total = dataSource?.length || 0;
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
    };
  });

  /**
   * 更新分页信息
   *
   * Set pagination
   * @param info ElePagination
   */
  function setPagination(info: Partial<ElePagination>) {
    const paginationInfo = unref(getListPagination);
    configRef.value = {
      ...(paginationInfo || {}),
      ...(info || {}),
    };
  }
  /**
   * 获取分页信息
   *
   * Get pagination
   */
  function getPagination() {
    return unref(getListPagination);
  }

  watchEffect(() => {
    const { pagination } = unref(propsRef);
    if (pagination && !isBoolean(pagination)) {
      configRef.value = {
        ...pagination,
        ...unref(configRef),
      };
    }
  });

  return { getListPagination, getPagination, setPagination };
}
