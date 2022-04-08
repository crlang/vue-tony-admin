<template>
  <div :class="prefixCls">
    <template v-if="$slots.default"><slot></slot></template>
    <template v-else>
      <div :class="`${prefixCls}__left`">
        <slot name="left"></slot>
      </div>
      <div :class="`${prefixCls}__right`">
        <slot name="right"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'PageFooter',
  inheritAttrs: false,
  setup() {
    const { prefixCls } = useDesign('page-footer')
    return { prefixCls }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-page-footer';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--background-primary-color);
  border-top: 1px solid var(--border-grey-color);
  box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05),
    0 -12px 48px 16px rgba(0, 0, 0, 0.03);

  &__left,
  &__right {
    flex: 1;
  }
}
</style>
