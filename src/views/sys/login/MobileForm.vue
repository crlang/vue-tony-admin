<template>
  <el-form
    v-if="getShow"
    :model="formData"
    :rules="getFormRules"
    ref="formRef">
    <el-form-item prop="mobile">
      <el-input
        v-model="formData.mobile"
        :placeholder="t('sys.login.mobile')" />
    </el-form-item>
    <el-form-item prop="sms">
      <countdown-input
        v-model="formData.sms"
        :placeholder="t('sys.login.smsCode')" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleLogin"
        :loading="loading"
        class="login--submit">{{ t('sys.login.loginButton') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { CountdownInput } from '@/components/CountDown'
import { useI18n } from '@/hooks/web/useI18n'
import { ElNotification } from 'element-plus'
import { useLoginState, LoginStateEnum, useFormValid, useFormRules } from './useLogin'

const { t } = useI18n()
const { getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)

const { getFormRules } = useFormRules()
const { validForm } = useFormValid(formRef)

const formData = reactive({
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    ElNotification({
      title: t('sys.login.loginSuccessTitle'),
      message: t('sys.login.loginSuccessDesc'),
      type: 'success',
    })
  } catch (error: any) {
    ElNotification({
      title: t('sys.api.errorTip'),
      message: error.message || t('sys.api.networkExceptionMsg'),
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
