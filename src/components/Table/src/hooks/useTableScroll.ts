import type { BasicTableProps, BasicColumn } from '../types/table'
import type { Ref, ComputedRef } from 'vue'
import { computed, unref, ref, nextTick } from 'vue'
import { getViewportOffset } from '@/utils/domUtils'
import { isBoolean } from '@/utils/is'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { useModalContext } from '@/components/Modal'
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated'
// import { useDebounceFn } from '@vueuse/core'

export function useTableScroll(
  propsRef: ComputedRef<BasicTableProps>,
  tableElRef: Ref<ComponentRef>,
  columnsRef: ComputedRef<BasicColumn[]>,
  rowSelectionRef: ComputedRef<any | null>,
  getDataSourceRef: ComputedRef<Recordable[]>
) {
  const tableHeightRef: Ref<Nullable<number>> = ref(null)

  const modalFn = useModalContext()

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

    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.el-table__body-wrapper')
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

    if (tableData.length === 0) return

    await nextTick()
    // Add a delay to get the correct bottomIncludeBody paginationHeight footerHeight headerHeight

    const headEl = tableEl.querySelector('.el-table__header-wrapper ')

    if (!headEl) return

    // Table height from bottom
    const { bottomIncludeBody } = getViewportOffset(headEl)
    // Table height from bottom height-custom offset

    const paddingHeight = 32
    // Pager height
    let paginationHeight = 2
    if (!isBoolean(pagination)) {
      paginationEl = tableEl.querySelector('.el-pagination') as HTMLElement
      if (paginationEl) {
        const offsetHeight = paginationEl.offsetHeight
        paginationHeight += offsetHeight || 0
      } else {
        // TODO First fix 24
        paginationHeight += 24
      }
    } else {
      paginationHeight = -8
    }

    let headerHeight = 0
    if (headEl) {
      headerHeight = (headEl as HTMLElement).offsetHeight
    }

    let height =
      bottomIncludeBody -
      paddingHeight -
      paginationHeight -
      headerHeight

    height = (height > maxHeight! ? (maxHeight as number) : height) ?? height
    setHeight(height)

    bodyEl!.style.height = `${height}px`
  }
  useWindowSizeFn(calcTableHeight, 280)
  onMountedOrActivated(() => {
    calcTableHeight()
    // nextTick(() => {
    //   debounceRedoHeight()
    // })
  })

  const getScrollX = computed(() => {
    let width = 0
    if (unref(rowSelectionRef)) {
      width += 60
    }

    // TODO props ?? 0;
    const NORMAL_WIDTH = 150

    const columns = unref(columnsRef).filter((item) => !item.defaultHidden)
    columns.forEach((item) => {
      width += Number.parseInt(item.width as string) || 0
    })
    const unsetWidthColumns = columns.filter((item) => !Reflect.has(item, 'width'))

    const len = unsetWidthColumns.length
    if (len !== 0) {
      width += len * NORMAL_WIDTH
    }

    const table = unref(tableElRef)
    const tableWidth = table?.$el?.offsetWidth ?? 0
    return tableWidth > width ? '100%' : width
  })

  const getScrollRef = computed(() => {
    const { scroll } = unref(propsRef)
    return {
      x: unref(getScrollX),
      y: null,
      scrollToFirstRowOnChange: false,
      ...scroll,
    }
  })

  return { getScrollRef, redoHeight }
}
