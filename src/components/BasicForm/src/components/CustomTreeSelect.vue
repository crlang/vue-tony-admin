<template>
  <ElTreeSelect v-bind="getBindValues" v-model:modelValue="state" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElTreeSelect } from 'element-plus'

import { useRuleFormItem } from '@/hooks/component/useFormItem'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'CustomTreeSelect',
  components: { ElTreeSelect },
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

      return omit(opts, ['items', 'itemsApi', 'apiRequestFn', 'apiResponseFn'])
    })

    return { getBindValues, state }
  },
})
</script>
