<template>
  <div
    :class="prefixCls"
    :style="getWrapStyle"
    v-loading="loading">
    <iframe
      :src="frameSrc"
      :class="`${prefixCls}__main`"
      ref="frameRef"
      @load="hideLoading"></iframe>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { ref, unref, computed } from 'vue'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { useLayoutHeight } from '@/layouts/default/content/useContentViewHeight'

defineProps({
  frameSrc: propTypes.string.def(''),
})

const loading = ref(true)
const topRef = ref(50)
const heightRef = ref(window.innerHeight)
const frameRef = ref<HTMLIFrameElement>()
const { headerHeightRef } = useLayoutHeight()

const { prefixCls } = useDesign('iframe-page')
useWindowSizeFn(calcHeight, 150, { immediate: true })

const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`,
  }
})

function calcHeight() {
  const iframe = unref(frameRef)
  if (!iframe) {
    return
  }
  const top = headerHeightRef.value
  topRef.value = top
  heightRef.value = window.innerHeight - top
  const clientHeight = document.documentElement.clientHeight - top
  iframe.style.height = `${clientHeight}px`
}

function hideLoading() {
  loading.value = false
  calcHeight()
}
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-iframe-page';

.#{$prefix-cls} {
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--background-secondary-color);
    border: 0;
    box-sizing: border-box;
  }
}
</style>
