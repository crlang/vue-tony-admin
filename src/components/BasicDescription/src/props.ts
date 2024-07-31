import type { DescItem } from './typing'
import type { CollapseContainerProps } from '@/components/CollapseContainer'
import { EleDescriptionsProps } from '@/components/ElementPlus'

export const customProps = {
  /**
   * 描述的数据项集合
   */
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  /**
   * 描述数据
   */
  data: {
    type: Object as PropType<Recordable>,
  },
  /**
   * 是否包含折叠组件
   */
  useCollapse: {
    type: Boolean,
    default: true,
  },
  /**
   * 折叠组件配置
   */
  collapseOptions: {
    type: Object as PropType<CollapseContainerProps>,
    default: null,
  },
}

export const basicProps = {
  ...EleDescriptionsProps,
  ...customProps,
}
