<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@/components/Icon'
import { useDesign } from '@/hooks/web/useDesign'
import { ArrowDirection } from './typing'

const props = defineProps({
  /**
   * Arrow expand state
   */
  expand: { type: Boolean },
  /**
   * Arrow up by default
   */
  direction: { type: String as PropType<ArrowDirection>, default: 'down' },
})

const { prefixCls } = useDesign('basic-arrow')

// get component class
const getClass = computed(() => {
  const { expand, direction } = props
  return [
    prefixCls,
    `${prefixCls}--${direction}`,
    {
      'is-actived': expand,
    },
  ]
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-arrow';

.#{$prefix-cls} {
  display: inline-block;
  font-size: 0;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.3s ease 0.1s;

  &.is-actived {
    transform: rotate(90deg);
  }

  &--up {
    transform: rotate(-90deg);
  }

  &--down {
    transform: rotate(90deg);

    &.is-actived {
      transform: rotate(-90deg);
    }
  }

  &--left {
    transform: rotate(180deg);
  }

  &--right {
    transform: rotate(0);
  }
}
</style>
