<!--
 * @Author: CRLang
 * @Description: List Item Meta component
-->
<template>
  <div :class="prefixCls">
    <div
      :class="prefixCls+'-avatar'"
      v-if="$slots.avatar">
      <slot name="avatar"></slot>
    </div>
    <div
      :class="prefixCls+'-content'"
      v-if="$slots.title || $slots.description">
      <h4
        :class="prefixCls+'-title'"
        v-if="$slots.title"><slot name="title">{{ title }}</slot></h4>
      <div
        :class="prefixCls+'-description'"
        v-if="$slots.description"><slot name="description">{{ description }}</slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ListItemMeta',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { prefixCls } = useDesign('list-item-meta')

    return {
      prefixCls,
    }
  },
})
</script>
