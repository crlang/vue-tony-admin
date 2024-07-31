<template>
  <BasicForm @register="registerForm" @submit="handleRegister">
    <template #sms="{ model, field }">
      <CountdownInput v-model="model[field]" :send-code-api="ApiSMSCode" placeholder="短信验证码" />
    </template>
    <template #password="{ model, field }">
      <StrengthMeter v-model="model[field]" placeholder="密码" />
    </template>
    <template #agreement="{ model, field }">
      <div :class="`${prefixCls}--line`">
        <ElCheckbox v-model="model[field]">
          请阅读并同意《服务条款》
        </ElCheckbox>
      </div>
    </template>
    <template #advanceBefore>
      <ElButton type="info" :class="`${prefixCls}--back`" @click="handleBackLogin">
        返回
      </ElButton>
    </template>
  </BasicForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton, ElCheckbox } from 'element-plus'

import { LoginStateEnum, registerFormSchema, useLoginState } from './data'
import { StrengthMeter } from '@/components/StrengthMeter'
import { CountdownInput } from '@/components/CountdownInput'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/BasicForm'

import { ApiSMSCode } from '@/api/basic'

export default defineComponent({
  components: { ElCheckbox, ElButton, StrengthMeter, CountdownInput, BasicForm },
  props: {
    prefixCls: String,
  },
  setup(props) {
    const { setLoginState } = useLoginState()

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
    })

    const { createMessage } = useMessage()

    function handleBackLogin() {
      setLoginState(LoginStateEnum.LOGIN)
    }

    async function handleRegister(values) {
      if (!values) {
        values = getFieldsValue()
        await validate()
      }

      try {
        createMessage.success({ message: '注册成功' })
      }
      catch (error: any) {
        createMessage.error({ message: error.message || '网络异常，请检查您的网络连接是否正常' })
      }
    }

    return {
      registerForm,
      handleRegister,
      ApiSMSCode,

      handleBackLogin,
    }
  },
})
</script>
