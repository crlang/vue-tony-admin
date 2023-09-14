/**
 * 展开/收起状态
 *
 * Expand/Collapse state
 */
export interface AdvanceState {
  /**
   * 展开/收起按钮的状态
   *
   * Expand/Collapse button state
   */
  isAdvanced: boolean;
  /**
   * 是否显示展开/收起按钮-通过计算判断
   *
   * Whether to display the expand/collapse button - judged by calculation
   */
  showAdvanced: boolean;
  /**
   * 操作项的列的大小
   *
   * The size of the column for the action item
   */
  actionSpan: number;
}
