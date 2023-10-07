<template>
  <div :class="prefixCls" :style="getWrapStyle" v-loading="loading">
    <iframe
      :src="frameSrc"
      :class="`${prefixCls}__main`"
      ref="frameRef"
      @load="hideLoading"></iframe>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';

import { ref, unref, computed, defineComponent } from 'vue';
import { ElLoading } from 'element-plus';

import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
  name: 'FrameBlank',
  directives: {
    loading: ElLoading.directive,
  },
  props: {
    frameSrc: String,
  },
  setup() {
    const loading = ref(true);
    const heightRef = ref(window.innerHeight);
    const frameRef = ref<HTMLIFrameElement>();

    const { prefixCls } = useDesign('iframe-page');

    const getWrapStyle = computed((): CSSProperties => {
      return {
        height: `calc(${unref(heightRef)}px - var(--header-height,0px) - var(--tabs-height,0px))`,
      };
    });

    function hideLoading() {
      loading.value = false;
    }
    return {
      prefixCls,
      frameRef,
      getWrapStyle,
      loading,
      hideLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-iframe-page';

.#{$prefix-cls} {
  &__main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--background-primary-color);
    border: 0;
  }
}
</style>
