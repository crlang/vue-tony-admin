import { BasicFormSchema } from '@/components/BasicForm';

import { h } from 'vue';
import { ElInput } from 'element-plus';

export const basicSchemas: BasicFormSchema[] = [
  {
    field: 'field1',
    component: 'ElInput',
    label: 'render方式',
    colProps: {
      span: 8,
    },
    required: true,
    render: ({ model, field }) => {
      return h(ElInput, {
        placeholder: '请输入',
        modelValue: model[field],
        onInput: (v: any) => {
          model[field] = v;
        },
      });
    },
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: 'render组件slot',
    colProps: {
      span: 8,
    },
    required: true,
    renderComponentContent: () => {
      return {
        append: () => '自定义尾部',
      };
    },
  },
  {
    field: 'field3',
    component: 'ElInput',
    label: '验证码',
    slot: 'countdown',
    required: true,
  },
  {
    field: 'field4',
    component: 'ElInput',
    label: '自定义Slot',
    slot: 'field4',
    colProps: {
      span: 8,
    },
    required: true,
  },
];
