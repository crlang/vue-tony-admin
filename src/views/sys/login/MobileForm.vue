<template>
  <el-form :model="formData" :rules="getFormRules" ref="formRef">
    <el-form-item prop="mobile">
      <el-input v-model="formData.mobile" placeholder="手机号码" />
    </el-form-item>
    <el-form-item prop="sms">
      <countdown-input v-model="formData.sms" placeholder="短信验证码" @keypress.enter="handleLogin" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleLogin"
        :loading="loading"
        class="login--submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';

import { CountdownInput } from '@/components/CountdownInput';
import { useMessage } from '@/hooks/web/useMessage';

import { useFormValid, useFormRules } from './useLogin';

export default defineComponent({
  components: { ElButton, ElForm, ElFormItem, ElInput, CountdownInput },
  setup() {
    const formRef = ref();
    const loading = ref(false);

    const { createNotification } = useMessage();
    const { getFormRules } = useFormRules();
    const { validForm } = useFormValid(formRef);

    const formData = reactive({
      mobile: '',
      sms: '',
    });

    async function handleLogin() {
      const vf = await validForm();
      if (!vf) return;

      try {
        loading.value = true;
        createNotification({
          title: '登录成功',
          type: 'success',
          message: '欢迎回来',
          duration: 3000,
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
      handleLogin,
      loading,
    };
  },
});
</script>
