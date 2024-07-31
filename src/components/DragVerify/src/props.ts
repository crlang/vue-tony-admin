import type { CSSProperties } from 'vue'

export const basicProps = {
  /**
   * 绑定的值
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 如果是slot模式，需要手动设置 modelValue 为 true/false
   */
  isSlot: {
    type: Boolean,
    default: false,
  },
  /**
   * 拖动默认文本
   */
  text: {
    type: String,
    default: '请按住滑块拖动',
  },
  /**
   * 拖动成功文本
   */
  successText: {
    type: String,
    default: '验证通过',
  },
  /**
   * 拖动盒子高度
   */
  height: {
    type: Number,
    default: 40,
  },
  /**
   * 拖动盒子宽度
   */
  width: {
    type: Number,
    default: 220,
  },
  /**
   * 是否使用圆角样式
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * 拖动盒子样式
   */
  wrapStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 拖动容器样式
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 拖动条样式
   */
  barStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 拖动点样式
   */
  actionStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
}

export const rotateProps = {
  ...basicProps,
  /**
   * 图片地址
   */
  src: {
    type: String,
  },
  /**
   * 图片大小
   */
  imgSize: {
    type: Number,
    default: 260,
  },
  /**
   * 图片框样式
   */
  imgWrapStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * 最小转动角度
   */
  minDegree: {
    type: Number,
    default: 90,
  },
  /**
   * 最大转动角度
   */
  maxDegree: {
    type: Number,
    default: 270,
  },
  /**
   * 旋转校对角度，越小越难成功
   */
  diffDegree: {
    type: Number,
    default: 20,
  },
}
