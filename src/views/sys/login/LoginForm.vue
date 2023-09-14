<template>
  <el-form :model="formData" :rules="getFormRules" ref="formRef">
    <el-form-item prop="username">
      <el-input v-model="formData.username" placeholder="账号" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="formData.password" placeholder="密码" />
    </el-form-item>
    <el-form-item prop="imgCode" class="mb-1">
      <el-input type="hidden" v-model="formData.icv" />
      <el-input
        v-model="formData.imgCode"
        placeholder="图形验证码"
        class="login--verifyimg"
        @keypress.enter="handleLogin">
        <template #append>
          <el-image :src="base64CodeImg" @click="getCodeImg()" />
        </template>
      </el-input>
    </el-form-item>
    <el-row class="mt-3">
      <el-col :span="12">
        <el-checkbox v-model="rememberMe" size="small">记住我</el-checkbox>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button text @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">忘记密码?</el-button>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        class="login--submit"
        :loading="loading"
        @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { ElRow, ElCol, ElCheckbox, ElButton, ElForm, ElFormItem, ElInput, ElImage } from 'element-plus';

import { useMessage } from '@/hooks/web/useMessage';
import { useUserStore } from '@/store/modules/user';

import { ApiVerifyCodeImg } from '@/api/basic';

import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';

export default defineComponent({
  components: { ElRow, ElCol, ElCheckbox, ElButton, ElForm, ElFormItem, ElInput, ElImage },
  setup() {
    const { createNotification } = useMessage();
    const userStore = useUserStore();
    const { setLoginState } = useLoginState();
    const { getFormRules } = useFormRules();

    const formRef = ref();
    const loading = ref(false);
    const rememberMe = ref(false);
    const base64CodeImg = ref('');

    const formData = reactive({
      username: '',
      password: '',
      icv: '',
      imgCode: '',
    });
    const { validForm } = useFormValid(formRef);

    function getCodeImg() {
      ApiVerifyCodeImg()
        .then((res) => {
          formData.icv = res.icv;
          base64CodeImg.value = res.base64;
        })
        .catch(() => {});
    }

    async function handleLogin() {
      const vf = await validForm();
      if (!vf) return;

      try {
        loading.value = true;
        const userInfo = await userStore.login({
          username: formData.username,
          password: formData.password,
          icv: formData.icv,
          imgCode: formData.imgCode,
        });
        if (userInfo) {
          createNotification({
            title: '登录成功',
            type: 'success',
            message: `欢迎回来: ${userInfo.nickname}`,
            duration: 3000,
          });
        }
      } catch (error: any) {
        // createNotification({
        //   title: '错误提示',
        //   type: 'error',
        //   message: error.message || '网络异常，请检查您的网络连接是否正常',
        // });
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getCodeImg();
    });

    return {
      formRef,
      formData,
      getFormRules,
      rememberMe,
      base64CodeImg,
      getCodeImg,
      handleLogin,
      loading,

      LoginStateEnum,
      setLoginState,
    };
  },
});
</script>
