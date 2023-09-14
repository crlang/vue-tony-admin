<template>
  <PageWrapper title="表单校验示例">
    <div class="mb-4">
      <el-button @click="validateForm()">手动校验字段1、2</el-button>
      <el-button @click="validateFormAll()">手动校验表单</el-button>
      <el-button @click="resetValidate()">清空校验信息</el-button>
      <el-button @click="setFormValues()">设置表单值</el-button>
      <el-button @click="getFormValues()">获取表单值</el-button>
      <el-button @click="reset()">重置</el-button>
    </div>
    <BasicForm @register="register" @submit="handleSubmit" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

import { BasicForm, useForm } from '@/components/BasicForm';
import { useMessage } from '@/hooks/web/useMessage';
import { logError, logLog } from '@/utils/log';

import { basicSchemas } from './RuleForm-data';

export default defineComponent({
  components: { ElButton, BasicForm },
  setup() {
    const { createMessage } = useMessage();

    const [register, { validateField, validate, clearValidate, getFieldsValue, reset, setFieldsValue }] = useForm({
      labelWidth: 140,
      schemas: basicSchemas,
      actionColProps: {
        span: 24,
      },
    });

    async function validateForm() {
      try {
        await validateField(['field1', 'field2']);
      } catch (error) {
        logError('字段验证不通过', error);
      }
    }

    async function validateFormAll() {
      try {
        await validate();
      } catch (error) {
        logError('表单验证不通过', error);
      }
    }

    async function resetValidate() {
      clearValidate();
    }

    function getFormValues() {
      const values = getFieldsValue();
      logLog('提交内容', values);
      createMessage.success('提交成功');
    }

    function setFormValues() {
      setFieldsValue({
        field1: 123,
        field3: '2022-12-12',
        field4: '2022-12-12',
        field5: ['1', '2'],
        field6: '3',
        field7: '1',
      });
    }

    function handleSubmit(values) {
      logLog('提交内容', values);
      createMessage.success('提交成功');
    }

    return {
      register,
      handleSubmit,
      getFormValues,
      setFormValues,
      validateForm,
      validateFormAll,
      resetValidate,
      reset,
    };
  },
});
</script>
