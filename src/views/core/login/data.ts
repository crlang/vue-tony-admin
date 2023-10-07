import { ref, computed } from 'vue';
import { BasicFormSchema } from '@/components/BasicForm';

const validateMobile = (_rule, value, callback) => {
  const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
  if (!reg.test(value)) {
    return callback(new Error('手机号码格式不正确'));
  }
  return callback();
};

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

export const loginFormSchema: BasicFormSchema[] = [
  {
    label: '',
    field: 'username',
    component: 'ElInput',
    componentProps: {
      placeholder: '账号',
    },
    rules: [{ required: true, message: '请输入账号' }],
  },
  {
    label: '',
    field: 'password',
    component: 'ElInput',
    componentProps: {
      showPassword: true,
      placeholder: '密码',
    },
    rules: [{ required: true, message: '请输入密码' }],
  },
  {
    label: '',
    field: 'icv',
    component: 'ElInput',
    show: false,
  },
  {
    label: '',
    field: 'imgCode',
    component: 'ElInput',
    slot: 'imgCode',
    rules: [{ required: true, message: '请输入图形验证码' }],
    itemProps: {
      class: 'mb-2',
    },
  },
  {
    label: '',
    field: 'rememberMe',
    component: 'CustomCheckbox',
    slot: 'rememberMe',
    itemProps: {
      class: 'mb-3',
    },
  },
];

export const mobileFormSchema: BasicFormSchema[] = [
  {
    label: '',
    field: 'mobile',
    component: 'ElInput',
    componentProps: {
      placeholder: '手机号',
    },
    rules: [
      { required: true, message: '请输入手机号' },
      { validator: validateMobile, trigger: 'blur' },
    ],
  },
  {
    label: '',
    field: 'sms',
    component: 'ElInput',
    slot: 'sms',
    rules: [{ required: true, message: '请输入短信验证码' }],
    itemProps: {
      class: 'mb-2',
    },
  },
  {
    label: '',
    field: 'agreement',
    component: 'CustomCheckbox',
    slot: 'agreement',
    rules: [{ required: true, message: '请阅读并同意后勾选' }],
  },
];

export const registerFormSchema: BasicFormSchema[] = [
  {
    label: '',
    field: 'username',
    component: 'ElInput',
    componentProps: {
      placeholder: '账号',
    },
    rules: [{ required: true, message: '请输入账号' }],
  },
  {
    label: '',
    field: 'mobile',
    component: 'ElInput',
    componentProps: {
      placeholder: '手机号',
    },
    rules: [
      { required: true, message: '请输入手机号' },
      { validator: validateMobile, trigger: 'blur' },
    ],
  },
  {
    label: '',
    field: 'sms',
    component: 'ElInput',
    slot: 'sms',
    rules: [{ required: true, message: '请输入短信验证码' }],
  },
  {
    label: '',
    field: 'password',
    component: 'ElInput',
    slot: 'password',
    rules: [{ required: true, message: '请输入密码' }],
  },
  {
    label: '',
    field: 'repassword',
    component: 'ElInput',
    componentProps: {
      placeholder: '确认输入密码',
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_rule, value) => {
            if (!value) {
              return Promise.reject('请确认输入密码');
            }
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
    itemProps: {
      class: 'mb-2',
    },
  },
  {
    label: '',
    field: 'agreement',
    component: 'CustomCheckbox',
    slot: 'agreement',
    rules: [{ required: true, message: '请阅读并同意后勾选' }],
  },
];

export const forgetpwdFormSchema: BasicFormSchema[] = [
  {
    label: '',
    field: 'username',
    component: 'ElInput',
    componentProps: {
      placeholder: '账号',
    },
    rules: [{ required: true, message: '请输入账号' }],
  },
  {
    label: '',
    field: 'mobile',
    component: 'ElInput',
    componentProps: {
      placeholder: '手机号',
    },
    rules: [
      { required: true, message: '请输入手机号' },
      { validator: validateMobile, trigger: 'blur' },
    ],
  },
  {
    label: '',
    field: 'sms',
    component: 'ElInput',
    slot: 'sms',
    rules: [{ required: true, message: '请输入短信验证码' }],
  },
  {
    label: '',
    field: 'password',
    component: 'ElInput',
    slot: 'password',
    rules: [{ required: true, message: '请输入密码' }],
  },
  {
    label: '',
    field: 'repassword',
    component: 'ElInput',
    componentProps: {
      placeholder: '确认输入密码',
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_rule, value) => {
            if (!value) {
              return Promise.reject('请确认输入密码');
            }
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
