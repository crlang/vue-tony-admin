import type { BasicTableProps, BasicColumn } from '../types/table'
import { Ref, ComputedRef, watch } from 'vue'
import { computed, unref, ref, nextTick } from 'vue'
import { getViewportOffset } from '@/utils/domUtils'
import { isBoolean } from '@/utils/is'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { useModalContext } from '@/components/BasicModal'
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated'
import { useDebounceFn } from '@vueuse/core'

export function useTableScroll(
  propsRef: ComputedRef<BasicTableProps>,
  tableElRef: Ref<ComponentRef>,
  columnsRef: ComputedRef<BasicColumn[]>,
  getDataSourceRef: ComputedRef<Recordable[]>
) {
  const tableHeightRef: Ref<Nullable<number>> = ref(null)

  const resizeLimit = ref(0)

  const modalFn = useModalContext()

  // Greater than animation time 280
  const debounceRedoHeight = useDebounceFn(redoHeight, 100)

  const getCanResize = computed(() => {
    const { canResize } = unref(propsRef)
    return canResize
  })

  watch(
    () => [unref(getCanResize), unref(getDataSourceRef)?.length],
    () => {
      debounceRedoHeight()
    },
    {
      flush: 'post',
    },
  )

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  function setHeight(heigh: number) {
    tableHeightRef.value = heigh
    //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
    modalFn?.redoModalHeight?.()
  }

  // No need to repeat queries
  let paginationEl: HTMLElement | null
  let bodyEl: HTMLElement | null

  async function calcTableHeight() {
    const { pagination, maxHeight } = unref(propsRef)
    const tableData = unref(getDataSourceRef)

    const table = unref(tableElRef)
    if (!table) return

    const tableEl: Element = table.$el
    if (!tableEl) return

    if (!unref(getCanResize) || tableData.length === 0) {
      // if (resizeLimit.value > 4) return

      if (document.createEvent) {
        const event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, true)
        window.dispatchEvent(event)
      } else if (document.createEventObject) {
        window.fireEvent('onresize')
      }
      resizeLimit.value = resizeLimit.value + 1
      return
    }

    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.el-scrollbar__view')
      if (!bodyEl) return
    }
    const hasScrollBarY = bodyEl.scrollHeight > bodyEl.clientHeight
    const hasScrollBarX = bodyEl.scrollWidth > bodyEl.clientWidth

    if (hasScrollBarY) {
      tableEl.classList.contains('hide-scrollbar-y') &&
        tableEl.classList.remove('hide-scrollbar-y')
    } else {
      !tableEl.classList.contains('hide-scrollbar-y') && tableEl.classList.add('hide-scrollbar-y')
    }

    if (hasScrollBarX) {
      tableEl.classList.contains('hide-scrollbar-x') &&
        tableEl.classList.remove('hide-scrollbar-x')
    } else {
      !tableEl.classList.contains('hide-scrollbar-x') && tableEl.classList.add('hide-scrollbar-x')
    }

    bodyEl!.style.height = 'unset'

    if (!unref(getCanResize) || tableData.length === 0) return

    await nextTick()
    // Add a delay to get the correct bottomIncludeBody paginationHeight headerHeight

    const headEl = tableEl.querySelector('.el-table__header-wrapper ')

    if (!headEl) return

    // Table height from bottom
    const { bottomIncludeBody } = getViewportOffset(headEl)

    // Pager height
    let paginationHeight = 0
    if (!isBoolean(pagination)) {
      paginationEl = tableEl?.nextSibling as HTMLElement
      if (paginationEl) {
        const offsetHeight = paginationEl.offsetHeight || 0
        paginationHeight += offsetHeight || 0
      } else {
        paginationHeight += 24
      }
    } else {
      paginationHeight = 0
    }

    let headerHeight = 0
    if (headEl) {
      headerHeight = (headEl as HTMLElement).offsetHeight
    }

    let height =
      bottomIncludeBody -
      paginationHeight -
      headerHeight

    height = (height > maxHeight! ? (maxHeight as number) : height) ?? height
    setHeight(height)

    bodyEl!.style.height = `${height}px`
  }
  useWindowSizeFn(calcTableHeight, 280)
  onMountedOrActivated(() => {
    calcTableHeight()
    nextTick(() => {
      debounceRedoHeight()
    })
  })
  return { redoHeight }
}
