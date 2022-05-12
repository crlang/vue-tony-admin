<template>
  <span
    ref="elRef"
    :class="[$attrs.class, 'app-iconify eleicon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"></span>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick, unref, computed, CSSProperties } from 'vue'
import Iconify from '@purge-icons/generated'
import { isString } from '@/utils/is'

export default defineComponent({
  name: 'Icon',
  components: { },
  props: {
    /**
     * Icon name
     */
    icon: { type: String, required: true },
    /**
     * Icon color
     */
    color: { type: String },
    /**
     * Icon size
     */
    size: {
      type: [String, Number],
      default: 16,
    },
    /**
     * Whether the icon is turned on rotation
     */
    spin: { type: Boolean },
    /**
     * Icon Prefix
     */
    prefix: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const elRef = ref<ElRef>(null)

    const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`)

    const update = async () => {
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

    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props
      let fs = size
      if (isString(size)) {
        fs = parseInt(size, 10)
      }

      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex',
      }
    })

    watch(() => props.icon, update, { flush: 'post' })

    onMounted(update)

    return { elRef, getWrapStyle }
  },
})
</script>

<style lang="scss">
.app-iconify {
  display: inline-block;

  &-spin {
    svg {
      animation: iconLoadingCircle 1s infinite linear;
    }
  }

  svg {
    width: 1em;
    height: 1em;
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background-color: rgba(85, 85, 85, 0.06);
  border-radius: 100%;
}
@keyframes iconLoadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
