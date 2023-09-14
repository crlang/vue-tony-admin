<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-thumb`" v-if="$slots.thumb || thumb">
      <ElImage :src="thumb" v-if="thumb" :style="`width:${thumbSize};height:${thumbSize};`" />
      <slot name="thumb" v-else></slot>
    </div>
    <div :class="`${prefixCls}-content`">
      <h4 :class="`${prefixCls}-title`" v-if="$slots.title || title">
        <span v-if="title">{{ title }}</span>
        <slot name="title" v-else></slot>
      </h4>
      <div :class="`${prefixCls}-description`" v-if="$slots.description || description">
        <span v-if="description">{{ description }}</span>
        <slot name="description" v-else></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElImage } from 'element-plus';

import { useDesign } from '@/hooks/web/useDesign';

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
    const { prefixCls } = useDesign('basic-list-item-meta');

    return {
      prefixCls,
    };
  },
});
</script>
