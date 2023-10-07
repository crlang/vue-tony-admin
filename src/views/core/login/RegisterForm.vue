<template>
  <BasicForm @register="registerForm" @submit="handleRegister">
    <template #sms="{ model, field }">
      <CountdownInput v-model="model[field]" :sendCodeApi="ApiSMSCode" placeholder="短信验证码" />
    </template>
    <template #password="{ model, field }">
      <StrengthMeter v-model="model[field]" placeholder="密码" />
    </template>
    <template #agreement="{ model, field }">
      <div :class="`${prefixCls}--line`"><el-checkbox v-model="model[field]">请阅读并同意《服务条款》</el-checkbox></div>
    </template>
    <template #advanceBefore>
      <el-button type="info" @click="handleBackLogin" :class="`${prefixCls}--back`">返回</el-button>
    </template>
  </BasicForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElCheckbox, ElButton } from 'element-plus';

import { StrengthMeter } from '@/components/StrengthMeter';
import { CountdownInput } from '@/components/CountdownInput';
import { useMessage } from '@/hooks/web/useMessage';
import { BasicForm, useForm } from '@/components/BasicForm';

import { ApiSMSCode } from '@/api/basic';
import { registerFormSchema, useLoginState, LoginStateEnum } from './data';

export default defineComponent({
  components: { ElCheckbox, ElButton, StrengthMeter, CountdownInput, BasicForm },
  props: {
    prefixCls: String,
  },
  setup(props) {
    const { setLoginState } = useLoginState();

    const [registerForm, { getFieldsValue, validate }] = useForm({
      labelWidth: 0,
      schemas: registerFormSchema,
      showActionButtonGroup: true,
      hideRequiredAsterisk: true,
      showResetButton: false,
      submitButtonOptions: {
        btnText: '注册',
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

    async function handleRegister(values) {
      if (!values) {
        values = getFieldsValue();
        await validate();
      }

      try {
        createMessage.success({ message: '注册成功' });
      } catch (error: any) {
        createMessage.error({ message: error.message || '网络异常，请检查您的网络连接是否正常' });
      }
    }

    return {
      registerForm,
      handleRegister,
      ApiSMSCode,

      handleBackLogin,
    };
  },
});
</script>
