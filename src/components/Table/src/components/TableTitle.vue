<template>
  <BasicTitle
    :class="prefixCls"
    v-if="title"
    :helpMessage="helpMessage">
    {{ title }}
  </BasicTitle>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BasicTitle } from '@/components/Basic'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicTableTitle',
  components: { BasicTitle },
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
    },
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
    },
  },
  setup() {
    const { prefixCls } = useDesign('basic-table-title')

    return { prefixCls }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table-title';

.#{$prefix-cls} {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
