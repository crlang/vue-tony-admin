<template>
  <Scrollbar
    ref="scrollbarRef"
    :class="prefixCls">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, unref, nextTick } from 'vue'
import { Scrollbar, ScrollbarType } from '@/components/Scrollbar'
import { useScrollTo } from '@/hooks/event/useScrollTo'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ScrollContainer',
  components: { Scrollbar },
  setup() {
    const scrollbarRef = ref<Nullable<ScrollbarType>>(null)
    const { prefixCls } = useDesign('scroll-container')

    /**
     * Scroll to the specified position
     */
    function scrollTo(to: number, duration = 500) {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = unref(scrollbar.wrap)
        if (!wrap) {
          return
        }
        const { start } = useScrollTo({
          el: wrap,
          to,
          duration,
        })
        start()
      })
    }

    function getScrollWrap() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return null
      }
      return scrollbar.wrap
    }

    /**
     * Scroll to the bottom
     */
    function scrollBottom() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = unref(scrollbar.wrap) as any
        if (!wrap) {
          return
        }
        const scrollHeight = wrap.scrollHeight as number
        const { start } = useScrollTo({
          el: wrap,
          to: scrollHeight,
        })
        start()
      })
    }

    return {
      prefixCls,
      scrollbarRef,
      scrollTo,
      scrollBottom,
      getScrollWrap,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-scroll-container';

.#{$prefix-cls} {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 16px;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>
