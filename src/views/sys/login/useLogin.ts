import { ref, computed, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n()

  const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')))
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')))
  const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')))

  const validatePolicy = (rule, value, callback) => {
    return callback(!value ? new Error(t('sys.login.policyPlaceholder')) : null)
  }

  const validateConfirmPassword = (rule, value, callback, diffField) => {
    const { t } = useI18n()
    if (!value) {
      return callback(new Error(t('sys.login.passwordPlaceholder')))
    } else {
      if (formData[diffField] === value) {
        callback()
      } else {
        return callback(new Error(t('sys.login.diffPwd')))
      }
    }
  }

  const validateMobile = (rule, value, callback) => {
    const { t } = useI18n()
    if (!value) {
      return callback(new Error(t('sys.login.mobilePlaceholder')))
    } else {
      const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error(t('sys.login.mobileError')))
      }
    }
  }

  const getFormRules = computed(() => {
    const accountFormRule = unref(getAccountFormRule)
    const passwordFormRule = unref(getPasswordFormRule)
    const smsFormRule = unref(getSmsFormRule)

    const mobileRule = {
      sms: smsFormRule,
      mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
    }
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [{ validator: (rule: any, value: any, callback: any) => validateConfirmPassword(rule, value, callback, 'password'), trigger: 'blur' }],
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          ...mobileRule,
        }

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          account: accountFormRule,
          ...mobileRule,
        }

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule

      // login form rules
      default:
        return {
          account: accountFormRule,
          password: passwordFormRule,
        }
    }
  })
  return { getFormRules }
}

function createRule(message: string, trigger = 'blur') {
  return [
    {
      required: true,
      message,
      trigger,
    },
  ]
}
