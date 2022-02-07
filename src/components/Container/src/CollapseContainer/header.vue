<template>
  <div
    :class="`${prefixCls}__header`"
    v-if="title || $slots.title">
    <BasicTitle :helpMessage="helpMessage">
      <template v-if="title">{{ title }}</template>
      <template v-else><slot name="title"></slot></template>
    </BasicTitle>
    <div :class="`${prefixCls}__action`">
      <slot name="action"></slot>
      <BasicArrow
        v-if="canExpan"
        direction="up"
        class="ml-2"
        :expand="show"
        @click="$emit('expand')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicArrow, BasicTitle } from '@/components/Basic'

export default defineComponent({
  components: { BasicArrow, BasicTitle },
  inheritAttrs: false,
  props: {
    /**
     * Collapse title
     */
    title: { type: String },
    /**
     * Whether to show the expand icon
     */
    canExpan: { type: Boolean },
    /**
     * Warm reminder on the right side of the title
     */
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    /**
     * Icon state
     */
    show: { type: Boolean },
    prefixCls: { type: String },
  },
  emits: ['expand'],
  setup() { },
})
</script>
