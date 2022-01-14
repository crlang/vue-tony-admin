<!--
 * @Author: Crlang
 * @Description: Card Grid component
-->
<template>
  <el-card
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
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { ShadowTypes } from './types'

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
