<template>
  <PageWrapper title="可折叠表单示例" description="超过 2 行自动收起，折叠时保留 2 行">
    <BasicForm @register="register" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { BasicForm, useForm } from '@/components/BasicForm';

import { basicSchemas, exSchemas } from './AdvancedForm-data';

export default defineComponent({
  components: { BasicForm },
  setup() {
    const [register] = useForm({
      schemas: [...basicSchemas, ...exSchemas],
      colProps: {
        span: 8,
      },
      actionColProps: {
        span: 8,
      },
      showAdvancedButton: true,
      alwaysShowLines: 2,
    });
    return {
      register,
    };
  },
});
</script>
