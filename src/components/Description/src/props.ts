import { CollapseContainerOptions } from '@/components/CollapseContainer'
import { EleDescriptionsItemProps, EleDescriptionsProps } from '@/components/ElementPlus'
import { DescItem } from './typing'

export const basicProps = {
  ...EleDescriptionsProps,
  useCollapse: {
    type: Boolean,
    default: true,
  },
  collapseOptions: {
    type: Object as PropType<CollapseContainerOptions>,
    default: null,
  },
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  data: { type: Object },
}

export const basicItemProps = {
  ...EleDescriptionsItemProps,
  field: { type: String },
  show: {
    type: Boolean,
    default: true,
  },
}
