import { h } from 'vue';
import { ElTag } from 'element-plus';

import { SvgIcon } from '@/components/SvgIcon';
import { BasicColumn } from '@/components/BasicTable';
import { BasicFormSchema } from '@/components/BasicForm';

import { ApiMenuTreeList } from '@/api/menu';

export const columns: BasicColumn[] = [
  {
    label: '菜单名称',
    prop: 'name',
  },
  {
    label: '菜单标题',
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
    label: '访问路径',
    prop: 'path',
  },
  {
    label: '上级菜单',
    prop: 'parentTitle',
  },
  {
    label: '激活菜单',
    prop: 'currentActiveMenu',
  },
  {
    label: '重定向',
    prop: 'redirect',
  },
  {
    label: '权限',
    prop: 'roles',
  },
  {
    label: '组件',
    prop: 'component',
  },
  {
    label: '排序',
    prop: 'orderNo',
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
    label: '创建时间',
    prop: 'createTime',
  },
];

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'keyname',
    label: '菜单名称',
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
    label: '上级菜单',
    component: 'CustomTreeSelect',
    required: true,
    defaultValue: 0,
    componentProps: {
      remote: true,
      api: ApiMenuTreeList,
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
    label: '菜单名称',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'title',
    label: '菜单标题',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'redirect',
    label: '重定向',
    component: 'ElInput',
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'ElInputNumber',
    defaultValue: 0,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'ElInput',
  },
  {
    field: 'roles',
    label: '权限标识',
    component: 'ElInput',
    componentProps: {
      placeholder: '多个权限请用英文逗号(,)分隔',
    },
  },
  {
    field: 'currentActiveMenu',
    label: '激活菜单',
    component: 'ElInput',
    componentProps: {
      placeholder: '指定激活菜单项高亮 ',
    },
  },
  {
    field: 'ignoreKeepAlive',
    label: '是否缓存',
    component: 'CustomRadio',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '缓存', value: 0 },
        { label: '不缓存', value: 1 },
      ],
    },
  },
  {
    field: 'hideMenu',
    label: '是否隐藏',
    component: 'CustomRadio',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '显示', value: 0 },
        { label: '隐藏', value: 1 },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'CustomRadio',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
];
