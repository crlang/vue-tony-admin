import type { FunctionalComponent, defineComponent } from 'vue'
import { h } from 'vue'
import type { ComponentType } from '../../types/componentType'
import { componentMap } from '@/components/Table/src/componentMap'
import { ElPopover } from 'element-plus'

export interface ComponentProps {
  component: ComponentType;
  rule: boolean;
  popoverVisible: boolean;
  ruleMessage: string;
}

export const CellComponent: FunctionalComponent = (
  {
    component = 'ElInput',
    rule = true,
    ruleMessage,
    popoverVisible,
  }: ComponentProps,
  { attrs }
) => {
  const Comp = componentMap.get(component) as typeof defineComponent
  const DefaultComp = h(Comp, attrs)
  if (!rule) {
    return DefaultComp
  }
  return h(
    ElPopover,
    {
      popperClass: 'edit-cell-rule-popover',
      visible: !!popoverVisible,

    },
    {
      reference: () => DefaultComp,
      default: () => ruleMessage,
    }
  )
}
