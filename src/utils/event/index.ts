import ResizeObserver from 'resize-observer-polyfill'

function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn: () => any) => {
        fn()
      })
    }
  }
}

export function addResizeListener(element: any, fn: () => any) {
  if (typeof window === 'undefined') return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export function removeResizeListener(element: any, fn: () => any) {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}

export function triggerWindowResize() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  ;(event as any).eventType = 'message'
  window.dispatchEvent(event)
}
