import { h } from 'vue';
import { ElTag } from 'element-plus';

import { SvgIcon } from '@/components/SvgIcon';
import { BasicColumn } from '@/components/BasicTable';
import { BasicFormSchema } from '@/components/BasicForm';

import { ApiDepartmentTreeList } from '@/api/department';

export const columns: BasicColumn[] = [
  {
    label: '部门ID',
    prop: 'id',
  },
  {
    label: '部门标识',
    prop: 'name',
  },
  {
    label: '部门名称',
    prop: 'title',
  },
  {
    label: '图标',
    prop: 'icon',
    customRender: ({ record }) => {
      return h(SvgIcon, { name: record.icon });
    },
  },
  {
    label: '上级部门',
    prop: 'parentTitle',
  },
  {
    label: '排序',
    prop: 'sort',
  },
  {
    label: '状态',
    prop: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'success' : 'danger';
      const text = enable ? '启用' : '停用';
      return h(ElTag, { type: color }, () => text);
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
    label: '部门名称',
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
    field: 'parentId',
    label: '上级部门',
    component: 'CustomTreeSelect',
    required: true,
    defaultValue: 0,
    componentProps: {
      remote: true,
      api: ApiDepartmentTreeList,
      // nodeKey: 'id',
      props: {
        label: 'title',
        value: 'id',
      },
      checkStrictly: true,
      defaultExpandAll: true,
    },
  },
  {
    field: 'name',
    label: '部门标识',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'title',
    label: '部门名称',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'ElInputNumber',
    defaultValue: 0,
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'ElInput',
  },
  {
    field: 'status',
    label: '状态',
    component: 'ElRadioButton',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    required: true,
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
