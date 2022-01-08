export interface ColEx {
  style?: any
  /**
   * raster number of cells to occupy, 0 corresponds to display: none
   * @default 24
   * @type number
   */
  span?: number

  /**
   * the number of cells to offset Col from the left
   * @default 0
   * @type number
   */
  offset?: number

  /**
   * the number of cells that raster is moved to the right
   * @default 0
   * @type number
   */
  push?: number

  /**
   * the number of cells that raster is moved to the left
   * @default 0
   * @type number
   */
  pull?: number

  /**
   * Custom element labels
   * @default 'div'
   * @type string
   */
  tag?: string

  /**
   * <768px and also default setting, could be a span value or an object containing above props
   * @type { span: number, offset: number } | number
   */
  xs?: { span: number; offset: number } | number

  /**
   * ≥768px, could be a span value or an object containing above props
   * @type { span: number, offset: number } | number
   */
  sm?: { span: number; offset: number } | number

  /**
   * ≥992px, could be a span value or an object containing above props
   * @type { span: number, offset: number } | number
   */
  md?: { span: number; offset: number } | number

  /**
   * ≥1200px, could be a span value or an object containing above props
   * @type { span: number, offset: number } | number
   */
  lg?: { span: number; offset: number } | number

  /**
   * ≥1920px, could be a span value or an object containing above props
   * @type { span: number, offset: number } | number
   */
  xl?: { span: number; offset: number } | number
}

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ElDivider'
  | 'ElInput'
  | 'ElSelect'
  | 'ApiSelect'
  | 'ElDatePicker'
  | 'ElTimePicker'
  | 'ElRadio'
  | 'ElRadioGroup'
  | 'ElRadioButton'
  | 'ElCheckbox'
  | 'ElCheckboxGroup'
  | 'ElSwitch'
  | 'ElCascader'
  | 'ElRate'
  | 'ElSlider'
  | 'ElInputNumber'
