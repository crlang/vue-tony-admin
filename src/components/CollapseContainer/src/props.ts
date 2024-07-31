export const basicProps = {
  /**
   * 折叠标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 是否显示加载状态
   */
  loading: Boolean,
  /**
   * 是否能折叠，否则只是普通容器
   */
  canExpan: {
    type: Boolean,
    default: true,
  },
  /**
   * 标题右侧提示内容
   */
  helpMessage: {
    type: [Array, String] as PropType<string | string[]>,
    default: '',
  },
}
