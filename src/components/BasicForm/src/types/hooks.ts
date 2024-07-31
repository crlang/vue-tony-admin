/**
 * 展开/收起状态
 */
export interface AdvanceState {
  /**
   * 展开/收起按钮的状态
   */
  isAdvanced: boolean
  /**
   * 是否显示展开/收起按钮-通过计算判断
   */
  showAdvanced: boolean
  /**
   * 操作项的列的大小
   */
  actionSpan: number
}
