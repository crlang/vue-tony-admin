import type { Ref } from 'vue';

import { ref, computed, unref } from 'vue';

/**
 * 表单类型
 */
export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
}

const currentState = ref(LoginStateEnum.LOGIN);

/**
 * 登录表单状态
 */
export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

/**
 * 表单验证
 * @param formRef
 */
export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;

    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

/**
 * 表单验证规则
 * @param formData
 */
export function useFormRules(formData?: Recordable) {
  const getUsernameFormRule = computed(() => createRule('请输入账号'));
  const getPasswordFormRule = computed(() => createRule('请输入密码'));
  const getSmsFormRule = computed(() => createRule('请输入验证码'));
  const getICVFormRule = computed(() => createRule('校验码无效'));
  const getImgCodeFormRule = computed(() => createRule('请输入图形验证码'));

  const validateConfirmPassword = (_, value, callback, diffField) => {
    if (!value) {
      return callback(new Error('请输入密码'));
    } else {
      if (formData && formData[diffField] === value) {
        callback();
      } else {
        return callback(new Error('两次输入密码不一致'));
      }
    }
  };

  const validateMobile = (_, value, callback) => {
    if (!value) {
      return callback(new Error('请输入手机号码'));
    } else {
      const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('手机号码不正确'));
      }
    }
  };

  const getFormRules = computed(() => {
    const usernameFormRule = unref(getUsernameFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const smsFormRule = unref(getSmsFormRule);
    const icvFormRule = unref(getICVFormRule);
    const imgCodeFormRule = unref(getImgCodeFormRule);

    const mobileRule = {
      sms: smsFormRule,
      mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
    };

    const dbPwdRule = {
      password: passwordFormRule,
      confirmPassword: [{ validator: (rule, value, callback) => validateConfirmPassword(rule, value, callback, 'password'), trigger: 'blur' }],
    };

    const imgCodeRule = {
      icv: icvFormRule,
      imgCode: imgCodeFormRule,
    };

    switch (unref(currentState)) {
      // 注册
      case LoginStateEnum.REGISTER:
        return {
          username: usernameFormRule,
          ...mobileRule,
          ...dbPwdRule,
          // ...imgCodeRule,
        };

      // 重置密码
      case LoginStateEnum.RESET_PASSWORD:
        return {
          username: usernameFormRule,
          ...mobileRule,
          ...dbPwdRule,
          // ...imgCodeRule,
        };

      // 手机号登录
      case LoginStateEnum.MOBILE:
        return {
          ...mobileRule,
          // ...imgCodeRule,
        };

      // 账号登录
      default:
        return {
          username: usernameFormRule,
          password: passwordFormRule,
          ...imgCodeRule,
        };
    }
  });
  return { getFormRules };
}

/**
 * 创建验证规则
 * @param message
 * @param trigger
 */
function createRule(message: string, trigger = 'blur') {
  return [
    {
      required: true,
      message,
      trigger,
    },
  ];
}
