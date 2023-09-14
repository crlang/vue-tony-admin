import { BasicFormSchema } from '@/components/BasicForm';

export const basicSchemas: BasicFormSchema[] = [
  {
    field: 'field1',
    component: 'ElInput',
    label: '字段1',
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: '字段2',
  },
  {
    field: 'field3',
    component: 'CustomDatePicker',
    label: '字段3',
    componentProps: {
      type: 'date',
    },
  },
  {
    field: 'field4',
    component: 'CustomSelect',
    label: '字段4',
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
    field: 'field5',
    component: 'CustomCheckbox',
    // defaultValue: [],
    label: '字段5',
    componentProps: {
      group: true,
      type: 'checkbox',
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
    field: 'field7',
    component: 'CustomRadio',
    label: '字段7',
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
];
