<template>
  <el-form
    v-if="getShow"
    :model="formData"
    :rules="getFormRules"
    ref="formRef">
    <el-form-item prop="account">
      <el-input
        v-model="formData.account"
        :placeholder="t('sys.login.userName')" />
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input
        v-model="formData.mobile"
        :placeholder="t('sys.login.mobile')" />
    </el-form-item>
    <el-form-item prop="sms">
      <CountdownInput
        v-model="formData.sms"
        :placeholder="t('sys.login.smsCode')" />
    </el-form-item>
    <el-form-item prop="password">
      <StrengthMeter
        v-model="formData.password"
        :placeholder="t('sys.login.password')" />
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="formData.confirmPassword"
        :placeholder="t('sys.login.confirmPassword')"
        clearable
        show-password />
    </el-form-item>
    <el-form-item prop="policy">
      <el-checkbox
        v-model="formData.policy"
        :checked="formData.policy">{{ t('sys.login.policy') }}</el-checkbox>
    </el-form-item>
    <el-button
      type="primary"
      class="login--submit"
      @click="handleRegister"
      :loading="loading"
      :disabled="formData.policy===false">{{ t('sys.login.registerButton') }}</el-button>
    <el-button
      @click="handleBackLogin"
      class="login--back">{{ t('sys.login.backSignIn') }}</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import { StrengthMeter } from '@/components/StrengthMeter'
import { CountdownInput } from '@/components/CountDown'
import { useI18n } from '@/hooks/web/useI18n'
import { useLoginState, LoginStateEnum, useFormRules, useFormValid } from './useLogin'
import { ElNotification } from 'element-plus'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)
const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false,
})

const { getFormRules } = useFormRules(formData)
const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    ElNotification({
      title: t('sys.login.registerSuccessTitle'),
      message: t('sys.login.registerSuccessDesc'),
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
