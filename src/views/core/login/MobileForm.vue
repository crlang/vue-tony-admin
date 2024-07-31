<template>
  <BasicForm @register="registerForm" @submit="handleLogin">
    <template #sms="{ model, field }">
      <CountdownInput
        v-model="model[field]"
        :send-code-api="ApiSMSCode"
        placeholder="短信验证码"
        @keypress.enter="handleLogin(null)"
      />
    </template>
    <template #agreement="{ model, field }">
      <div :class="`${prefixCls}--line`">
        <ElCheckbox v-model="model[field]">
          请阅读并同意《服务条款》
        </ElCheckbox>
      </div>
    </template>
  </BasicForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCheckbox } from 'element-plus'

import { mobileFormSchema } from './data'
import { CountdownInput } from '@/components/CountdownInput'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/BasicForm'

import { ApiSMSCode } from '@/api/basic'

export default defineComponent({
  components: { ElCheckbox, BasicForm, CountdownInput },
  props: {
    prefixCls: String,
  },
  setup(props) {
    const { createMessage } = useMessage()

    const [registerForm, { getFieldsValue, validate }] = useForm({
      labelWidth: 0,
      schemas: mobileFormSchema,
      showActionButtonGroup: true,
      hideRequiredAsterisk: true,
      showResetButton: false,
      submitButtonOptions: {
        btnText: '登录',
        class: `${props.prefixCls}--submit`,
      },
      colProps: {
        span: 24,
      },
      actionColProps: {
        span: 24,
      },
    })

    async function handleLogin(values) {
      if (!values) {
        values = getFieldsValue()
        await validate()
      }

      try {
        createMessage.success({ message: '登录成功' })
      }
      catch (error: any) {
        createMessage.error({ message: error.message || '网络异常，请检查您的网络连接是否正常' })
      }
    }

    return {
      BasicForm,
      registerForm,
      handleLogin,
      ApiSMSCode,
    }
  },
})
</script>
