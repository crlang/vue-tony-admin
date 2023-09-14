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
    component: 'ElInput',
    label: '字段3',
  },
  {
    field: 'field4',
    component: 'ElInput',
    label: '字段4',
  },
  {
    field: 'field5',
    component: 'ElInput',
    label: '字段5',
  },
];

export const exSchemas: BasicFormSchema[] = [];

for (let i = 1; i < 30; i++) {
  exSchemas.push({
    field: `fieldx${i}`,
    component: 'ElInput',
    label: `更多字段${i}`,
  });
}
