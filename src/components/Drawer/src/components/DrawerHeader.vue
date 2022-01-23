<template>
  <BasicTitle
    v-if="!isDetail"
    :class="prefixCls">
    <slot name="title"></slot>
    {{ !$slots.title ? title : '' }}
  </BasicTitle>

  <div
    :class="[prefixCls, `${prefixCls}--detail`]"
    v-else>
    <span :class="`${prefixCls}__twrap`">
      <span
        @click="handleClose"
        v-if="showDetailBack">
        <span :class="`${prefixCls}__back`"><ArrowLeft /></span>
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTitle } from '@/components/Basic'
import { ArrowLeft } from '@element-plus/icons'

import { useDesign } from '@/hooks/web/useDesign'

import { propTypes } from '@/utils/propTypes'
export default defineComponent({
  name: 'BasicDrawerHeader',
  components: { BasicTitle, ArrowLeft },
  props: {
    isDetail: propTypes.bool,
    showDetailBack: propTypes.bool,
    title: propTypes.string,
  },
  emits: ['close'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('basic-drawer-header')

    function handleClose() {
      emit('close')
    }

    return { prefixCls, handleClose }
  },
})
</script>

<style lang="scss">
$footer-height: 60px;
$prefix-cls: '#{$tonyname}-basic-drawer-header';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  height: 100%;

  &__back {
    padding: 0 12px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }

  &__twrap {
    flex: 1;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  &__toolbar {
    padding-right: 50px;
  }
}
</style>
