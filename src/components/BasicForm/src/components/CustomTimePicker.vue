<template>
  <ElTimePicker v-bind="getBindValues" v-model:modelValue="state" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElTimePicker } from 'element-plus'

import { useRuleFormItem } from '@/hooks/component/useFormItem'

export default defineComponent({
  name: 'CustomTimePicker',
  components: { ElTimePicker },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Date, Array],
    },
  },
  emits: ['change'],
  setup(props, { attrs }) {
    const [state] = useRuleFormItem(props)

    /**
     * 绑定Props
     *
     * Bind props
     */
    const getBindValues = computed(() => {
      const opts = {
        clearable: true,
        ...attrs,
      }

      return opts
    })

    return { getBindValues, state }
  },
})
</script>
