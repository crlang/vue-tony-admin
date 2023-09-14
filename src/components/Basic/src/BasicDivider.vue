<template>
  <div :class="getClass" :style="getStyle">
    <span :class="`${prefixCls}-before`"></span>
    <span :class="`${prefixCls}-text`" v-if="text">{{ text }}</span>
    <span :class="`${prefixCls}-text`" v-else><slot></slot></span>
    <span :class="`${prefixCls}-after`"></span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useDesign } from '@/hooks/web/useDesign';
import { isDark } from '@/logics/theme';

export const BasicDividerProps = {
  text: {
    type: String,
    default: '',
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  borderColor: {
    type: String,
    default: '',
  },
  borderStyle: {
    type: String as PropType<'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>,
    default: 'solid',
  },
  textColor: {
    type: String,
    default: 'inherit',
  },
  textSize: {
    type: Number,
    default: 14,
  },
  textStyle: {
    type: String,
    default: 'normal',
  },
  contentPosition: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center',
  },
};

export default defineComponent({
  name: 'BasicDivider',
  components: {},
  props: BasicDividerProps,
  setup(props) {
    const { prefixCls } = useDesign('basic-divider');

    const getClass = computed(() => [prefixCls, `${prefixCls}--${props.direction}`, `${prefixCls}--${props.contentPosition}`]);

    const getStyle = computed(() => {
      return {
        '--ty-border-style': props.borderStyle || 'solid',
        '--ty-border-color': props.borderColor ? props.borderColor : isDark.value ? '#aaa' : '#bbb',
        '--ty-text-style': props.textStyle || 'normal',
        '--ty-text-color': props.textColor || 'inherit',
        '--ty-text-size': `${props.textSize || 14}px`,
      };
    });

    return {
      prefixCls,
      getClass,
      getStyle,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-divider';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;

  &-text {
    flex-shrink: 0;
    padding: 5px 20px;
    font-size: var(--ty-text-size);
    font-weight: var(--ty-text-style);
    color: var(--ty-text-color);
    white-space: nowrap;
  }

  &-before,
  &-after {
    flex-grow: 1;
    height: 1px;
    border-top: 1px var(--ty-border-color) var(--ty-border-style);
  }

  &--left {
    justify-content: left;

    .#{$prefix-cls}-before {
      flex-grow: 0;
      width: 20px;
    }
  }

  &--right {
    justify-content: right;

    .#{$prefix-cls}-after {
      flex-grow: 0;
      width: 20px;
    }
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 10px;
    vertical-align: middle;
    border-top: none;
    border-right: 1px var(--ty-border-color) var(--ty-border-style);

    .#{$prefix-cls}-before,
    .#{$prefix-cls}-after,
    .#{$prefix-cls}-text {
      display: none;
    }
  }
}
</style>
