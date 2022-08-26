<template>
  <span
    ref="elRef"
    :class="[`${prefixCls} eleicon`, spin && `${prefixCls}-spin`]"
    :style="getWrapStyle"></span>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, ref, watch, onMounted, nextTick, unref, computed } from 'vue'
import Iconify from '@purge-icons/generated'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'Icon',
  components: {},
  props: {
    /**
     * 图标名称，名称来源请参考 TA 文档说明，如 ep:view
     *
     * Icon name, please refer to the TonyAdmin documentation for the source of the name, as ep:view
     * Icon name
     */
    name: { type: String, required: true },
    /**
     * 图标颜色
     *
     * Icon color
     */
    color: { type: String },
    /**
     * 图片大小
     *
     * Icon size
     */
    size: {
      type: [String, Number],
      default: 16,
    },
    /**
     * 是否旋转
     * Whether the icon is turned on rotation
     */
    spin: { type: Boolean },
    /**
     * 图标前缀，如果图标为 ep:view，填写前缀 ep ，则 name 只需要填写 view
     *
     * Icon prefix, if icon is ep:view, fill in prefix 'ep' , then name only needs to fill in 'view'
     */
    prefix: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const elRef = ref<ElRef>(null)

    const { prefixCls } = useDesign('app-icon')

    /**
     * 获取图标名称
     *
     * Get icon name
     */
    const getIconRef = computed(() => `${props.prefix ? `${props.prefix}:` : ''}${props.name}`)

    /**
     * 动态渲染图标
     *
     * Dynamically rendered icons
     */
    const update = async() => {
      const el = unref(elRef)
      if (!el) return

      await nextTick()
      const icon = unref(getIconRef)
      if (!icon) return

      const svg = Iconify.renderSVG(icon, {})
      if (svg) {
        el.textContent = ''
        el.appendChild(svg)
      } else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = icon
        el.textContent = ''
        el.appendChild(span)
      }
    }

    /**
     * 获取svg框样式
     *
     * Get svg wrap style
     */
    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props
      const fs = parseInt(size, 10)

      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex',
      }
    })

    watch(() => props.name, update, { flush: 'post' })

    onMounted(update)

    return { elRef, getWrapStyle, prefixCls }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-icon';

.#{$prefix-cls} {
  display: inline-block;

  svg {
    width: 1em;
    height: 1em;
  }

  &-spin {
    svg {
      animation: iconLoadingCircle 1s infinite linear;
    }
  }
}

@keyframes iconLoadingCircle {
  100% {
    transform: rotate(360deg);
  }
}

// iconify mode
span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background-color: rgba(85, 85, 85, 0.06);
  border-radius: 100%;
}
</style>
