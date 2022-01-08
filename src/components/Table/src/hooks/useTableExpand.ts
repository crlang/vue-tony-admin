import type { ComputedRef, Ref } from 'vue'
import type { BasicTableProps } from '../types/table'
import { computed, unref, ref, toRaw } from 'vue'
import { ROW_KEY } from '../const'

export function useTableExpand(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  emit: EmitType
) {
  const expandRowKeys = ref<string[]>([])

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey
  })

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef)
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey
  })

  const getExpandOption = computed(() => {
    return {
      expandRowKeys: unref(expandRowKeys),
      onExpandChange: (keys: string[]) => {
        expandRowKeys.value = keys
        emit('expand-change', keys)
      },
    }
  })

  function expandAll() {
    const keys = getAllKeys()
    expandRowKeys.value = keys
  }

  function getAllKeys(data?: Recordable[]) {
    const keys: string[] = []
    const { childrenColumnName } = unref(propsRef)
    toRaw(data || unref(tableData)).forEach((item) => {
      keys.push(item[unref(getRowKey) as string])
      const children = item[childrenColumnName || 'children']
      if (children?.length) {
        keys.push(...getAllKeys(children))
      }
    })
    return keys
  }

  function collapseAll() {
    expandRowKeys.value = []
  }

  return { getExpandOption, expandAll, collapseAll }
}
