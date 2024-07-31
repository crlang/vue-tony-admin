import type { Ref } from 'vue'

import { ref, unref, watch } from 'vue'
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

export type RemoveEventFn = () => void
export interface UseEventListenerOptions {
  /**
   * 事件对象
   */
  el?: Element | Ref<Element | undefined> | Window | any
  /**
   * 事件名称
   */
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  /**
   * 是否自动移除
   */
  autoRemove?: boolean
  /**
   * 是否防抖
   */
  isDebounce?: boolean
  /**
   * 等待时间
   */
  wait?: number
}

/**
 * 事件监听器
 */
export function useEventListener({ el = window, name, listener, options, autoRemove = true, isDebounce = true, wait = 80 }: UseEventListenerOptions): {
  removeEvent: RemoveEventFn
} {
  let remove: RemoveEventFn = () => {}
  const isAddRef = ref(false)

  if (el) {
    const element = ref(el as Element) as Ref<Element>

    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)
    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }
    const addEventListener = (e: Element) => e.addEventListener(name, realHandler, options)

    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          if (!unref(isAddRef)) {
            addEventListener(v)
          }
          cleanUp(() => {
            if (autoRemove) {
              removeEventListener(v)
            }
          })
        }
      },
      { immediate: true },
    )

    remove = () => {
      removeEventListener(element.value)
      removeWatch()
    }
  }
  return { removeEvent: remove }
}
