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
   * Arrow direction
   */
  direction: { type: String as PropType<ArrowDirection>, default: 'down' },
})

const { prefixCls } = useDesign('basic-arrow')

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
  user-select: none;

  > .eleicon {
    transform: rotate(0deg);
    transition: transform 0.3s ease 0.1s;
  }

  &.is-actived > .eleicon{
    transform: rotate(90deg);
  }

  &--up > .eleicon{
    transform: rotate(-90deg);
  }

  &--down > .eleicon{
    transform: rotate(90deg);

    &.is-actived > .eleicon{
      transform: rotate(-90deg);
    }
  }

  &--left > .eleicon{
    transform: rotate(180deg);
  }

  &--right > .eleicon{
    transform: rotate(0);
  }
}
</style>
