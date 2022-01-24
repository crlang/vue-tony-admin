<!--
 * @Author: CRLang
 * @Description: List Item component
-->
<template>
  <li :class="getClass">
    <ElCard
      v-if="type === 'card'"
      :shadow="cardShadow"
      :body-style="cardStyle"
      :class="getCardClass">
      <slot></slot>
    </ElCard>
    <slot v-else></slot>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { ElCard } from 'element-plus'

import type { PropType } from 'vue'
import type { ShadowTypes, ListTypes } from './types'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ListItem',
  components: { ElCard },
  props: {
    type: {
      type: String as PropType<ListTypes>,
      default: '',
    },
    cardBorder: {
      type: Boolean,
      default: true,
    },
    cardClass: {
      type: String,
      default: '',
    },
    cardStyle: {
      type: Object,
      default: () => { return { 'padding': 0 } },
    },
    cardShadow: {
      type: String as PropType<ShadowTypes>,
      default: 'hover',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('list-item')

    const getClass = computed(() => [
      prefixCls,
      {
        [`${prefixCls}--card`]: props.type === 'card',
      },
    ])

    const getCardClass = computed(() => [
      {
        'is-border': unref(props.cardBorder),
      },
      props.cardClass,
    ])

    return {
      getClass,
      getCardClass,
    }
  },
})
</script>
