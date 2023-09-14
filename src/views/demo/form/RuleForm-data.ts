import { BasicFormSchema } from '@/components/BasicForm';

function isAccountExist(value) {
  return new Promise<void>((resolve, reject) => {
    if (value === 'admin') {
      return reject({
        code: 0,
        data: null,
        message: '不能填写为admin',
      });
    }

    return resolve(null);
  });
}

export const basicSchemas: BasicFormSchema[] = [
  {
    field: 'field1',
    component: 'ElInput',
    label: '字段1',
    required: true,
  },

  {
    field: 'field2',
    component: 'ElInput',
    label: '字段2',
    rules: [
      {
        required: true,
        message: '覆盖默认生成的校验信息',
        type: 'string',
      },
    ],
  },
  {
    field: 'field3',
    component: 'CustomDatePicker',
    label: '字段3',
    required: true,
  },
  {
    field: 'field4',
    component: 'CustomDatePicker',
    label: '字段4',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'field5',
    component: 'CustomSelect',
    label: '字段5',
    required: true,
    changeEvent: 'blur',
    componentProps: {
      multiple: true,
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field6',
    component: 'ElInput',
    label: '字段6',
    rules: [
      {
        required: true,
        validator: (_, value, callback) => {
          if (!value) {
            callback(new Error('值不能为空'));
          }
          if (value === '1') {
            callback(new Error('值不能为1'));
          }
          return callback();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'field7',
    component: 'CustomCheckbox',
    defaultValue: [],
    label: '字段7',
    required: true,
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field8',
    component: 'CustomRadio',
    label: '字段8',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'field9',
    component: 'ElInput',
    label: '字段9',
    helpMessage: ['本字段演示异步验证', '本地规则：必须填写', '后端规则：不能包含admin'],
    rules: [
      {
        required: true,
        message: '内容不能为空',
      },
      {
        validator(_, value, callback) {
          isAccountExist(value)
            .then(() => callback())
            .catch((err) => {
              callback(new Error(err.message || '验证失败'));
            });
        },
      },
    ],
  },
];
