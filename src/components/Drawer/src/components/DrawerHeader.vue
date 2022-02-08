<template>
  <div
    v-if="isDetail"
    :class="`${prefixCls}-header`">
    <span :class="`${prefixCls}-header__title`">
      <span
        :class="`${prefixCls}-header__back`"
        v-if="showDetailBack"
        @click="handleClose"><ArrowLeft /></span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}-header__toolbar`">
      <slot name="titleToolbar"></slot>
    </span>
  </div>

  <BasicTitle
    v-else
    :class="prefixCls">
    <template v-if="$slots.title"><slot name="title"></slot></template>
    <template v-else>{{ title || '' }}</template>
  </BasicTitle>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTitle } from '@/components/Basic'
import { ArrowLeft } from '@element-plus/icons'

export default defineComponent({
  name: 'BasicDrawerHeader',
  components: { BasicTitle, ArrowLeft },
  inheritAttrs: false,
  props: {
    prefixCls: { type: String },
    isDetail: { type: Boolean },
    showDetailBack: { type: Boolean },
    title: { type: String },
  },
  emits: ['close'],
  setup(_, { emit }) {
    function handleClose() {
      emit('close')
    }

    return { handleClose }
  },
})
</script>
