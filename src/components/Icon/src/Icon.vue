<template>
  <SvgIcon
    v-if="getIsSvgIcon"
    :name="getIconRef"
    :size="size"
    :color="color"
    :spin="spin"
  />
  <span
    v-else
    ref="elRef"
    :class="[`${prefixCls} eleicon`, spin && `${prefixCls}-spin`]"
    :style="getWrapStyle"
  ></span>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { computed, defineComponent, nextTick, onMounted, ref, unref, watch } from 'vue'
import Iconify from '@purge-icons/generated'

import { useDesign } from '@/hooks/web/useDesign'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'Icon',
  components: { SvgIcon },
  props: {
    /**
     * 图标名称，名称来源请参考 TA 文档说明，如 ep:view
     */
    name: { type: String, required: true },
    /**
     * 图标颜色
     */
    color: { type: String },
    /**
     * 图片大小
     */
    size: {
      type: [Number, String],
      default: 0,
    },
    /**
     * 是否旋转
     */
    spin: { type: Boolean },
    /**
     * 图标前缀，如果图标为 ep:view，填写前缀 ep ，则 name 只需要填写 view
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
     * 是否SVG图标
     */
    const getIsSvgIcon = computed(() => {
      if ((props?.name || '').includes('|svg')) {
        return true
      }
      return false
    })

    /**
     * 获取图标名称
     */
    const getIconRef = computed(() => {
      const { prefix, name } = props
      if (name.includes('|svg')) {
        return name.replace('|svg', '')
      }
      return `${prefix ? `${prefix}:` : ''}${props.name}`
    })

    /**
     * 动态渲染图标
     */
    const update = async () => {
      const el = unref(elRef)
      if (!el)
        return

      const isSvgIcon = unref(getIsSvgIcon)
      if (isSvgIcon)
        return

      await nextTick()
      const icon = unref(getIconRef)
      if (!icon)
        return

      const svg = Iconify.renderSVG(icon, {})
      if (svg) {
        el.textContent = ''
        el.appendChild(svg)
      }
      else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = icon
        el.textContent = ''
        el.appendChild(span)
      }
    }

    /**
     * 获取svg框样式
     */
    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props
      const fs = Number.parseInt(size, 10)

      return {
        fontSize: fs ? `${fs}px` : 'inherit',
        color,
      }
    })

    watch(() => props.name, update, { flush: 'post' })

    onMounted(update)

    return { elRef, getWrapStyle, prefixCls, getIconRef, getIsSvgIcon }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-icon';

.#{$prefix-cls} {
  display: inline-flex;
  place-self: center center;

  svg {
    width: 1em;
    height: 1em;
  }

  &-spin {
    svg {
      animation: icon-loading-circle 1s infinite linear;
    }
  }
}

@keyframes icon-loading-circle {
  100% {
    transform: rotate(360deg);
  }
}

// iconify mode
span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background-color: rgb(85 85 85 / 6%);
  border-radius: 100%;
}
</style>
