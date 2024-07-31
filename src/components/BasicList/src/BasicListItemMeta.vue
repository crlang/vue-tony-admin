<template>
  <div :class="prefixCls">
    <div v-if="$slots.thumb || thumb" :class="`${prefixCls}-thumb`">
      <ElImage v-if="thumb" :src="thumb" :style="`width:${thumbSize};height:${thumbSize};`" />
      <slot v-else name="thumb"></slot>
    </div>
    <div :class="`${prefixCls}-content`">
      <h4 v-if="$slots.title || title" :class="`${prefixCls}-title`">
        <span v-if="title">{{ title }}</span>
        <slot v-else name="title"></slot>
      </h4>
      <div v-if="$slots.description || description" :class="`${prefixCls}-description`">
        <span v-if="description">{{ description }}</span>
        <slot v-else name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElImage } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ListMeta',
  components: { ElImage },
  props: {
    thumb: {
      type: String,
      default: '',
    },
    thumbSize: {
      type: String,
      default: '64px',
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
