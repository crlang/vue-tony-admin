import { BasicFormSchema } from '@/components/BasicForm';
import { citiesOptionsData, provincesOptions, basicDividerProps } from './formdata';

export const basicSchemas: BasicFormSchema[] = [
  {
    field: 'divider-p2c',
    label: '省份与城市联动',
    ...basicDividerProps,
  },
  {
    field: 'province01',
    component: 'CustomSelect',
    label: '省份',
    componentProps: ({ formModel, formAction }) => {
      return {
        options: provincesOptions,
        placeholder: '',
        onChange: (e: any) => {
          let citiesOptions = [];
          if (e && e >= 1 && provincesOptions[e - 1]) {
            citiesOptions = citiesOptionsData[provincesOptions[e - 1].id];
          }
          console.log('citiesOptions', citiesOptions);
          formModel.city = undefined; //  reset city value
          const { updateSchema } = formAction;
          updateSchema({
            field: 'city01',
            componentProps: {
              options: citiesOptions,
            },
          });
        },
      };
    },
  },
  {
    field: 'city01',
    component: 'CustomSelect',
    label: '城市',
    componentProps: {
      options: [],
    },
  },
  {
    field: 'divider-clash',
    label: '菜单项内容互斥',
    ...basicDividerProps,
    helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
  },
  {
    field: 'clash01',
    component: 'CustomSelect',
    label: '下拉选项A',
    subLabel: '(互斥B)',
    slot: 'clashA',
    // defaultValue: [],
  },
  {
    field: 'clash02',
    component: 'CustomSelect',
    label: '下拉选项B',
    subLabel: '(互斥A)',
    slot: 'clashB',
    // defaultValue: [],
  },
  {
    field: 'divider-css',
    label: '菜单项CSS控制显示/隐藏',
    ...basicDividerProps,
    helpMessage: ['通过CSS控制', '注意：校验规则会校验被隐藏的菜单项'],
  },
  {
    field: 'css01',
    component: 'ElSwitch',
    label: '是否显示用户名',
    subLabel: '(CSS控制)',
    defaultValue: true,
  },
  {
    field: 'css02',
    component: 'ElInput',
    label: '用户名',
    // 隐藏了，仍会校验
    required: true,
    show: ({ values }) => {
      return !!values.css01;
    },
  },
  {
    field: 'divider-dom',
    label: '菜单项JS控制显示/隐藏',
    ...basicDividerProps,
    helpMessage: ['通过JS控制', '注意：校验规则不会校验被隐藏的菜单项'],
  },
  {
    field: 'dom01',
    component: 'ElSwitch',
    label: '是否显示密码',
    subLabel: '(DOM控制)',
  },
  {
    field: 'dom02',
    component: 'ElInput',
    label: '密码',
    required: true,
    // 隐藏了，不会校验
    ifShow: ({ values }) => {
      return !!values.dom01;
    },
  },
  {
    field: 'divider-dync-rule',
    label: '菜单项动态校验',
    ...basicDividerProps,
    helpMessage: ['通过菜单项联动控制的动态校验规则'],
  },
  {
    field: 'rule01',
    component: 'ElSwitch',
    label: '喜好必填',
    subLabel: '(dynamicRules 控制)',
  },
  {
    field: 'rule02',
    component: 'CustomSelect',
    label: '喜好',
    dynamicRules: ({ values }) => {
      return values.rule01 ? [{ required: true, message: '请选择喜好' }] : [];
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'required01',
    component: 'ElSwitch',
    label: '爱好必填',
    subLabel: '(required 控制)',
  },
  {
    field: 'required02',
    component: 'CustomSelect',
    label: '爱好',
    required: ({ values }) => {
      return values.required01 === true;
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'divider-dync-disabled',
    label: '菜单项动态禁用',
    ...basicDividerProps,
    helpMessage: ['通过菜单项联动控制的禁用'],
  },
  {
    field: 'disabled01',
    component: 'ElSwitch',
    label: '是否禁用日期',
  },
  {
    field: 'disabled02',
    component: 'CustomDatePicker',
    label: '日期',
    dynamicDisabled: ({ values }) => {
      return values.disabled01 === true;
    },
  },
  {
    field: 'divider-sync-input',
    label: '内容输入同步',
    ...basicDividerProps,
  },
  {
    field: 'input01',
    component: 'ElInput',
    label: '密码',
    subLabel: '(输入同步)',
    componentProps: ({ formModel }) => {
      return {
        onInput: (e: any) => {
          formModel.input02 = e;
        },
      };
    },
  },
  {
    field: 'input02',
    component: 'ElInput',
    label: '重复密码',
    componentProps: { disabled: true },
  },
  {
    field: 'divider-dync-validate',
    label: '输入同步校验',
    ...basicDividerProps,
    helpMessage: ['内容输入同步校验所有菜单'],
  },
  {
    field: 'validate01',
    component: 'ElInput',
    label: '输入并校验',
    componentProps: ({ formAction }) => {
      return {
        onChange: async() => {
          const { validate } = formAction;
          await validate();
        },
      };
    },
  },
];
