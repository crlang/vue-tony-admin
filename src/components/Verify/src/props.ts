import { useI18n } from '@/hooks/web/useI18n'
import { CSSProperties } from 'vue'

const { t } = useI18n()
export const basicProps = {
  /**
   * Validate value
   */
  value: {
    type: Boolean,
    default: false,
  },
  /**
   * If it is in slot mode, the drag will not be verified successfully, you need to manually control the success or failure
   */
  isSlot: {
    type: Boolean,
    default: false,
  },
  /**
   * Drag the hint text
   */
  text: {
    type: String,
    default: t('component.verify.dragText'),
  },
  /**
   * Drag success text
   */
  successText: {
    type: String,
    default: t('component.verify.successText'),
  },
  /**
   * Drag bar height
   */
  height: {
    type: [Number, String] as PropType<string | number>,
    default: 40,
  },
  /**
   * Drag bar width
   */
  width: {
    type: [Number, String] as PropType<string | number>,
    default: 220,
  },
  /**
   * Whether to round the drag bar
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * Wrap container style
   */
  wrapStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * Content container style
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * Bar container style
   */
  barStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * Action container style
   */
  actionStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
}

export const rotateProps = {
  ...basicProps,
  /**
   * Verified image
   */
  src: {
    type: String,
  },
  /**
   * Image size
   */
  imgWidth: {
    type: Number,
    default: 260,
  },
  /**
   * Picture style
   */
  imgWrapStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  /**
   * Minimum rotation angle
   */
  minDegree: {
    type: Number,
    default: 90,
  },
  /**
   * Maximum rotation angle
   */
  maxDegree: {
    type: Number,
    default: 270,
  },
  /**
   * Rotate the proofreading angle, the smaller it is, the harder it is to succeed
   */
  diffDegree: {
    type: Number,
    default: 20,
  },
}
