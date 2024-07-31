<template>
  <div :class="prefixCls">
    <div v-if="$slots.thumb" :class="`${prefixCls}-thumb`">
      <slot name="thumb"></slot>
    </div>
    <div v-else-if="thumb" :class="`${prefixCls}-thumb`">
      <img :src="thumb" :alt="title || 'pic'">
    </div>
    <div v-if="$slots.title || $slots.description" :class="`${prefixCls}-content`">
      <h4 v-if="$slots.title" :class="`${prefixCls}-title`">
        <slot name="title"></slot>
      </h4>
      <h4 v-else-if="title" :class="`${prefixCls}-title`">
        {{ title }}
      </h4>
      <div v-if="$slots.description" :class="`${prefixCls}-description`">
        <slot name="description"></slot>
      </div>
      <div v-else-if="description" :class="`${prefixCls}-description`">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ListMeta',
  components: {},
  props: {
    thumb: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { prefixCls } = useDesign('basic-list-item-meta')

    return {
      prefixCls,
    }
  },
})
</script>
