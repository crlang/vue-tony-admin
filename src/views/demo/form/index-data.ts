import { ApiDemoColorList, ApiDemoDataList, ApiDemoDataMpList, ApiDemoTreeDataList, ApiDemoTreeDataMpList } from '@/api/demo';
import { BasicFormSchema } from '@/components/BasicForm';
import { getRangeDate } from '@/utils/dateUtil';
import { ApiDirData, ApiTreeData, basicDividerProps, optionListData } from './formdata';

export const basicSchemas: BasicFormSchema[] = [
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
      api: ApiDemoDataList,
      resultField: 'data',
      labelField: 'title',
      valueField: 'id',
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
    // defaultValue: ['2', '3'],
    componentProps: {
      multiple: true,
      resultField: 'data',
      api: ApiDemoDataList,
      labelField: 'title',
      valueField: 'id',
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
      api: ApiDemoDataList,
      labelField: 'title',
      valueField: 'id',
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
      remoteParamsKey: 'keyname',
      api: ApiDemoDataMpList,
      labelField: 'title',
      valueField: 'id',
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
      api: ApiDemoDataList,
      resultField: 'data',
      labelField: 'title',
      valueField: 'id',
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
    // defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      remote: true,
      // 直接传参
      api: ApiDemoTreeDataList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id',
      lazyValueKey: 'label', // 传递给服务器的参数key内容来源
    },
  },
  {
    field: 'cascader004',
    component: 'CustomCascader',
    label: '远程级联',
    subLabel: '(2)',
    // defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      remote: true,
      // 其它附加参数
      params: {
        exp: 1,
        pex: 1,
      },
      // 多个参数同时传参
      api: ApiDemoTreeDataMpList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id',
      lazyParamsKey: 'keyname', // 传递给服务器的内容的参数key
      lazyValueKey: 'label', // 传递给服务器的参数key内容来源
    },
  },
  {
    field: 'cascader005',
    component: 'CustomCascader',
    label: '远程级联搜索',
    // defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      lazy: true,
      lazyParamsKey: 'keyname', // 传递给服务器的内容的参数key
      lazyValueKey: 'label', // 传递给服务器的参数key内容来源
      // 多个参数同时传参
      api: ApiDemoTreeDataList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'cascader006',
    component: 'CustomCascader',
    label: '远程级联搜索',
    subLabel: '(2)',
    // defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      lazy: true,
      lazyParamsKey: 'keyname', // 传递给服务器的内容的参数key
      lazyValueKey: 'label', // 传递给服务器的参数key内容来源
      // 其它附加参数
      params: {
        aac: 1,
        hhv: 1,
      },
      // 多个参数同时传参
      api: ApiDemoTreeDataMpList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'cascader007',
    component: 'CustomCascader',
    label: '级联面板',
    subLabel: '(远程)',
    // defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
    componentProps: {
      remote: true,
      isPanel: true,
      api: ApiDemoTreeDataList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id',
      lazyValueKey: 'label', // 传递给服务器的参数key内容来源
    },
  },
  {
    field: 'cascader008',
    component: 'CustomCascader',
    label: '级联面板',
    subLabel: '(远程2)',
    // defaultValue: ['jiangsu', 'nanjing', 'zhonghuamen'],
    componentProps: {
      remote: true,
      isPanel: true,
      params: {
        apv: 1,
        cca: 1,
      },
      // 多个参数同时传参
      api: ApiDemoTreeDataMpList,
      resultField: 'data',
      labelField: 'name',
      valueField: 'id',
      lazyParamsKey: 'keyname', // 传递给服务器的内容的参数key
      lazyValueKey: 'label', // 传递给服务器的参数key内容来源
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
    // defaultValue: 'zhonghuamen',
    componentProps: {
      remote: true,
      defaultExpandAll: true,
      api: ApiDemoTreeDataList,
      resultField: 'data',
      nodeKey: 'id',
      props: {
        label: 'name',
        value: 'id',
      },
    },
  },
  {
    field: 'treeselect004',
    component: 'CustomTreeSelect',
    label: '树形下拉框',
    subLabel: '(远程多选)',
    // defaultValue: ['xihu', 'zhonghuamen'],
    componentProps: {
      remote: true,
      multiple: true,
      defaultExpandAll: true,
      api: ApiDemoTreeDataList,
      resultField: 'data',
      nodeKey: 'id',
      props: {
        label: 'name',
        value: 'id',
      },
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
      api: ApiDemoColorList,
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
  //     api: ApiDemoTreeDataList,
  //     resultField: 'data',
  //     defaultExpandAll: true,
  //   },
  // },
];
