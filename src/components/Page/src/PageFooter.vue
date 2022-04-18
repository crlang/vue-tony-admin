<template>
  <div :class="prefixCls">
    <slot
      name="default"
      v-if="$slots.default"></slot>
    <div
      :class="`${prefixCls}__left`"
      v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div
      :class="`${prefixCls}__right`"
      v-if="$slots.right">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageFooter',
  inheritAttrs: false,
  props: {
    prefixCls: String,
  },
  setup() { },
})
</script>
