<template>
  <ScrollContainer
    ref="wrapperRef"
    :class="customClass">
    <div
      ref="spinRef"
      :style="spinStyle"
      v-loading="loading"
      :element-loading-text="loadingTip">
      <slot></slot>
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import {
  defineComponent,
  computed,
  ref,
  watchEffect,
  unref,
  watch,
  onMounted,
  nextTick,
  onUnmounted,
} from 'vue'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { ScrollContainer } from '@/components/Container'
import { createModalContext } from '../hooks/useModalContext'
import { useMutationObserver } from '@vueuse/core'
import { wrapperProps } from '../props'

export default defineComponent({
  name: 'ModalWrapper',
  components: { ScrollContainer },
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean }, // inherit
    fullscreen: { type: Boolean }, // inherit
    customClass: { type: String },
    ...wrapperProps,
  },
  emits: ['height-change', 'ext-height'],
  setup(props, { emit }) {
    const wrapperRef = ref<ComponentRef>(null)
    const spinRef = ref<ElRef>(null)
    const realHeightRef = ref(0)
    const minRealHeightRef = ref(0)

    let realHeight = 0

    const stopElResizeFn: Fn = () => {}

    useWindowSizeFn(setModalHeight.bind(null, false))

    useMutationObserver(
      spinRef,
      () => {
        setModalHeight()
      },
      {
        attributes: true,
        subtree: true,
      },
    )

    createModalContext({
      redoModalHeight: setModalHeight,
    })

    const spinStyle = computed((): CSSProperties => {
      return {
        [props.fullscreen ? 'height' : 'maxHeight']: `${unref(realHeightRef)}px`,
      }
    })

    watchEffect(() => {
      props.useWrapper && setModalHeight()
    })

    watch(
      () => props.fullscreen,
      (v) => {
        setModalHeight()
        if (!v) {
          realHeightRef.value = minRealHeightRef.value
        } else {
          minRealHeightRef.value = realHeightRef.value
        }
      },
    )

    onMounted(() => {
      const { modalHeaderHeight, modalFooterHeight } = props
      emit('ext-height', modalHeaderHeight + modalFooterHeight)
    })

    onUnmounted(() => {
      stopElResizeFn && stopElResizeFn()
    })

    async function scrollTop() {
      nextTick(() => {
        const wrapperRefDom = unref(wrapperRef)
        if (!wrapperRefDom) return;
        (wrapperRefDom as any)?.scrollTo?.(0)
      })
    }

    async function setModalHeight() {
      if (!props.modelValue) return

      const wrapperRefDom = unref(wrapperRef)
      if (!wrapperRefDom) return

      const bodyDom = wrapperRefDom.$el.parentElement
      if (!bodyDom) return

      await nextTick()

      try {
        const modalDom = bodyDom.parentElement
        if (!modalDom) return

        const modalTop = modalDom.offsetTop

        let maxHeight =
            window.innerHeight -
            modalTop * 2 +
            (props.footerOffset! || 0) -
            props.modalFooterHeight -
            props.modalHeaderHeight

        if (modalTop < 40) {
          maxHeight -= 26
        }
        await nextTick()
        const spinEl = unref(spinRef)

        if (!spinEl) return
        await nextTick()

        realHeight = spinEl.scrollHeight

        if (props.fullscreen) {
          realHeightRef.value =
              window.innerHeight - props.modalFooterHeight - props.modalHeaderHeight - 28
        } else {
          realHeightRef.value = realHeight > maxHeight ? maxHeight : realHeight
        }
        emit('height-change', unref(realHeightRef))
      } catch (error) {
        console.warn(error)
      }
    }

    return { wrapperRef, spinRef, spinStyle, scrollTop, setModalHeight }
  },
})
</script>
