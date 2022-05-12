import { Ref, unref, watchEffect } from 'vue'
import { useTimeoutFn } from '@/hooks/core/useTimeout'

export interface UseModalDragMoveContext {
  draggable: Ref<boolean>;
  destroyOnClose: Ref<boolean | undefined> | undefined;
  modelValue: Ref<boolean>;

}

export function useModalDragMove(context: UseModalDragMoveContext) {
  const getStyle = (dom: any, attr: any) => {
    return getComputedStyle(dom)[attr]
  }
  const drag = (wrap: any) => {
    if (!wrap) return
    wrap.setAttribute('data-drag', unref(context.draggable))
    const dialogHeaderEl = wrap.querySelector('.el-dialog__header')
    const dragDom = wrap.querySelector('.el-dialog')

    if (!dialogHeaderEl || !dragDom || !unref(context.draggable)) return

    dialogHeaderEl.style.cursor = 'move'
    dialogHeaderEl.classList.add('is-drag')

    dialogHeaderEl.onmousedown = (e: any) => {
      if (!e) return
      const disX = e.clientX
      const disY = e.clientY
      const screenWidth = document.body.clientWidth
      const screenHeight = document.documentElement.clientHeight

      const dragDomWidth = dragDom.offsetWidth
      const dragDomheight = dragDom.offsetHeight

      const minDragDomLeft = dragDom.offsetLeft

      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight
      const domLeft = getStyle(dragDom, 'left')
      const domTop = getStyle(dragDom, 'top')
      let styL = +domLeft
      let styT = +domTop

      if (domLeft.includes('%')) {
        styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100)
        styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100)
      } else {
        styL = +domLeft.replace(/px/g, '')
        styT = +domTop.replace(/px/g, '')
      }

      document.onmousemove = function (e) {
        let left = e.clientX - disX
        let top = e.clientY - disY

        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }

  const handleDrag = () => {
    const dragWraps = document.querySelectorAll('.el-overlay')
    for (const wrap of Array.from(dragWraps)) {
      if (!wrap) continue
      const display = getStyle(wrap, 'display')
      const draggable = wrap.getAttribute('data-drag')
      if (display !== 'none') {
        if (draggable === null || unref(context.destroyOnClose)) {
          drag(wrap)
        }
      }
    }
  }

  watchEffect(() => {
    if (!unref(context.modelValue) || !unref(context.draggable)) {
      return
    }
    useTimeoutFn(() => {
      handleDrag()
    }, 30)
  })
}
