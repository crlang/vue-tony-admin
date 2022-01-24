<template>
  <ElTimePicker
    v-bind="$attrs"
    clearable
    v-model:modelValue="state"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTimePicker } from 'element-plus'
import { useRuleFormItem } from '@/hooks/component/useFormItem'

export default defineComponent({
  name: 'TimePicker',
  components: { ElTimePicker },
  inheritAttrs: false,
  props: {
    modelValue: [Array, Object, String],
  },
  emits: ['change'],
  setup(props) {
    // Embedded in the form, just use the hook binding to perform form verification
    const [state] = useRuleFormItem(props)

    return { state }
  },
})
</script>
