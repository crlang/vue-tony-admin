<template>
  <div
    :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'CardGridItem',
  components: {},
  props: {
    vertical: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { prefixCls } = useDesign('card-grid-item')

    return {
      prefixCls,
    }
  },
})
</script>
