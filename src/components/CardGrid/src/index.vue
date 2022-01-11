<!--
 * @Author: Crlang
 * @Description: Card Grid component
-->
<template>
  <el-card
    shadow="never"
    :class="prefixCls"
    :body-style="{ margin: '-1px 0 0 -1px', padding: 0}">
    <template
      #header
      v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <div :class="getContentClass">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'CardGrid',
  components: {
  },
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    center: {
      type: Boolean,
      defalut: false,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('card-grid')

    const getContentClass = computed(() => [
      prefixCls + '__container',
      'row-span' + props.rows,
      {
        [`items-center`]: unref(props.center),
      },
    ])

    return {
      prefixCls,
      getContentClass,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-card-grid';

.#{$prefix-cls} {
  overflow: visible;

  &__container {
    // @for $i from 1 through 20 {
    //   &.row-span#{$i} > .#{$prefix-cls}-item {
    //     width: math.div(100%, $i);
    //   }
    // }

    display: flex;
    flex-wrap: wrap;

    > .#{$prefix-cls}-item {
      padding: 24px;
      cursor: pointer;
      border: 0;
      border-radius: 0;
      box-shadow: 1px 0 #f0f0f0, 0 1px #f0f0f0, 1px 1px #f0f0f0, 1px 0 #f0f0f0 inset, 0 1px #f0f0f0 inset;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0,0.15);
      }

      &.items-direction-column {
        flex-direction: column;
      }
    }

    &.items-center > .#{$prefix-cls}-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
