export const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
];

export const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
};

export const optionListData = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' },
  { label: '选项6', value: '6', disabled: true },
  { label: '选项7', value: '7', disabled: true },
  { label: '选项8', value: '8' },
  { label: '选项9', value: '9' },
];

export const ApiDirData = [
  {
    label: '选项1',
    value: '1',
    options: [
      { label: '选项1-1', value: '1-1' },
      { label: '选项1-2', value: '1-2' },
    ],
  },
  {
    label: '选项2',
    value: '2',
    options: [
      { label: '选项2-1', value: '2-1' },
      { label: '选项1-2', value: '2-2' },
    ],
  },
  {
    label: '选项3',
    value: '3',
    options: [
      { label: '选项3-1', value: '3-1' },
      { label: '选项1-2', value: '3-2' },
    ],
  },
  {
    label: '选项4',
    value: '4',
    options: [
      { label: '选项4-1', value: '4-1' },
      { label: '选项4-2', value: '4-2' },
    ],
  },
  {
    label: '选项5',
    value: '5',
    disabled: true,
    options: [
      { label: '选项5-1', value: '5-1' },
      { label: '选项5-2', value: '5-2' },
    ],
  },
  {
    label: '选项6',
    value: '6',
    options: [{ label: '选项6-1', value: '6-1' }],
  },
];

export const ApiTreeData = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [{ value: 'xihu', label: '西湖畔', leaf: true }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [{ value: 'zhonghuamen', label: '中华门', leaf: true }],
      },
    ],
  },
];

export const basicDividerProps = {
  component: 'CustomDivider',
  colProps: {
    span: 24,
    xl: 24,
  },
  componentProps: {
    // text: '输入框操作', // 和 label 二者写法兼容
    class: 'my-4',
    borderColor: 'var(--primary-color)',
    textColor: 'var(--primary-color)',
    textSize: 16,
  },
};
