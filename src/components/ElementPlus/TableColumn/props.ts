/*
 * @Author: crlang
 * @Date: 2021-12-25 20:15:10
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-31 10:21:15
 */

export const EleTableColumnProps = {
  type: {
    type: String,
    default: 'default',
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: false,
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: true,
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default: () => {
      return ['ascending', 'descending', null]
    },
  },
}
