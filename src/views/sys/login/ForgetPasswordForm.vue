<template>
  <el-form :model="formData" :rules="getFormRules" ref="formRef">
    <el-form-item prop="username">
      <el-input v-model="formData.username" placeholder="账号" />
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model="formData.mobile" placeholder="手机号码" />
    </el-form-item>
    <el-form-item prop="sms">
      <CountdownInput v-model="formData.sms" placeholder="短信验证码" @keypress.enter="handleReset" />
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
    <el-form-item class="enter-x">
      <el-button
        type="primary"
        class="login--submit"
        @click="handleReset"
        :loading="loading">重置</el-button>
      <el-button class="login--back" @click="handleBackLogin">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

import { CountdownInput } from '@/components/CountdownInput';
import { useMessage } from '@/hooks/web/useMessage';
import { StrengthMeter } from '@/components/StrengthMeter';

import { useLoginState, useFormRules, useFormValid } from './useLogin';

export default defineComponent({
  components: { ElForm, ElFormItem, ElInput, ElButton, CountdownInput, StrengthMeter },
  setup() {
    const { handleBackLogin } = useLoginState();
    const { getFormRules } = useFormRules();

    const formRef = ref();
    const loading = ref(false);
    const { validForm } = useFormValid(formRef);
    const { createNotification } = useMessage();

    const formData = reactive({
      username: '',
      mobile: '',
      sms: '',
      password: '',
      confirmPassword: '',
    });

    async function handleReset() {
      const vf = await validForm();
      if (!vf) return;

      try {
        loading.value = true;
        createNotification({
          title: '操作成功',
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
      handleReset,
      loading,
      handleBackLogin,
    };
  },
});
</script>
