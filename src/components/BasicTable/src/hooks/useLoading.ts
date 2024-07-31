import type { ComputedRef } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import type { BasicTableProps } from '../typing'

/**
 * 处理表格加载
 *
 * @param props
 */
export function useLoading(props: ComputedRef<BasicTableProps>) {
  const loadingRef = ref(false)

  /**
   * 获取加载状态
   */
  const getLoading = computed(() => unref(loadingRef))

  /**
   * 更新加载状态
   *
   * @param loading
   */
  function setLoading(loading: boolean) {
    loadingRef.value = loading
  }

  watch(
    () => unref(props).loading,
    (v) => {
      loadingRef.value = v
    },
  )

  return { getLoading, setLoading }
}
