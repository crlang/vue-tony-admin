<template>
  <span
    :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle">
    <svg

      aria-hidden="true">
      <use
        :xlink:href="symbolId"
        :fill="color" />
    </svg>
  </span>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'SvgIcon',
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
    /**
     * Icon color
     */
    color: {
      type: String,
      default: 'inherit',
    },
    /**
     * Icon rotate
     */
    rotate: {
      type: String,
      default: '0deg',
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('svg-icon')
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    const getStyle = computed((): CSSProperties => {
      const { size, rotate = '0deg' } = props
      let s = parseInt(size) || ''
      if (!s) {
        s = '1rem'
      } else {
        s = `${s}px`
      }
      return {
        fontSize: s,
        lineHeight: s,
        transform: `rotate(${rotate})`,
      }
    })
    return { symbolId, prefixCls, getStyle }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-svg-icon';

.#{$prefix-cls} {
  overflow: hidden;

  svg {
    display: block;
    width: 1em;
    height: 1em;
    overflow: hidden;
    fill: currentColor;
  }
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
