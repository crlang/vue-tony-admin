<template>
  <div :class="prefixCls">
    <slot></slot>
    <BasicListItemMeta :thumb="thumb" :title="title" :description="description">
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </BasicListItemMeta>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BasicListItemMeta from './BasicListItemMeta.vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'ListItem',
  components: { BasicListItemMeta },
  props: {
    /**
     * 缩略图
     */
    thumb: {
      type: String,
      default: '',
    },
    /**
     * 标题
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * 描述
     */
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { prefixCls } = useDesign('basic-list-item')

    return {
      prefixCls,
    }
  },
})
</script>
