// import type { ListTypes } from './types'
// import type { EleCard } from '@/components/ElementPlus'

export const basicProps = {
  // type: {
  //   type: String as PropType<ListTypes>,
  //   default: 'list',
  // },
  // cardRows: {
  //   type: Number,
  //   default: 4,
  // },
  // cardSpace: {
  //   type: Number,
  //   default: 16,
  // },
}

export const itemProps = {
  // cardClass: {
  //   type: String,
  //   default: '',
  // },
  // cardStyle: {
  //   type: Object,
  //   default: () => { return { 'padding': 0 } },
  // },
  // cardShadow: {
  //   type: String as PropType<EleCard['shadow']>,
  //   default: 'hover',
  // },
  /**
   * Thumbnail address
   */
  thumb: {
    type: String,
    default: '',
  },
  /**
   * List title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * List description
   */
  description: {
    type: String,
    default: '',
  },
}
