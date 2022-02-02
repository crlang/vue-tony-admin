
export const basicProps = {
  /**
   * start number
   */
  startVal: { type: Number, default: 0 },
  /**
   * finish number
   */
  endVal: { type: Number, default: 100 },
  /**
   *animation duration(ms)
   */
  duration: { type: Number, default: 1500 },
  /**
   * Whether to play automatically, otherwise you need to manually start()
   */
  autoplay: { type: Boolean, default: true },
  /**
   * decimal separator
   */
  decimal: { type: String, default: '.' },
  /**
   * how many decimal places exist
   */
  decimals: {
    type: Number,
    default: 0,
    validator(v: number) {
      return v >= 0
    },
  },
  /**
   * prefix text
   */
  prefix: { type: String, default: '' },
  /**
   * suffix text
   */
  suffix: { type: String, default: '' },
  /**
   * Thousands separator
   */
  separator: { type: String, default: ',' },
  /**
   * font color
   */
  color: { type: String },
  /**
   * Whether to use animation
   */
  useEasing: { type: Boolean, default: true },
  /**
   * Digital animation transition curves
   */
  transition: { type: String, default: 'linear' },
}
