/*
 * @Author: crlang
 * @Date: 2021-12-25 20:05:37
 * @Description: File brief description
 * @LastEditors: crlang(https://www.crlang.com)
 * @LastEditTime: 2021-12-31 17:22:59
 */
import { CSSProperties } from 'vue'

export interface EleTableEvent {
  onSelect?: (selection:any, row:any) => void;
  onSelectAll?: (selection:any) => void;
  onSelectionChange?: (selection:any) => void;
  onCellMouseEnter?: (row:any, column:any, cell:any, event:any) => void;
  onCellMouseLeave?: (row:any, column:any, cell:any, event:any) => void;
  onCellClick?: (row:any, column:any, cell:any, event:any) => void;
  onCellDblclick?: (row:any, column:any, cell:any, event:any) => void;
  onCellContextmenu?: (row:any, column:any, cell:any, event:any) => void;
  onRowClick?: (row:any, column:any, event:any) => void;
  onRowContextmenu?: (row:any, column:any, event:any) => void;
  onRowDblclick?: (row:any, column:any, event:any) => void;
  onHeaderClick?: (column:any, event:any) => void;
  onHeaderContextmenu?: (column:any, event:any) => void;
  onSortChange?: (column:any, prop:any, order:any) => void;
  onFilterChange?: (filters:any) => void;
  onCurrentChange?: (currentRow:any, oldCurrentRow:any) => void;
  onHeaderDragend?: (newWidth:any, oldWidth:any, column:any, event:any) => void;
  onExpandChange?: (row:any, expanded:any) => void;
}

export interface EleTable extends EleTableEvent {
  data?: Record[]
  size?: string
  width?: string | number
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
  rowKey?: string
  context?: any
  showHeader?: boolean
  showSummary?: boolean
  sumText?: string
  summaryMethod?: any
  rowClassName?: any
  rowStyle?: any
  cellClassName?: any
  cellStyle?: any
  headerRowClassName?: any
  headerRowStyle?: any
  headerCellClassName?: any
  headerCellStyle?: any
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  emptyText?: string
  expandRowKeys?: any[]
  defaultExpandAll?: boolean
  defaultSort?: any
  tooltipEffect?: string
  spanMethod?: any
  selectOnIndeterminate?: boolean
  indent?: number
  treeProps?: {
    hasChildren?: string
    children?: string
  }
  lazy?: boolean
  load?: any
  className?: string
  style?: CSSProperties
}
