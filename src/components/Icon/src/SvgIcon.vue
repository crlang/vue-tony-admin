<template>
  <svg
    :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'SvgIcon',
  // inheritAttrs: false,
  props: {
    /**
     * Icon name
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Icon size
     */
    size: {
      type: [Number, String],
      default: 0,
    },
    /**
     * Whether the icon is turned on rotation
     */
    spin: {
      type: Boolean,
      default: false,
    },
    /**
     * Icon prefix
     */
    prefix: {
      type: String,
      default: 'icon',
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('svg-icon')
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    const getStyle = computed((): CSSProperties => {
      const { size } = props
      if (parseInt(size) === 0) {
        return {}
      }
      let s = `${size}`
      s = `${s.replace('px', '')}px`
      return {
        width: s,
        height: s,
      }
    })
    return { symbolId, prefixCls, getStyle }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-svg-icon';

.#{$prefix-cls} {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: svgLoadingCircle 1s infinite linear;
}

@keyframes svgLoadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
