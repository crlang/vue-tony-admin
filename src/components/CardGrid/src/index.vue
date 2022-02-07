<template>
  <ElCard
    :shadow="shadow"
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
  </ElCard>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElCard } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { ShadowTypes } from './types'

export default defineComponent({
  name: 'CardGrid',
  components: {
    ElCard,
  },
  props: {
    /**
     * Number of Rows
     */
    rows: {
      type: Number,
      default: 3,
    },
    /**
     * Whether to center the grid content
     */
    center: {
      type: Boolean,
      defalut: false,
    },
    /**
     * Shadow display mode of the card
     */
    shadow: {
      type: String as PropType<ShadowTypes>,
      default: 'never',
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

<style lang="scss" src="./index.scss"></style>
