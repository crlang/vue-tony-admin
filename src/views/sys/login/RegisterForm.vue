<template>
  <el-form :model="formData" :rules="getFormRules" ref="formRef">
    <el-form-item prop="username">
      <el-input v-model="formData.username" placeholder="账号" />
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model="formData.mobile" placeholder="手机号码" />
    </el-form-item>
    <el-form-item prop="sms">
      <CountdownInput v-model="formData.sms" placeholder="短信验证码" />
    </el-form-item>
    <el-form-item prop="password">
      <StrengthMeter v-model="formData.password" placeholder="密码" />
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="formData.confirmPassword"
        type="password"
        placeholder="确认密码"
        clearable
        show-password />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="formData.policy" :checked="formData.policy">我同意xxx隐私政策</el-checkbox>
    </el-form-item>
    <el-button
      type="primary"
      class="login--submit"
      @click="handleRegister"
      :loading="loading"
      :disabled="formData.policy === false">注册</el-button>
    <el-button @click="handleBackLogin" class="login--back">返回</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElCheckbox, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';

import { StrengthMeter } from '@/components/StrengthMeter';
import { CountdownInput } from '@/components/CountdownInput';
import { useMessage } from '@/hooks/web/useMessage';

import { useLoginState, useFormRules, useFormValid } from './useLogin';

export default defineComponent({
  components: { ElCheckbox, ElButton, ElForm, ElFormItem, ElInput, StrengthMeter, CountdownInput },
  setup() {
    const { handleBackLogin } = useLoginState();

    const formRef = ref();
    const loading = ref(false);
    const formData = reactive({
      username: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      sms: '',
      policy: false,
    });

    const { getFormRules } = useFormRules(formData);
    const { validForm } = useFormValid(formRef);
    const { createNotification } = useMessage();

    async function handleRegister() {
      const vf = await validForm();
      if (!vf) return;

      try {
        loading.value = true;
        createNotification({
          title: '注册成功',
          message: '欢迎加入',
          type: 'success',
        });
      } catch (error: any) {
        createNotification({
          title: '错误提示',
          message: error.message || '网络异常，请检查您的网络连接是否正常',
          type: 'error',
        });
      } finally {
        loading.value = false;
      }
    }

    return {
      formRef,
      formData,
      getFormRules,
      handleRegister,
      loading,
      handleBackLogin,
    };
  },
});
</script>
