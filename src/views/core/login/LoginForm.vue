<template>
  <BasicForm @register="registerForm" @submit="handleLogin">
    <template #imgCode="{ model, field }">
      <el-input
        v-model="model[field]"
        placeholder="图形验证码"
        :class="`${prefixCls}--verifyimg`"
        @keypress.enter="handleLogin(null)">
        <template #append>
          <el-image :src="base64CodeImg" @click="getCodeImg()" />
        </template>
      </el-input>
    </template>
    <template #rememberMe="{ model, field }">
      <div :class="`${prefixCls}--line`">
        <el-checkbox v-model="model[field]">记住我</el-checkbox>
        <span @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">忘记密码?</span>
      </div>
    </template>
  </BasicForm>

  <div :class="`${prefixCls}--reg`">
    没有账号？
    <span @click="setLoginState(LoginStateEnum.REGISTER)">注册</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ElCheckbox, ElInput, ElImage } from 'element-plus';

import { useMessage } from '@/hooks/web/useMessage';
import { useUserStore } from '@/store/modules/user';

import { BasicForm, useForm } from '@/components/BasicForm';
import { ApiVerifyCodeImg } from '@/api/basic';

import { loginFormSchema, LoginStateEnum, useLoginState } from './data';

export default defineComponent({
  components: { ElCheckbox, ElInput, ElImage, BasicForm },
  props: {
    prefixCls: String,
  },
  setup(props) {
    const { createMessage } = useMessage();
    const userStore = useUserStore();
    const { setLoginState } = useLoginState();

    const formRef = ref();
    const base64CodeImg = ref('');

    const [registerForm, { setFieldsValue, getFieldsValue, validate }] = useForm({
      labelWidth: 0,
      schemas: loginFormSchema,
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
    });

    function getCodeImg() {
      ApiVerifyCodeImg()
        .then((res) => {
          console.log('rrrrrrrr', res);
          setFieldsValue({
            icv: res.icv,
          });
          base64CodeImg.value = res.base64;
        })
        .catch(() => {});
    }

    async function handleLogin(values) {
      if (!values) {
        values = getFieldsValue();
        await validate();
      }

      try {
        const userInfo = await userStore.login(values);
        if (userInfo) {
          createMessage.success({ message: '登录成功' });
        }
      } catch (error: any) {
        createMessage.error({ message: error.message || '网络异常，请检查您的网络连接是否正常' });
      }
    }

    onMounted(() => {
      getCodeImg();
    });

    return {
      formRef,
      base64CodeImg,
      getCodeImg,
      handleLogin,
      registerForm,

      LoginStateEnum,
      setLoginState,
    };
  },
});
</script>
