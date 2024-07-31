export const basicProps = {
  /**
   * 开始数值
   */
  startVal: { type: Number, default: 0 },
  /**
   * 完成数值
   */
  endVal: { type: Number, default: 100 },
  /**
   * 动画过渡时间(ms)
   */
  duration: { type: Number, default: 1500 },
  /**
   * 是否自动播放，否则需要手动执行 start()
   */
  autoplay: { type: Boolean, default: true },
  /**
   * 小数位分隔符
   */
  decimal: { type: String, default: '.' },
  /**
   * 支持多少位小数
   */
  decimals: {
    type: Number,
    default: 0,
    validator(v: number) {
      return v >= 0
    },
  },
  /**
   * 文本前内容
   */
  prefix: { type: String, default: '' },
  /**
   * 文本后内容
   */
  suffix: { type: String, default: '' },
  /**
   * 千分位分隔符
   */
  separator: { type: String, default: ',' },
  /**
   * 字体颜色
   */
  color: { type: String },
  /**
   * 是否使用动画
   */
  useEasing: { type: Boolean, default: true },
  /**
   * 动画贝赛尔曲线
   */
  transition: { type: String, default: 'linear' },
}
