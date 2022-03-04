<template>
  <ElPagination
    v-if="total"
    v-bind="getBindValue"
    v-model:current-page="pageRef"
    v-model:page-size="sizeRef" />
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, watch, watchEffect } from 'vue'
import { ElPagination } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { PAGE_SIZE } from '../const'
import { omit } from 'lodash-es'
import { ElePaginationProps } from '@/components/ElementPlus'

export default defineComponent({
  name: 'TablePagination',
  components: { ElPagination },
  inheritAttrs: false,
  props: ElePaginationProps,
  emits: ['pageChange', 'sizeChange'],
  setup(props, { attrs, emit }) {
    const { prefixCls } = useDesign('basic-table-pagination')
    const pageRef = ref(1)
    const sizeRef = ref(PAGE_SIZE)

    const getBindValue = computed(() => {
      const p = { ...unref(attrs), ...props }
      const attr = omit(p, ['pageSize', 'currentPage'])
      return attr
    })

    watchEffect(() => {
      const { currentPage, pageSize } = props
      currentPage && (pageRef.value = currentPage)
      pageSize && (sizeRef.value = pageSize)
    })

    watch(
      () => unref(pageRef),
      (v) => {
        v && emit('pageChange', v)
      },
    )
    watch(
      () => unref(sizeRef),
      (v) => {
        v && emit('sizeChange', v)
      },
    )

    return {
      prefixCls,
      getBindValue,
      pageRef,
      sizeRef,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table-pagination';

.#{$prefix-cls} {
  position: relative;
}
</style>
