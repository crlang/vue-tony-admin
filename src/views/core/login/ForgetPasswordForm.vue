<template>
  <BasicForm @register="registerForm" @submit="handleSubmit">
    <template #sms="{ model, field }">
      <CountdownInput v-model="model[field]" :sendCodeApi="ApiSMSCode" placeholder="短信验证码" />
    </template>
    <template #password="{ model, field }">
      <StrengthMeter v-model="model[field]" placeholder="密码" />
    </template>
    <template #advanceBefore>
      <el-button type="info" @click="handleBackLogin" :class="`${prefixCls}--back`">返回</el-button>
    </template>
  </BasicForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

import { StrengthMeter } from '@/components/StrengthMeter';
import { CountdownInput } from '@/components/CountdownInput';
import { useMessage } from '@/hooks/web/useMessage';
import { BasicForm, useForm } from '@/components/BasicForm';

import { ApiSMSCode } from '@/api/basic';
import { forgetpwdFormSchema, useLoginState, LoginStateEnum } from './data';

export default defineComponent({
  components: { ElButton, StrengthMeter, CountdownInput, BasicForm },
  props: {
    prefixCls: String,
  },
  setup(props) {
    const { setLoginState } = useLoginState();

    const [registerForm, { getFieldsValue, validate }] = useForm({
      labelWidth: 0,
      schemas: forgetpwdFormSchema,
      showActionButtonGroup: true,
      hideRequiredAsterisk: true,
      showResetButton: false,
      submitButtonOptions: {
        btnText: '重置密码',
        class: `${props.prefixCls}--submit`,
      },
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 24,
      },
    });

    const { createMessage } = useMessage();

    function handleBackLogin() {
      setLoginState(LoginStateEnum.LOGIN);
    }

    async function handleSubmit(values) {
      if (!values) {
        values = getFieldsValue();
        await validate();
      }

      try {
        createMessage.success({ message: '重置成功' });
      } catch (error: any) {
        createMessage.error({ message: error.message || '网络异常，请检查您的网络连接是否正常' });
      }
    }

    return {
      registerForm,
      handleSubmit,
      ApiSMSCode,

      handleBackLogin,
    };
  },
});
</script>
