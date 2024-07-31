<template>
  <div
    ref="spinRef"
    v-loading="loading"
    :style="spinStyle"
    :element-loading-text="loadingText"
  >
    <ScrollContainer v-if="dyncHeight" ref="wrapperRef" :class="prefixCls">
      <div ref="innerRef">
        <slot></slot>
      </div>
    </ScrollContainer>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, nextTick, ref, unref, watch, watchEffect } from 'vue'
import { ElLoading } from 'element-plus'
import { createModalContext } from '../useModalContext'
import { wrapperProps } from '../props'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { ScrollContainer } from '@/components/ScrollContainer'

export default defineComponent({
  name: 'ModalWrapper',
  components: { ScrollContainer },
  directives: {
    loading: ElLoading.directive,
  },
  inheritAttrs: false,
  props: {
    modelValue: Boolean, // inherit
    fullscreen: Boolean, // inherit
    prefixCls: String, // inherit
    ...wrapperProps,
  },
  emits: ['heightChange'],
  setup(props, { emit }) {
    const wrapperRef = ref<ComponentRef>(null)
    const spinRef = ref<ElRef>(null)
    const innerRef = ref<ElRef>(null)
    const realHeightRef = ref(0)
    /**
     * 获取内容区样式
     */
    const spinStyle = computed((): CSSProperties => {
      const { dyncHeight } = props
      return dyncHeight
        ? {
          // 动态获取内容区高度
            height: `${unref(realHeightRef)}px`,
          }
        : {
            height: 'auto',
            padding: '1rem',
          }
    })

    /**
     * 滚动区滚动到顶部
     */
    async function scrollTop() {
      nextTick(() => {
        const wrapperRefDom = unref(wrapperRef)
        if (!wrapperRefDom) {
          return
        }

        (wrapperRefDom as any)?.scrollTo?.(0)
      })
    }

    /**
     * 设置内容区高度
     */
    async function setModalHeight() {
      if (!props.modelValue) {
        return
      }

      // 无动态高度
      if (!props.dyncHeight) {
        return
      }

      // 内容区
      const spinDom = unref(spinRef)
      if (!spinDom) {
        return
      }

      await nextTick()

      // 弹窗中心
      const bodyDom = spinDom.parentElement
      if (!bodyDom) {
        return
      }

      // 插槽内容
      const innerRefDom = unref(innerRef)
      if (!innerRefDom) {
        return
      }

      const modalInnerHeight = innerRefDom?.clientHeight || 0

      await nextTick()

      try {
        const modalDom = bodyDom.parentElement
        if (!modalDom) {
          return
        }

        const modalHeaderHeight = modalDom.querySelector('.el-dialog__header')?.clientHeight || 0
        const modalFooterHeight = modalDom.querySelector('.el-dialog__footer')?.clientHeight || 0

        const modalTop = modalDom.offsetTop

        // 计算合适的内容区高度
        let maxHeight
          = window.innerHeight // window height
          - modalTop * 2 // modal offset top/bottom
          - modalFooterHeight // modal footer height
          - modalHeaderHeight // modal header height

        // 如果插槽内容高度低于计算的高度，直接拿插槽内容高度
        if (modalInnerHeight < maxHeight) {
          maxHeight = modalInnerHeight
        }

        // 至少保留 100px 的内容区高度
        realHeightRef.value = maxHeight > 100 ? maxHeight : 100
        emit('heightChange', unref(realHeightRef))
      }
      catch (error) {
        console.error(error)
      }
    }

    // 窗口变化是更新高度
    useWindowSizeFn(setModalHeight.bind(null))

    // useMutationObserver(
    //   innerRef,
    //   () => {
    //     setModalHeight()
    //   },
    //   {
    //     attributes: true,
    //     subtree: true,
    //   },
    // )

    createModalContext({
      redoModalHeight: setModalHeight,
    })

    watchEffect(() => {
      if (props.dyncHeight) {
        setModalHeight()
      }
    })

    watch(
      () => props.fullscreen,
      () => {
        setModalHeight()
      },
    )

    return {
      wrapperRef,
      spinRef,
      innerRef,
      spinStyle,
      scrollTop,
      setModalHeight,
    }
  },
})
</script>
