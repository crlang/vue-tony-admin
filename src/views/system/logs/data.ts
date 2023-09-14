import { BasicColumn } from '@/components/BasicTable';
import { BasicFormSchema } from '@/components/BasicForm';
import { h } from 'vue';
import { isDef } from '@/utils/is';

export const columns: BasicColumn[] = [
  {
    label: 'ID',
    prop: 'id',
    width: 80,
  },
  {
    label: '用户ID',
    prop: 'userid',
    width: 80,
  },
  {
    label: '用户账号',
    prop: 'username',
    width: 100,
  },
  {
    label: 'IP',
    prop: 'ip',
    width: 100,
    customRender: ({ record }) => {
      const hasTotal = isDef(record.total);
      return hasTotal ? h('div', [h('span', record.ip), h('span', `(${record.total || 0}次)`)]) : record.ip;
    },
  },
  {
    label: '请求地址',
    prop: 'url',
  },
  {
    label: '请求内容',
    prop: 'vars',
  },
  {
    label: '用户代理',
    prop: 'userAgent',
  },
  {
    label: '应用名称',
    prop: 'appName',
    width: 100,
  },
  {
    label: '控制器名称',
    prop: 'controlName',
    width: 100,
  },
  {
    label: '请求方式',
    prop: 'methodName',
    width: 100,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'ip',
    label: 'IP地址',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'rangeDate',
    label: '创建时间',
    component: 'CustomDatePicker',
    colProps: { span: 8 },
    componentProps: {
      type: 'datetimerange',
      rangeSeparator: '到',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    field: 'groupIp',
    label: 'IP分组',
    component: 'CustomSelect',
    componentProps: {
      options: [
        { label: '分组', value: 1 },
        { label: '不分组', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'userId',
    label: '用户ID',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'userName',
    label: '用户账号',
    component: 'ElInput',
    colProps: { span: 8 },
  },
  {
    field: 'appName',
    label: '应用名称',
    component: 'ElInput',
    colProps: { span: 8 },
  },
];
