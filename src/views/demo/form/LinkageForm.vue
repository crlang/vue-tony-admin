<template>
  <PageWrapper title="表单联动示例" content-full-height>
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #clashA="{ model, field }">
        <ElSelect
          v-model:modelValue="model[field]"
          multiple
          clearable
          @change="valueSelectA = model[field]"
        >
          <ElOption
            v-for="item in optionsA"
            :key="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :value="item.value"
          />
        </ElSelect>
      </template>
      <template #clashB="{ model, field }">
        <ElSelect
          v-model:modelValue="model[field]"
          :options="optionsB"
          multiple
          clearable
          @change="valueSelectB = model[field]"
        >
          <ElOption
            v-for="item in optionsB"
            :key="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :value="item.value"
          />
        </ElSelect>
      </template>
    </BasicForm>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
import { cloneDeep } from 'lodash-es'

import { basicSchemas } from './LinkageForm-data'
import { optionListData } from './formdata'
import { BasicForm, useForm } from '@/components/BasicForm'
import { logLog } from '@/utils/log'
import { useMessage } from '@/hooks/web/useMessage'

import { optionsListApi } from '@/api/demo/select'

export default defineComponent({
  components: { ElSelect, ElOption, BasicForm },
  setup() {
    const { createMessage } = useMessage()
    const valueSelectA = ref<string[]>([])
    const valueSelectB = ref<string[]>([])

    const [register] = useForm({
      schemas: basicSchemas,
      labelWidth: 200,
      colProps: { span: 16, xl: 12 },
      actionColProps: { span: 16, xl: 12 },
    })

    const optionsA = computed(() => {
      return cloneDeep(unref(optionListData)).map((op) => {
        op.disabled = op.disabled || unref(valueSelectB).includes(op.value)
        return op
      })
    })

    const optionsB = computed(() => {
      return cloneDeep(unref(optionListData)).map((op) => {
        op.disabled = op.disabled || unref(valueSelectA).includes(op.value)
        return op
      })
    })

    return {
      register,
      basicSchemas,
      optionsListApi,
      optionsA,
      optionsB,
      valueSelectA,
      valueSelectB,
      handleReset: () => {},
      handleSubmit: (values) => {
        logLog(values)
        createMessage.success('提交成功，提交内容请查看控制台')
      },
    }
  },
})
</script>
