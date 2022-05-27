import type { BasicTableProps } from '../typing'

import { ref, ComputedRef, unref, computed, watch } from 'vue'

export function useLoading(props: ComputedRef<BasicTableProps>) {
  const loadingRef = ref(unref(props).loading)

  watch(
    () => unref(props).loading,
    (loading) => {
      loadingRef.value = loading
    }
  )

  const getLoading = computed(() => unref(loadingRef))

  function setLoading(loading: boolean) {
    loadingRef.value = loading
  }

  return { getLoading, setLoading }
}
