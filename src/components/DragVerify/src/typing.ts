/**
 * 实例方法
 */
export interface DragVerifyActionType {
  resume: () => void
}

/**
 * 通过后返回数据
 */
export interface PassingData {
  isPassing: boolean
  time: number
}

/**
 * 移动时返回数据
 */
export interface MoveData {
  event: MouseEvent | TouchEvent
  moveDistance: number
  moveX: number
}
