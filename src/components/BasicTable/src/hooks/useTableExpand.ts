import type { ComputedRef } from 'vue'
import { computed, ref, toRaw, unref } from 'vue'
import type { BasicTableProps } from '../typing'

import { warn } from '@/utils/log'

/**
 * 处理展开表格
 *
 * @param propsRef
 * @param getDataSourceRef
 * @param getRowKey
 */
export function useTableExpand(propsRef: ComputedRef<BasicTableProps>, getDataSourceRef: ComputedRef<Recordable[]>, getRowKey: ComputedRef<string | undefined>) {
  /**
   * 展开的key
   */
  const expandRowKeys = ref<string[]>([])

  /**
   * 获取展开选项
   */
  const getExpandOptions = computed(() => {
    return {
      expandRowKeys: unref(expandRowKeys),
    }
  })

  /**
   * 展开全部
   */
  function expandAll() {
    const keys = getTableDataKeys()
    expandRowKeys.value = keys
  }

  /**
   * 收起全部
   */
  function collapseAll() {
    expandRowKeys.value = []
  }

  /**
   * 获取表格数据 key
   *
   * @param data Recordable[]
   */
  function getTableDataKeys(data?: Recordable[]) {
    const keys: string[] = []
    const { childrenColumnName } = unref(propsRef)
    const keyName = unref(getRowKey)
    if (!keyName) {
      warn('cannot execute expand/collapse, "rowKey" must exist')
      return
    }

    toRaw(data || unref(getDataSourceRef)).forEach((item) => {
      keys.push(item[keyName as string])

      const children = item[childrenColumnName || 'children']
      if (children?.length) {
        keys.push(...getTableDataKeys(children))
      }
    })

    return keys
  }

  return { getExpandOptions, expandAll, collapseAll }
}
