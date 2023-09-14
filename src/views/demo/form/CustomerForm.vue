<template>
  <PageWrapper title="自定义组件示例">
    <BasicForm @register="register" @submit="handleSubmit">
      <template #field4="{ model, field }">
        <el-input v-model:modelValue="model[field]" placeholder="自定义slot" />
      </template>
      <template #countdown="{ model, field }">
        <CountdownInput v-model:modelValue="model[field]" />
      </template>
    </BasicForm>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElInput } from 'element-plus';

import { useForm, BasicForm } from '@/components/BasicForm';
import { useMessage } from '@/hooks/web/useMessage';
import { CountdownInput } from '@/components/CountdownInput';
import { logLog } from '@/utils/log';

import { basicSchemas } from './CustomerForm-data';

export default defineComponent({
  components: { ElInput, BasicForm, CountdownInput },
  setup() {
    const { createMessage } = useMessage();

    const [register] = useForm({
      labelWidth: 120,
      schemas: basicSchemas,
      actionColProps: {
        span: 24,
      },
    });

    function handleSubmit(values) {
      logLog('提交内容', values);
      createMessage.success('提交成功');
    }

    return {
      register,
      handleSubmit,
    };
  },
});
</script>
