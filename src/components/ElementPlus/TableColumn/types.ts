/*
 * @Author: crlang
 * @Date: 2021-12-25 20:15:15
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-31 10:11:43
 */

type Filters = {
  text: string
  value: string
}[]

export interface EleTableColumn {
  id?: string
  realWidth?: number
  type?: string
  label?: string
  className?: string
  labelClassName?: string
  property?: string
  prop?: string
  width?: string | number
  minWidth?: string | number
  renderHeader?: any
  sortable?: boolean | string
  sortMethod?: any
  sortBy?: any
  resizable?: boolean
  columnKey?: string
  rawColumnKey?: string
  align?: string
  headerAlign?: string
  showTooltipWhenOverflow?: boolean
  showOverflowTooltip?: boolean
  fixed?: boolean | string
  formatter?: any
  selectable?:any
  reserveSelection?: boolean
  filterMethod?: any
  filteredValue?: string[]
  filters?: Filters
  filterPlacement?: string
  filterMultiple?: boolean
  index?: any
  sortOrders?: any
  renderCell?: any
  colSpan?: number
  rowSpan?: number
  children?: any
  level?: number
  filterable?: any
  order?: string
  isColumnGroup?: boolean
  columns?: any
  getColumnIndex?: any
  no?: number
  filterOpened?: boolean
}
