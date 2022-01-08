import { computed, Ref, ref, unref } from 'vue'

export interface UseFullScreenContext {
  customClass: Ref<string | undefined>;
  modalWrapperRef: Ref<ComponentRef>;
  extHeightRef: Ref<number>;
}

export function useFullScreen(context: UseFullScreenContext) {
  // const formerHeightRef = ref(0);
  const fullScreenRef = ref(false)

  const getCustomClass = computed(() => {
    const clsName = unref(context.customClass) || ''
    return unref(fullScreenRef) ? `fullscreen-modal ${clsName} ` : unref(clsName)
  })

  function handleFullScreen(e: Event) {
    e && e.stopPropagation()
    fullScreenRef.value = !unref(fullScreenRef)
  }
  return { getCustomClass, handleFullScreen, fullScreenRef }
}
