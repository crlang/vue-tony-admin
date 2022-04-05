
<template>
  <div :class="prefixCls">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="getHtmlData"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import showdown from 'showdown'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  props: {
    modelValue: { type: String },
  },
  setup(props) {
    const { prefixCls } = useDesign('markdown-view')
    const converter = new showdown.Converter()
    const getHtmlData = computed(() => converter.makeHtml(props.modelValue || ''))

    converter.setOption('tables', true)

    return {
      prefixCls,
      getHtmlData,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-markdown-view';

.#{$prefix-cls} {
  width: 100%;
}
</style>
