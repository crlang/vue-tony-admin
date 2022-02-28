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
  thumb: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
}
