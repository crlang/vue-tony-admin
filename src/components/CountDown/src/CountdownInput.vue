<template>
  <el-input
    v-bind="$attrs"
    :class="prefixCls"
    :size="size"
    v-model:modelValue="state">
    <template #append>
      <CountButton
        :size="size"
        :count="count"
        :value="state"
        :beforeStartFunc="sendCodeApi" />
    </template>
    <template
      #[item]="data"
      v-for="item in Object.keys($slots).filter((k) => k !== 'append')">
      <slot
        :name="item"
        v-bind="data || {}"></slot>
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CountButton from './CountButton.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useRuleFormItem } from '@/hooks/component/useFormItem'

const props = {
  modelValue: { type: String },
  size: { type: String, validator: (v:string) => ['large', 'default', 'small', ''].includes(v) },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
}

export default defineComponent({
  name: 'CountDownInput',
  components: { CountButton },
  inheritAttrs: false,
  props,
  setup(props) {
    const { prefixCls } = useDesign('countdown-input')
    const [state] = useRuleFormItem(props)

    return { prefixCls, state }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-countdown-input';

.#{$prefix-cls} {
  position: relative;
}
</style>
