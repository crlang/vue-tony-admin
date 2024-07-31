<template>
  <ElDatePicker v-model:modelValue="state" clearable />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDatePicker } from 'element-plus'

import { useRuleFormItem } from '@/hooks/component/useFormItem'

export default defineComponent({
  name: 'DatePicker',
  components: { ElDatePicker },
  props: {
    modelValue: [Array, Object, String],
  },
  emits: ['change'],
  setup(props) {
    const [state] = useRuleFormItem(props)

    return { state }
  },
})
</script>
