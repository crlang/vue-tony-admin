<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp
      :class="`${prefixCls}-help`"
      v-if="helpMessage"
      :text="helpMessage" />
  </span>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue'
import BasicHelp from './BasicHelp.vue'
import { useDesign } from '@/hooks/web/useDesign'

const props = defineProps({
  /**
   * Prompt text or text array
   * @default: ''
   */
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * Whether to show the color block to the left of the title
   * @default: false
   */
  span: { type: Boolean },
  /**
   * Whether the title is bold
   * @default: false
   */
  bold: { type: Boolean },
})

const { prefixCls } = useDesign('basic-title')
const slots = useSlots()
const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}--span`]: props.span && slots.default },
  { [`${prefixCls}--bold`]: props.bold },
])
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-title';

.#{$prefix-cls} {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 7px;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5rem;
  color: var(--text-primary-color);
  cursor: pointer;
  user-select: none;

  &--bold {
    font-weight: bold;
  }

  &--span::before {
    position: absolute;
    top: 10%;
    left: 0;
    width: 3px;
    height: 80%;
    margin-right: 4px;
    background-color: var(--primary-color);
    content: '';
  }

  &-help {
    margin-left: 0.75rem;
  }
}
</style>
