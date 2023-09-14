import { ApiDepartmentTreeList } from '@/api/department';
import { ApiRoleList } from '@/api/role';
import { DescItem } from '@/components/BasicDescription';
import { BasicFormSchema } from '@/components/BasicForm';
import { BasicColumn } from '@/components/BasicTable';

export const columns: BasicColumn[] = [
  {
    label: '用户名',
    prop: 'username',
  },
  {
    label: '昵称',
    prop: 'nickname',
  },
  {
    label: '邮箱',
    prop: 'email',
  },
  {
    label: '手机号',
    prop: 'mobile',
  },
  {
    label: '角色',
    prop: 'roles',
  },
  {
    label: '部门',
    prop: 'group',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
];

export const searchFormSchema: BasicFormSchema[] = [
  {
    field: 'keyname',
    label: '昵称',
    component: 'ElInput',
  },
];

export const accountFormSchema: BasicFormSchema[] = [
  {
    label: '头像',
    field: 'avatar',
    component: 'ElInput',
    slot: 'avatar',
  },
  {
    field: 'username',
    label: '登录名',
    component: 'ElInput',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'ElInput',
    // required: true,
    componentProps: {
      showPassword: true,
      placeholder: '编辑时，为空则不修改密码',
    },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'ElInput',
  },
  {
    field: 'roles',
    label: '角色',
    component: 'CustomSelect',
    required: true,
    defaultValue: '',
    componentProps: {
      labelField: 'name',
      valueField: 'id',
      api: ApiRoleList,
    },
  },
  {
    field: 'group',
    label: '所在部门',
    component: 'CustomTreeSelect',
    required: true,
    defaultValue: '',
    componentProps: {
      remote: true,
      nodeKey: 'id',
      props: {
        label: 'title',
        value: 'id',
      },
      defaultExpandAll: true,
      api: ApiDepartmentTreeList,
    },
  },
  {
    field: 'email',
    label: '联系邮箱',
    component: 'ElInput',
  },
  {
    label: '手机号',
    field: 'mobile',
    component: 'ElInput',
    required: true,
  },
  {
    label: '排序',
    field: 'sort',
    component: 'ElInputNumber',
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

export const accountDescSchema: DescItem[] = [
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'nickname',
    label: '昵称',
  },
  {
    field: 'avatar',
    label: '头像',
  },
  {
    field: 'email',
    label: '邮箱地址',
  },
  {
    field: 'emailBind',
    label: '邮箱地址认证',
  },
  {
    field: 'mobile',
    label: '手机号码',
  },
  {
    field: 'mobileBind',
    label: '手机号码认证',
  },
  {
    field: 'money',
    label: '余额',
  },
  {
    field: 'score',
    label: '积分',
  },
  {
    field: 'roles',
    label: '角色',
  },
  {
    field: 'group',
    label: '部门',
  },
  {
    field: 'registerTime',
    label: '注册时间',
  },
  {
    field: 'registerIp',
    label: '注册IP',
  },
  {
    field: 'loginTime',
    label: '登录时间',
  },
  {
    field: 'loginIp',
    label: '登录IP',
  },
  {
    field: 'homePath',
    label: '登录后的首页',
  },
  {
    field: 'sort',
    label: '排序',
  },
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'expireTime',
    label: '禁用到期时间',
  },
  {
    field: 'createTime',
    label: '创建时间',
  },
  {
    field: 'updateTime',
    label: '更新时间',
  },
];

export const accountLogTableSchema: BasicColumn[] = [
  {
    label: '日志ID',
    prop: 'id',
    width: 120,
  },
  {
    label: '请求地址',
    prop: 'url',
  },
  {
    label: '请求参数',
    prop: 'vars',
  },
  {
    label: 'IP',
    prop: 'ip',
    width: 120,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '应用名',
    prop: 'appName',
    width: 180,
  },
  {
    label: '控制器名',
    prop: 'controllerName',
    width: 180,
  },
  {
    label: '方法名',
    prop: 'methodName',
    width: 180,
  },
  {
    label: '用户代理',
    prop: 'userAgent',
  },
];
