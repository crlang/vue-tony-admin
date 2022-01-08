<!--
 * @Author: Crlang
 * @Description: Card Grid Item component
-->
<template>
  <div
    :class="getContentClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import type { PropType } from 'vue'
import type { ShadowTypes } from './types'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'CardGridItem',
  components: {},
  props: {
    shadow: {
      type: String as PropType<ShadowTypes>,
      default: 'hover',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('card-grid-item')

    const getContentClass = computed(() => [
      prefixCls,
      `ty-card-grid__${props.shadow}`,
      {
        [`items-direction-column`]: props.vertical,
      },
    ])

    return {
      getContentClass,
    }
  },
})
</script>
