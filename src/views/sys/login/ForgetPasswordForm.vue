<template>
  <el-form
    :model="formData"
    :rules="getFormRules"
    v-if="getShow"
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
    <el-form-item class="enter-x">
      <el-button
        type="primary"
        class="login--submit"
        @click="handleReset"
        :loading="loading">
        {{ t('common.resetText') }}
      </el-button>
      <el-button
        class="login--back"
        @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { CountdownInput } from '@/components/CountDown'
import { useI18n } from '@/hooks/web/useI18n'
import { useLoginState, LoginStateEnum, useFormRules, useFormValid } from './useLogin'
import { ElNotification, ElForm } from 'element-plus'
type ElFormType = InstanceType<typeof ElForm>

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref<Nullable<ElFormType>>(null)
const loading = ref(false)
const { validForm } = useFormValid(formRef)

const formData = reactive({
  account: '',
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

async function handleReset() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    ElNotification({
      title: t('common.operationSucceededText'),
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
