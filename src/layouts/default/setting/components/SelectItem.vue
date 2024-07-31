<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <ElSelect
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      :disabled="disabled"
      size="small"
      @change="handleChange"
    >
      <ElOption
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { ElOption, ElSelect } from 'element-plus'

import { baseHandler } from '../handler'
import type { HandlerEnum } from '../enum'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'SelectItem',
  components: { ElSelect, ElOption },
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    def: {
      type: [String, Number] as PropType<string | number>,
    },
    initValue: {
      type: [String, Number] as PropType<string | number>,
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: () => [],
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-select-item')
    const getBindValue = computed(() => {
      return props.def ? { modelValue: props.def, defaultValue: props.initValue || props.def } : {}
    })

    function handleChange(v: any) {
      if (props.event) {
        baseHandler(props.event, v)
      }
    }
    return {
      prefixCls,
      handleChange,
      getBindValue,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-setting-select-item';

.#{$prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  color: var(--text-secondary-color);

  &-select {
    width: 126px;
  }
}
</style>
