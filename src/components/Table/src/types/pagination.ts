// import { VNodeChild } from 'vue'
// import { ElPagination } from 'element-plus'
// export type ElPaginationType = InstanceType<typeof ElPagination>
// export const paginationProps = {
//   total: Number,
//   pageSize: Number,
//   defaultPageSize: Number,
//   currentPage: Number,
//   defaultCurrentPage: Number,
//   pageCount: Number,
//   pagerCount: {
//     type: Number,
//     validator: (value: unknown) => {
//       return (
//         typeof value === 'number' &&
//         (value | 0) === value &&
//         value > 4 &&
//         value < 22 &&
//         value % 2 === 1
//       )
//     },
//     default: 7
//   },
//   layout: {
//     type: String,
//     default: (
//       ['prev', 'pager', 'next', 'jumper', '->', 'total'] as LayoutKey[]
//     ).join(', ')
//   },
//   popperClass: {
//     type: String,
//     default: ''
//   },
//   prevText: {
//     type: String,
//     default: ''
//   },
//   nextText: {
//     type: String,
//     default: ''
//   },
//   small: Boolean,
//   background: Boolean,
//   disabled: Boolean,
//   hideOnSinglePage: Boolean
// } as const
// export type PaginationProps = ExtractPropTypes<typeof paginationProps>

// interface PaginationRenderProps {
//   page: number;
//   type: 'page' | 'prev' | 'next';
//   originalElement: any;
// }

// export declare class PaginationConfig extends Pagination {
//   position?: 'top' | 'bottom' | 'both';
// }
export interface PaginationProps{

  /**
   * total number of data items
   * @default 0
   * @type number
   */
  total?: number;

  /**
   * default initial page number
   * @default 1
   * @type number
   */
  defaultCurrentPage?: number;

  /**
   * current page number
   * @type number
   */
  page?: number;

  /**
   * default number of data items per page
   * @default 10
   * @type number
   */
  defaultPageSize?: number;

  /**
   * number of data items per page
   * @type number
   */
  size?: number;

  /**
   * Whether to hide pager on single page
   * @default false
   * @type boolean
   */
  hideOnSinglePage?: boolean;

  /**
   * specify the sizeChanger options
   * @default [10, 20, 30, 40]
   * @type string[]
   */
  pageSizes?: number[];

  /**
   * specify the size of Pagination, can be set to small
   * @default false
   * @type boolean
   */
  small?: boolean;

  /**
   * total page count. Set either total or page-count and pages will be displayed; if you need page-sizes, total is required
   * @default
   * @type number
   */
  pageCount?: number;

  /**
   * number of pagers. Pagination collapses when the total page count exceeds this value
   * @default 7
   * @type number
   */
  pagerCount?: number;

  /**
   * layout of Pagination, elements separated with a comma
   * @default 'prev, pager, next, jumper, ->, total'
   * @type string
   */
  layout?: string;

  /**
   * 	custom class name for the page size Select's dropdown
   * @default
   * @type string
   */
  popperClass?: string;

  /**
   * text for the prev button
   * @default
   * @type string
   */
  prevText?: string;

  /**
   * text for the next button
   * @default
   * @type string
   */
  nextText?: string;

  /**
   * specify the size of Pagination, can be set to small
   * @default false
   * @type boolean
   */
  background?: boolean;

  /**
   * whether the buttons have a background color
   * @default false
   * @type boolean
   */
  disabled?: boolean;

}
