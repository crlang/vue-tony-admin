import { computed, ref, unref } from 'vue'

import { createPageContext } from '@/hooks/component/usePageContext'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'

const headerHeightRef = ref(0)
const footerHeightRef = ref(0)

/**
 * 处理框架（含头部、内容区、脚部）高度信息
 */
export function useLayoutHeight() {
  /**
   * 设置头部高度
   *
   * @param val
   */
  function setHeaderHeight(val: number) {
    headerHeightRef.value = val
  }
  /**
   * 设置脚部高度
   *
   * @param val
   */
  function setFooterHeight(val: number) {
    footerHeightRef.value = val
  }
  return { headerHeightRef, footerHeightRef, setHeaderHeight, setFooterHeight }
}

/**
 * 获取内容区可视高度
 */
export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight)
  const pageHeight = ref(window.innerHeight)
  const getViewHeight = computed(() => {
    return unref(contentHeight) - unref(headerHeightRef) - unref(footerHeightRef) || 0
  })

  useWindowSizeFn(
    () => {
      contentHeight.value = window.innerHeight
    },
    100,
    { immediate: true },
  )

  async function setPageHeight(height: number) {
    pageHeight.value = height
  }

  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight,
  })
}
