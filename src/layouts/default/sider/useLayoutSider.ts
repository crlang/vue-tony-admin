import type { Ref } from 'vue'

import { computed, nextTick, onMounted, unref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { TriggerEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

/**
 * 处理菜单折叠
 */
export function useTrigger(getIsMobile: Ref<boolean>) {
  const { getTrigger, getSplit } = useMenuSetting()

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger)

    return trigger !== TriggerEnum.NONE && !unref(getIsMobile) && (trigger === TriggerEnum.FOOTER || unref(getSplit))
  })

  return { getShowTrigger }
}

/**
 * 处理菜单拖放
 *
 * @param siderRef
 * @param dragBarRef
 */
export function useDragLine(siderRef: Ref<any>, dragBarRef: Ref<any>, mix = false) {
  const { getMiniWidthNumber, getCollapsed, setMenuSetting } = useMenuSetting()

  onMounted(() => {
    nextTick(() => {
      const exec = useDebounceFn(changeWrapWidth, 80)
      exec()
    })
  })

  function getEl(elRef: Ref<ElRef | ComponentRef>): any {
    const el = unref(elRef)
    if (!el) {
      return null
    }
    if (Reflect.has(el, '$el')) {
      return (unref(elRef) as ComponentRef)?.$el
    }
    return unref(elRef)
  }

  function handleMouseMove(ele: HTMLElement, wrap: HTMLElement, clientX: number) {
    document.onmousemove = function (innerE) {
      let iT = (ele as any).left + (innerE.clientX - clientX)
      innerE = innerE || window.event
      const maxT = 800
      const minT = unref(getMiniWidthNumber)
      if (iT < 0) {
        (iT = 0)
      }
      if (iT > maxT) {
        (iT = maxT)
      }
      if (iT < minT) {
        (iT = minT)
      }
      ele.style.left = `${iT - 4}px`
      ele.style.right = 'auto'
      wrap.style.width = `${iT}px`
      return false
    }
  }

  function removeMouseup(ele: any) {
    const wrap = getEl(siderRef)
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      wrap.style.transition = 'width 0.2s'
      const width = Number.parseInt(wrap.style.width)

      if (!mix) {
        const miniWidth = unref(getMiniWidthNumber)
        if (!unref(getCollapsed)) {
          if (width > miniWidth + 20) {
            setMenuSetting({ menuWidth: width })
          }
          else {
            setMenuSetting({ collapsed: true })
          }
        }
        else {
          if (width > miniWidth) {
            setMenuSetting({ collapsed: false, menuWidth: width })
          }
        }
      }
      else {
        setMenuSetting({ menuWidth: width })
      }

      ele.releaseCapture?.()
    }
  }

  function changeWrapWidth() {
    const ele = getEl(dragBarRef)
    if (!ele) {
      return
    }
    const wrap = getEl(siderRef)
    if (!wrap) {
      return
    }

    ele.onmousedown = (e: any) => {
      wrap.style.transition = 'unset'
      const clientX = e?.clientX
      ele.left = ele.offsetLeft
      handleMouseMove(ele, wrap, clientX)
      removeMouseup(ele)
      ele.setCapture?.()
      return false
    }
  }

  return {}
}
