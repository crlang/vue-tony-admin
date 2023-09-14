<template>
  <PageWrapper title="表单基础示例" contentFullHeight>
    <BasicForm
      :labelWidth="200"
      :schemas="basicSchemas"
      :colProps="{ span: 16, xl: 12 }"
      :actionColProps="{ span: 16 }"
      @submit="handleSubmit"
      @reset="handleReset" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { BasicForm } from '@/components/BasicForm';
import { useMessage } from '@/hooks/web/useMessage';
import { logLog } from '@/utils/log';

import { basicSchemas } from './index-data';

export default defineComponent({
  components: { BasicForm },
  setup() {
    const { createMessage } = useMessage();

    return {
      basicSchemas,
      handleReset: () => {},
      handleSubmit: (values) => {
        logLog(values);
        createMessage.success('提交成功，提交内容请查看控制台');
      },
    };
  },
});
</script>
