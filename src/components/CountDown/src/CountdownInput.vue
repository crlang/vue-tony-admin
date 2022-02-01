<template>
  <ElInput
    v-bind="$attrs"
    :class="prefixCls"
    v-model="state">
    <template #append>
      <CountButton
        :count="count"
        :value="state"
        :beforeStartFunc="sendCodeApi" />
    </template>
  </ElInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElInput } from 'element-plus'
import CountButton from './CountButton.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useRuleFormItem } from '@/hooks/component/useFormItem'

const props = {
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
}

export default defineComponent({
  name: 'CountDownInput',
  components: { ElInput, CountButton },
  inheritAttrs: false,
  props,
  setup(props) {
    const { prefixCls } = useDesign('countdown-input')
    const [state] = useRuleFormItem(props)

    return { prefixCls, state }
  },
})
</script>
