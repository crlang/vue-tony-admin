import { BasicFormSchema } from '@/components/BasicForm';

export const basicSchemas: BasicFormSchema[] = [
  {
    field: 'field001',
    component: 'ElInput',
    label: '字段1',
    required: true,
  },
  {
    field: 'field002',
    component: 'ElInput',
    label: '字段2',
    required: true,
  },
  {
    field: 'field003',
    component: 'ElInput',
    label: '字段3',
    required: true,
  },
  {
    field: 'add001',
    component: 'ElInput',
    label: ' ',
    defaultValue: 3,
    slot: 'add',
  },
];
