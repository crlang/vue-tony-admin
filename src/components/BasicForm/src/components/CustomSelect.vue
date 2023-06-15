<template>
  <ElSelect v-bind="getBindValues" v-model:modelValue="state">
    <ElOption
      v-for="item in getOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </ElSelect>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

import { useRuleFormItem } from '@/hooks/component/useFormItem'

type Option = {
  value: number
  label: string
  disabled?: boolean
  options?: Option[]
}

export default defineComponent({
  name: 'CustomSelect',
  components: { ElSelect, ElOption },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Array],
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

      return opts as any
    })

    const getOptions = computed(() => {
      let res: Option[] = []
      const values = getBindValues.value
      const items = values?.items || []
      if (Array.isArray(items) && items?.length) {
        res = items.map((k) => {
          return {
            value: k[values?.value || 'value'],
            label: k[values?.label || 'label'],
            disabled: k[values?.disabled || 'disabled'],
          }
        })
      }

      return res
    })

    return { getBindValues, getOptions, state }
  },
})
</script>
