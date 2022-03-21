<template>
  <el-form
    v-show="getShow"
    :model="formData"
    :rules="getFormRules"
    ref="formRef">
    <el-form-item prop="account">
      <el-input
        v-model="formData.account"
        :placeholder="t('sys.login.userNameEg')" />
    </el-form-item>
    <el-form-item
      prop="password"
      class="mb-1">
      <el-input
        v-model="formData.password"
        :placeholder="t('sys.login.passwordEg')" />
    </el-form-item>
    <el-row class="mt-3">
      <el-col :span="12">
        <el-checkbox
          v-model="rememberMe"
          size="small">{{ t('sys.login.rememberMe') }}</el-checkbox>
      </el-col>
      <el-col
        :span="12"
        class="text-right">
        <el-button
          type="text"
          @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">{{ t('sys.login.forgetPassword') }}</el-button>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        class="login--submit"
        :loading="loading"
        @click="handleLogin">{{ t('sys.login.loginButton') }}</el-button>
    </el-form-item>
  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref, toRaw, unref, computed } from 'vue'
import { ElRow, ElCol, ElCheckbox, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useUserStore } from '@/store/modules/user'
import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'

const { t } = useI18n()
const { notification } = useMessage()
const userStore = useUserStore()
const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  account: '',
  password: '',
})
const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    const userInfo = await userStore.login(
      toRaw({
        password: formData.password,
        username: formData.account,
        mode: 'none',
      })
    )
    if (userInfo) {
      notification.success({
        title: t('sys.login.loginSuccessTitle'),
        message: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
        duration: 3000,
      })
    }
  } catch (error: any) {
    notification.error({
      title: t('sys.api.errorTip'),
      message: error.message || t('sys.api.networkExceptionMsg'),
    })
  } finally {
    loading.value = false
  }
}
</script>
