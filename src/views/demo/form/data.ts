import { BasicFormSchema } from '@/components/BasicForm';
import { getRangeDate } from '@/utils/dateUtil';
import { logWarn } from '@/utils/log';
import { cloneDeep } from 'lodash-es';
// import dayjs from 'dayjs';

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

const optionListData = [
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

const ApiDirData = [
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

const ApiTreeData = [
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

const basicDividerProps = {
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

export const basicSchemas: BasicFormSchema[] | undefined = [
  {
    field: 'divider-input',
    label: 'Input表单项', // 二者写法兼容
    ...basicDividerProps,
  },
  {
    field: 'input001',
    component: 'ElInput',
    label: '限制长度',
    subLabel: '(必填)',
    defaultValue: '11111', // 测试
    rules: [{ min: 5, max: 10 }],
    componentProps: () => {
      return {
        placeholder: '长度限制5-10',
        onChange: () => {
          // do something
        },
      };
    },
  },
  {
    field: 'input002',
    component: 'ElInput',
    label: '带前后缀',
    componentProps: {
      onChange: () => {
        // do something
      },
    },
    renderComponentContent: () => {
      return {
        prefix: () => '第',
        suffix: () => '天',
      };
    },
  },
  {
    field: 'input003',
    component: 'ElInput',
    label: '带前后侧',
    componentProps: {
      onChange: () => {
        // do something
      },
    },
    renderComponentContent: () => {
      return {
        prepend: () => '第',
        append: () => '天',
      };
    },
  },
  {
    field: 'input004',
    component: 'ElInput',
    label: '数值输入',
    defaultValue: '10', // 测试
    rules: [{ min: 10 }],
    componentProps: {
      type: 'number',
      placeholder: '填写大于10的数字',
    },
  },
  {
    field: 'input005',
    component: 'ElInput',
    label: '多行输入',
    componentProps: {
      type: 'textarea',
      rows: 6,
    },
  },
  {
    field: 'input006',
    component: 'ElInputNumber',
    label: 'InputNumber数字输入',
  },
  {
    field: 'divider-checkbox',
    label: 'Checkbox表单项',
    ...basicDividerProps,
  },
  {
    field: 'checkbox001',
    component: 'CustomCheckbox',
    label: '单个选择',
    subLabel: '(选填)',
    componentProps: {
      group: false,
      label: '勾选即代表同意用户协议',
      checkboxProps: {
        trueLabel: 1,
        falseLabel: 0,
      },
    },
  },
  {
    field: 'checkbox002',
    component: 'CustomCheckbox',
    label: '限制选择',
    subLabel: '(必填)',
    rules: [{ min: 2, max: 4 }],
    defaultValue: ['2', '3', '4'], // 测试
    componentProps: {
      type: 'checkbox', // 默认
      group: true, // 默认
      options: [...optionListData],
    },
  },
  {
    field: 'checkbox003',
    component: 'CustomCheckbox',
    label: '按钮样式',
    componentProps: {
      type: 'button',
      options: [...optionListData],
    },
  },
  {
    field: 'checkbox004',
    component: 'CustomCheckbox',
    label: '标签样式',
    componentProps: {
      group: false,
      type: 'tag',
      label: '点击我切换状态',
    },
  },
  {
    field: 'checkbox005',
    component: 'CustomCheckbox',
    label: '单个禁用',
    componentProps: {
      group: false,
      disabled: true,
      label: '已禁用，无法选择',
      checkboxProps: {
        trueLabel: 1,
        falseLabel: 0,
      },
    },
  },
  {
    field: 'checkbox006',
    component: 'CustomCheckbox',
    label: '远程示例',
    componentProps: {
      api: getMockApiData,
      resultField: 'data',
    },
  },
  {
    field: 'divider-select',
    label: 'Select表单项',
    ...basicDividerProps,
  },
  {
    field: 'select001',
    component: 'CustomSelect',
    label: '常规列表',
    defaultValue: '2',
    componentProps: {
      options: [...optionListData],
    },
  },
  {
    field: 'select002',
    component: 'CustomSelect',
    label: '多选列表',
    defaultValue: ['2', '4'],
    componentProps: {
      multiple: true,
      options: [...optionListData],
    },
  },
  {
    field: 'select003',
    component: 'CustomSelect',
    label: '分组列表',
    defaultValue: '2-1',
    componentProps: {
      groupOption: true,
      options: [...ApiDirData],
    },
  },
  {
    field: 'select004',
    component: 'CustomSelect',
    label: '远程多选',
    defaultValue: ['2', '3'],
    componentProps: {
      multiple: true,
      resultField: 'data',
      api: getMockApiData,
    },
  },
  {
    field: 'select005',
    component: 'CustomSelect',
    label: '远程搜索',
    componentProps: {
      multiple: true,
      filterable: true,
      remote: true,
      resultField: 'data',
      // 直接传参
      api: getMockApiData,
    },
  },
  {
    field: 'select006',
    component: 'CustomSelect',
    label: '远程搜索',
    subLabel: '(2)',
    componentProps: {
      multiple: true,
      filterable: true,
      remote: true,
      resultField: 'data',
      // 其它附加参数
      params: {
        abc: 1,
        bbc: 2,
      },
      // 多个参数同时传参
      remoteParamsKey: 'query',
      api: getMockApiData2,
    },
  },
  {
    field: 'divider-radio',
    label: 'Radio表单项',
    ...basicDividerProps,
  },
  {
    field: 'radio001',
    component: 'CustomRadio',
    label: '单个选择',
    subLabel: '(选填)',
    defaultValue: 'false',
    componentProps: {
      group: false,
      label: '点击选择即代表同意用户协议',
      radioProps: {
        trueLabel: 'true',
        falseLabel: 'false',
      },
    },
  },
  {
    field: 'radio002',
    component: 'CustomRadio',
    label: '限制选择',
    subLabel: '(必填)',
    defaultValue: '2', // 测试
    componentProps: {
      type: 'checkbox', // 默认
      group: true, // 默认
      options: [...optionListData],
    },
  },
  {
    field: 'radio003',
    component: 'CustomRadio',
    label: '按钮样式',
    defaultValue: '7', // 测试
    componentProps: {
      type: 'button',
      options: [...optionListData],
    },
  },
  {
    field: 'radio004',
    component: 'CustomRadio',
    label: '单个禁用',
    componentProps: {
      group: false,
      disabled: true,
      label: '已禁用，无法选择',
      radioProps: {
        trueLabel: 'true',
        falseLabel: 'false',
      },
    },
  },
  {
    field: 'radio005',
    component: 'CustomRadio',
    label: '远程示例',
    componentProps: {
      api: getMockApiData,
      resultField: 'data',
    },
  },
  {
    field: 'divider-cascader',
    label: 'Cascader表单项',
    ...basicDividerProps,
  },
  {
    field: 'cascader001',
    component: 'CustomCascader',
    label: '常规级联',
    defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      options: [...ApiTreeData],
    },
  },
  {
    field: 'cascader002',
    component: 'CustomCascader',
    label: '级联面板',
    defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      isPanel: true,
      options: [...ApiTreeData],
    },
  },
  {
    field: 'cascader003',
    component: 'CustomCascader',
    label: '远程级联',
    defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      remote: true,
      // 直接传参
      api: getMockApiTreeData,
      resultField: 'data',
      lazyValueKey: 'label', // 参数值Key
    },
  },
  {
    field: 'cascader004',
    component: 'CustomCascader',
    label: '远程级联',
    subLabel: '(2)',
    defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      remote: true,
      // 其它附加参数
      params: {
        exp: 1,
        pex: 1,
      },
      // 多个参数同时传参
      api: getMockApiTreeData2,
      resultField: 'data',
      lazyValueKey: 'label', // 参数值Key
    },
  },
  {
    field: 'cascader005',
    component: 'CustomCascader',
    label: '远程级联搜索',
    defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      lazy: true,
      lazyValueKey: 'label', // 参数值Key，参数值来源于接口数据中的某个字段
      // 多个参数同时传参
      api: getMockApiTreeLazyData,
      resultField: 'data',
    },
  },
  {
    field: 'cascader006',
    component: 'CustomCascader',
    label: '远程级联搜索',
    subLabel: '(2)',
    defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      lazy: true,
      // 其它附加参数
      params: {
        aac: 1,
        hhv: 1,
      },
      lazyParamsKey: 'name', // 参数Key
      lazyValueKey: 'label', // 参数值Key，参数值来源于接口数据中的某个字段
      // 多个参数同时传参
      api: getMockApiTreeLazyData2,
      resultField: 'data',
    },
  },
  {
    field: 'cascader007',
    component: 'CustomCascader',
    label: '级联面板',
    subLabel: '(远程)',
    defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      remote: true,
      isPanel: true,
      api: getMockApiTreeData,
      resultField: 'data',
      lazyValueKey: 'label', // 参数值Key
    },
  },
  {
    field: 'cascader008',
    component: 'CustomCascader',
    label: '级联面板',
    subLabel: '(远程2)',
    defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      remote: true,
      isPanel: true,
      params: {
        apv: 1,
        cca: 1,
      },
      api: getMockApiTreeData2,
      resultField: 'data',
      lazyValueKey: 'label', // 参数值Key
    },
  },
  {
    field: 'cascader009',
    component: 'CustomCascader',
    label: '远程级联搜索',
    subLabel: '(面板)',
    defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      lazy: true,
      isPanel: true,
      lazyValueKey: 'label', // 参数值Key，参数值来源于接口数据中的某个字段
      // 多个参数同时传参
      api: getMockApiTreeLazyData,
      resultField: 'data',
    },
  },
  {
    field: 'cascader010',
    component: 'CustomCascader',
    label: '远程级联搜索',
    subLabel: '(面板2)',
    defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      lazy: true,
      isPanel: true,
      // 其它附加参数
      params: {
        aac: 1,
        hhv: 1,
      },
      lazyParamsKey: 'name', // 参数Key
      lazyValueKey: 'label', // 参数值Key，参数值来源于接口数据中的某个字段
      // 多个参数同时传参
      api: getMockApiTreeLazyData2,
      resultField: 'data',
    },
  },
  {
    field: 'divider-tree-select',
    label: 'TreeSelect表单项',
    ...basicDividerProps,
  },
  {
    field: 'treeselect001',
    component: 'CustomTreeSelect',
    label: '树形下拉框',
    defaultValue: 'zhonghuamen',
    componentProps: {
      defaultExpandAll: true,
      options: [...ApiTreeData],
    },
  },
  {
    field: 'treeselect002',
    component: 'CustomTreeSelect',
    label: '树形下拉框',
    subLabel: '(多选)',
    defaultValue: ['xihu'],
    componentProps: {
      showCheckbox: true,
      multiple: true,
      defaultExpandAll: true,
      options: [...ApiTreeData],
    },
  },
  {
    field: 'treeselect003',
    component: 'CustomTreeSelect',
    label: '树形下拉框',
    subLabel: '(远程)',
    defaultValue: 'zhonghuamen',
    componentProps: {
      remote: true,
      defaultExpandAll: true,
      api: getMockApiTreeData,
      resultField: 'data',
    },
  },
  {
    field: 'treeselect004',
    component: 'CustomTreeSelect',
    label: '树形下拉框',
    subLabel: '(远程多选)',
    defaultValue: ['xihu', 'zhonghuamen'],
    componentProps: {
      remote: true,
      nodeKey: 'value',
      multiple: true,
      defaultExpandAll: true,
      api: getMockApiTreeData,
      resultField: 'data',
    },
  },
  {
    field: 'divider-date-picker',
    label: 'DatePicker表单项',
    ...basicDividerProps,
  },
  {
    field: 'datepicker001',
    component: 'CustomDatePicker',
    label: '日期选择器',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker002',
    component: 'CustomDatePicker',
    label: '日期选择器（周）',
    componentProps: {
      type: 'week',
      format: '[第] ww [周]',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker003',
    component: 'CustomDatePicker',
    label: '日期选择器（月）',
    componentProps: {
      type: 'month',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker004',
    component: 'CustomDatePicker',
    label: '日期选择器（年）',
    componentProps: {
      type: 'year',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker005',
    component: 'CustomDatePicker',
    label: '日期选择器（单点、多选）',
    componentProps: {
      type: 'dates',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker006',
    component: 'CustomDatePicker',
    label: '日期选择器（快捷选择）',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: '今日',
          value: new Date(),
        },
        {
          text: '昨日',
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: '一周前',
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
    },
  },
  {
    field: 'datepicker007',
    component: 'CustomDatePicker',
    label: '日期范围选择器',
    componentProps: {
      type: 'daterange',
      rangeSeparator: ' - ',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker008',
    component: 'CustomDatePicker',
    label: '日期范围选择器（月）',
    componentProps: {
      type: 'monthrange',
      rangeSeparator: ' - ',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker009',
    component: 'CustomDatePicker',
    label: '日期范围选择器（快捷选择）',
    componentProps: {
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
      rangeSeparator: ' - ',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      // disabledDate: (time: Date) => {
      //   return time.getTime() > Date.now();
      // },
      shortcuts: [
        {
          text: '昨日',
          value: () => {
            const { start, end } = getRangeDate('yesterday');
            return [start, end];
          },
        },
        {
          text: '本周',
          value: () => {
            const { start, end } = getRangeDate('week');
            return [start, end];
          },
        },
        {
          text: '上周',
          value: () => {
            const { start, end } = getRangeDate('lastweek');
            return [start, end];
          },
        },
        {
          text: '本月',
          value: () => {
            const { start, end } = getRangeDate('month');
            return [start, end];
          },
        },
        {
          text: '上月',
          value: () => {
            const { start, end } = getRangeDate('lastmonth');
            return [start, end];
          },
        },
        {
          text: '近3天',
          value: () => {
            const { start, end } = getRangeDate(3);
            return [start, end];
          },
        },
        {
          text: '近7天',
          value: () => {
            const { start, end } = getRangeDate(7);
            return [start, end];
          },
        },
        {
          text: '近30天',
          value: () => {
            const { start, end } = getRangeDate(30);
            return [start, end];
          },
        },
        {
          text: '近90天',
          value: () => {
            const { start, end } = getRangeDate(90);
            return [start, end];
          },
        },
        {
          text: '本季度',
          value: () => {
            const { start, end } = getRangeDate('quarter');
            return [start, end];
          },
        },
        {
          text: '上季度',
          value: () => {
            const { start, end } = getRangeDate('lastquarter');
            return [start, end];
          },
        },
        {
          text: '今年',
          value: () => {
            const { start, end } = getRangeDate('year');
            return [start, end];
          },
        },
        {
          text: '上年',
          value: () => {
            const { start, end } = getRangeDate('lastyear');
            return [start, end];
          },
        },
      ],
    },
  },
  {
    field: 'datepicker010',
    component: 'CustomDatePicker',
    label: '日期时间选择器',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'datepicker011',
    component: 'CustomDatePicker',
    label: '日期时间范围选择器',
    componentProps: {
      type: 'datetimerange',
      rangeSeparator: ' - ',
      startPlaceholder: '开始日期时间',
      endPlaceholder: '结束日期时间',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'divider-color-picker',
    label: 'ColorPicker表单项',
    ...basicDividerProps,
  },
  {
    field: 'colorpicker001',
    component: 'CustomColorPicker',
    label: '颜色选择器',
  },
  {
    field: 'colorpicker002',
    component: 'CustomColorPicker',
    label: '预设颜色选择器',
    componentProps: {
      options: ['#0081FF', '#0074e6', '#ff8a48', '#ff3d57'],
      resultField: 'data',
    },
  },
  {
    field: 'colorpicker003',
    component: 'CustomColorPicker',
    label: '预设颜色选择器(远程)',
    componentProps: {
      api: getMockApiData3,
      resultField: 'data',
    },
  },
  {
    field: 'divider-switch',
    label: 'Switch表单项',
    ...basicDividerProps,
  },
  {
    field: 'switch001',
    component: 'ElSwitch',
    label: 'Switch切换',
    componentProps: {
      activeValue: 1,
      inactiveValue: 0,
    },
  },
  {
    field: 'switch002',
    component: 'ElSwitch',
    label: '文字切换',
    defaultValue: 1,
    componentProps: {
      activeValue: 1,
      inactiveValue: 0,
      activeText: '开启',
      inactiveText: '关闭',
    },
  },
  {
    field: 'switch003',
    component: 'ElSwitch',
    label: '内嵌文字切换',
    defaultValue: 1,
    componentProps: {
      inlinePrompt: true,
      activeValue: 1,
      inactiveValue: 0,
      activeText: '开启',
      inactiveText: '关闭',
    },
  },
  {
    field: 'divider-autocomplete',
    label: 'Autocomplete表单项',
    ...basicDividerProps,
  },
  {
    field: 'autocomplete001',
    component: 'CustomAutocomplete',
    label: '输入自动完成',
    changeEvent: 'change',
    componentProps: {
      fetchSuggestions: (queryString: string, cb: any) => {
        const restaurants = [
          { value: 'vue', link: 'vuejs/vue' },
          { value: 'element', link: 'ElemeFE/element' },
          { value: 'cooking', link: 'ElemeFE/cooking' },
          { value: 'mint-ui', link: 'ElemeFE/mint-ui' },
          { value: 'vuex', link: 'vuejs/vuex' },
          { value: 'vue-router', link: 'vuejs/vue-router' },
          { value: 'babel', link: 'babel/babel' },
        ];
        const createFilter = (queryString: string) => {
          return (restaurant) => {
            return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
          };
        };

        const results = queryString ? restaurants.filter(createFilter(queryString)) : restaurants;
        cb(results);
      },
      triggerOnFocus: false,
      clearable: true,
    },
  },
  {
    field: 'divider-rate',
    label: 'Rate表单项',
    ...basicDividerProps,
  },
  {
    field: 'rate001',
    component: 'ElRate',
    label: '星级评价',
    defaultValue: 1,
  },
  {
    field: 'divider-slide',
    label: 'Slide表单项',
    ...basicDividerProps,
  },
  {
    field: 'slide001',
    component: 'ElSlider',
    label: '项目进度',
    defaultValue: 3,
  },
  {
    field: 'slide002',
    component: 'ElSlider',
    label: '离散进度',
    defaultValue: 20,
    componentProps: {
      step: 10,
      showStops: true,
    },
  },
  {
    field: 'slide003',
    component: 'ElSlider',
    label: '带输入框进度',
    componentProps: {
      showInput: true,
    },
  },
  // todo 功能未完善
  // {
  //   field: 'divider-tree',
  //   label: 'Tree表单项',
  //   ...basicDividerProps,
  // },
  // {
  //   field: 'tree001',
  //   component: 'CustomTree',
  //   label: '树结构',
  //   componentProps: {
  //     api: getMockApiTreeData,
  //     resultField: 'data',
  //     defaultExpandAll: true,
  //   },
  // },
];

const treeDatabase = flatten(cloneDeep(ApiTreeData));

function flatten(arr) {
  const result = [];
  const flattenNext = (data) => {
    for (let i = 0; i < data.length; i++) {
      const k = data[i];
      if (k?.children?.length) {
        flattenNext(k?.children);
      }
      result.push(k);
    }
  };

  flattenNext(arr);

  // result.forEach(k => {
  //   delete k.children;
  // });

  return result;
}

function getMockApiData(keyword = '') {
  // logWarn('看控制台打印数据，接口已得到所需搜索词(apidata)', keyword);
  return new Promise<void>((resolve, reject) => {
    const list = cloneDeep(optionListData);

    try {
      const res = {
        code: 0,
        msg: 'Success',
        data: keyword ? list.filter((k) => k.label.indexOf(keyword) > -1) : list,
      };
      setTimeout(() => {
        return resolve(res);
      }, 600);
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * 远程搜索二维参数模拟
 * @param params
 */
function getMockApiData2(params) {
  // logWarn('看控制台打印数据，接口已得到所需全部参数(apidata)', params);
  return getMockApiData(params?.query || '');
}

function getMockApiData3() {
  // logWarn('看控制台打印数据，接口已得到所需搜索词(apidata)', keyword);
  return new Promise<void>((resolve, reject) => {
    try {
      const res = {
        code: 0,
        msg: 'Success',
        data: ['#0081FF', '#0074e6', '#ff8a48', '#ff3d57'],
      };
      setTimeout(() => {
        return resolve(res);
      }, 600);
    } catch (error) {
      return reject(error);
    }
  });
}

function getMockApiTreeData(keyword = '') {
  logWarn('看控制台打印数据，接口已得到所需搜索词(treedata)', keyword);
  return new Promise<void>((resolve, reject) => {
    const list = cloneDeep(ApiTreeData);
    // const flatList = flatten(cloneDeep(ApiTreeData));

    // function flatten(arr) {
    //   const result = [];
    //   const flattenNext = (data) => {
    //     for (let i = 0; i < data.length; i++) {
    //       const k = data[i];
    //       if (k?.children?.length) {
    //         flattenNext(k?.children);
    //       }
    //       result.push(k);
    //     }
    //   };

    //   flattenNext(arr);

    //   // result.forEach(k => {
    //   //   delete k.children;
    //   // });

    //   return result;
    // }

    // let newList = [];

    // if (keyword === '') {
    //   newList = cloneDeep(list);
    // } else {
    //   const rs = flatList.filter(k => k.label.indexOf(keyword) > -1);
    //   if (rs?.length >= 1) {
    //     newList = rs[0].children;
    //   }
    // }

    // newList?.forEach(k => {
    //   delete k.children;
    // });

    try {
      const res = {
        code: 0,
        msg: 'Success',
        data: list,
      };
      setTimeout(() => {
        return resolve(res);
      }, 600);
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * 远程搜索二维参数模拟
 * @param params
 */
function getMockApiTreeData2(params) {
  logWarn('看控制台打印数据，接口已得到所需全部参数(treedata)', params);
  return getMockApiTreeData(params?.query || '');
}

function getMockApiTreeLazyData(keyword = '') {
  logWarn('看控制台打印数据，接口已得到所需搜索词(treedata)', keyword);
  return new Promise<void>((resolve, reject) => {
    const olist = cloneDeep(ApiTreeData);
    const list = cloneDeep(treeDatabase);
    let newList = [];

    if (keyword === '') {
      newList = olist;
    } else {
      const rs = list.filter((k) => k.label.indexOf(keyword) > -1);
      if (rs?.length >= 1) {
        newList = rs[0].children;
      }
    }

    newList?.forEach((k) => {
      delete k.children;
    });

    try {
      const res = {
        code: 0,
        msg: 'Success',
        data: newList,
      };
      setTimeout(() => {
        return resolve(res);
      }, 600);
    } catch (error) {
      return reject(error);
    }
  });
}

/**
 * 远程搜索二维参数模拟
 * @param params
 */
function getMockApiTreeLazyData2(params) {
  logWarn('看控制台打印数据，接口已得到所需全部参数(treedata)', params);
  return getMockApiTreeLazyData(params?.name || '');
}

export const UseSchemas: BasicFormSchema[] = [
  {
    field: 'field1',
    component: 'ElInput',
    label: '字段1',
    // colProps: {
    //   span: 24,
    // },
    componentProps: {
      placeholder: '自定义placeholder',
      onChange: () => {
        // do something
      },
    },
  },
  {
    field: 'field2',
    component: 'ElInput',
    label: '字段2',
    // colProps: {
    //   span: 24,
    // },
  },
  {
    field: 'field3',
    component: 'CustomDatePicker',
    label: '字段3',
    // colProps: {
    //   span: 8,
    // },
    componentProps: {
      type: 'date',
      // ,onChange: (e: any) => {
      // }
    },
  },
  {
    field: 'field4',
    component: 'CustomSelect',
    label: '字段4',
    // colProps: {
    //   span: 8,
    // },
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
    defaultValue: [],
    label: '字段5',
    // colProps: {
    //   span: 8,
    // },
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
    // colProps: {
    //   span: 8,
    // },
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

export const dyncSchemas: BasicFormSchema[] = [
  // {
  //   field: 'field5',
  //   component: 'ElSwitch',
  //   label: '是否显示字段1(css控制)',
  //   colProps: {
  //     span: 8,
  //   },
  //   labelWidth: 200,
  // },
  // {
  //   field: 'field1',
  //   component: 'ElInput',
  //   label: '字段1',
  //   colProps: {
  //     span: 8,
  //   },
  //   show: ({ values }) => {
  //     return !!values.field5;
  //   },
  // },
  // {
  //   field: 'field6',
  //   component: 'ElSwitch',
  //   label: '是否显示字段2(dom控制)',
  //   colProps: {
  //     span: 8,
  //   },
  //   labelWidth: 200,
  // },
  // {
  //   field: 'field2',
  //   component: 'ElInput',
  //   label: '字段2',
  //   colProps: {
  //     span: 8,
  //   },
  //   ifShow: ({ values }) => {
  //     return !!values.field6;
  //   },
  // },
  // {
  //   field: 'field3',
  //   component: 'CustomDatePicker',
  //   label: '字段3',
  //   colProps: {
  //     span: 8,
  //   },
  //   dynamicDisabled: ({ values }) => {
  //     return !!values.field7;
  //   },
  // },
  // {
  //   field: 'field4',
  //   component: 'CustomSelect',
  //   label: '字段4',
  //   colProps: {
  //     span: 8,
  //   },
  //   dynamicRules: ({ values }) => {
  //     return values.field8 ? [{ required: true, message: '字段4必填' }] : [];
  //   },
  //   componentProps: {
  //     options: [
  //       {
  //         label: '选项1',
  //         value: '1',
  //         key: '1',
  //       },
  //       {
  //         label: '选项2',
  //         value: '2',
  //         key: '2',
  //       },
  //     ],
  //   },
  // },
  // {
  //   field: 'field11',
  //   component: 'ElDatePicker',
  //   label: '字段11',
  //   colProps: {
  //     span: 8,
  //   },
  // },
  // {
  //   field: 'field7',
  //   component: 'ElSwitch',
  //   label: '是否禁用字段3',
  //   colProps: {
  //     span: 8,
  //   },
  //   labelWidth: 200,
  // },
  // {
  //   field: 'field8',
  //   component: 'ElSwitch',
  //   label: '字段4是否必填',
  //   colProps: {
  //     span: 8,
  //   },
  //   labelWidth: 200,
  // },
];

export const dyncSchemas1: BasicFormSchema[] = [
  // {
  //   field: 'f1',
  //   component: 'ElInput',
  //   label: 'F1',
  //   colProps: {
  //     span: 12,
  //   },
  //   labelWidth: 200,
  //   componentProps: ({ formModel }) => {
  //     return {
  //       placeholder: '同步f2的值为f1',
  //       onChange: (e: any) => {
  //         formModel.f2 = e;
  //       },
  //     };
  //   },
  // },
  // {
  //   field: 'f2',
  //   component: 'ElInput',
  //   label: 'F2',
  //   colProps: {
  //     span: 12,
  //   },
  //   labelWidth: 200,
  //   componentProps: { disabled: true },
  // },
  // {
  //   field: 'f3',
  //   component: 'ElInput',
  //   label: 'F3',
  //   colProps: {
  //     span: 12,
  //   },
  //   labelWidth: 200,
  //   componentProps: ({ formAction }) => {
  //     return {
  //       placeholder: '值改变时执行查询,查看控制台',
  //       onChange: async() => {
  //         const { validate } = formAction;
  //         await validate();
  //       },
  //     };
  //   },
  // },
];
