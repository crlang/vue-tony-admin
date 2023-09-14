import { h } from 'vue';
import { ElSwitch } from 'element-plus';

import { BasicColumn } from '@/components/BasicTable';
import { BasicFormSchema } from '@/components/BasicForm';

import { ApiRoleEdit } from '@/api/role';

export const columns: BasicColumn[] = [
  {
    label: '角色ID',
    prop: 'id',
  },
  {
    label: '角色名称',
    prop: 'name',
  },
  {
    label: '排序',
    prop: 'sort',
  },
  {
    label: '状态',
    prop: 'status',
    customRender: ({ record, scope }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        scope.row.pendingStatus = false;
      }
      return h(ElSwitch, {
        modelValue: record?.status === 0,
        activeText: '启用',
        inactiveText: '禁用',
        inlinePrompt: true,
        loading: record?.pendingStatus,
        onChange(checked: boolean) {
          scope.row.pendingStatus = true;
          const newStatus = checked ? 0 : 1;
          ApiRoleEdit({ id: record.id, status: newStatus })
            .then(() => {
              scope.row.status = newStatus;
            })
            .finally(() => {
              scope.row.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    label: '描述',
    prop: 'description',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
];

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'keyname',
    label: '角色名称',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'CustomSelect',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: BasicFormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'ElInput',
  },
  {
    field: 'status',
    label: '状态',
    component: 'CustomRadio',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
  },
  {
    label: '排序',
    field: 'sort',
    required: true,
    component: 'ElInput',
    componentProps: {
      type: 'number',
    },
  },
  {
    label: '描述',
    field: 'description',
    component: 'ElInput',
    componentProps: {
      type: 'textarea',
      rows: 6,
    },
  },
];
