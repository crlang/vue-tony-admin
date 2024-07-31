<template>
  <PageWrapper title="表单基础示例" content-full-height>
    <BasicForm
      :label-width="200"
      :schemas="basicSchemas"
      :col-props="{ span: 16, xl: 12 }"
      :action-col-props="{ span: 16 }"
      @submit="handleSubmit"
      @reset="handleReset"
    />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { basicSchemas } from './index-data'
import { BasicForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'
import { logLog } from '@/utils/log'

export default defineComponent({
  components: { BasicForm },
  setup() {
    const { createMessage } = useMessage()

    return {
      basicSchemas,
      handleReset: () => {},
      handleSubmit: (values) => {
        logLog(values)
        createMessage.success('提交成功，提交内容请查看控制台')
      },
    }
  },
})
</script>
