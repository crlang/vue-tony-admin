<template>
  <div
    :class="[prefixCls, getAlign]"
    @click="onCellClick">
    <template
      v-for="action in getActions"
      :key="action?.id">
      <Button v-bind="action">{{ action.label || '' }}</Button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRaw } from 'vue'
import { ActionItem, TableActionType } from '@/components/Table'
import { Button } from '@/components/Button'
import { useDesign } from '@/hooks/web/useDesign'
import { useTableContext } from '../hooks/useTableContext'
import { usePermission } from '@/hooks/web/usePermission'
import { isBoolean, isFunction } from '@/utils/is'
import { propTypes } from '@/utils/propTypes'
import { ACTION_COLUMN_FLAG } from '../const'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'TableAction',
  components: { Button },
  props: {
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null,
    },
    divider: propTypes.bool.def(true),
    outside: propTypes.bool,
    stopButtonPropagation: propTypes.bool.def(false),
  },
  setup(props) {
    const { prefixCls } = useDesign('basic-table-action')
    let table: Partial<TableActionType> = {}
    if (!props.outside) {
      table = useTableContext()
    }

    const { hasPermission } = usePermission()
    function isIfShow(action: ActionItem): boolean {
      const ifShow = action.ifShow

      let isIfShow = true

      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(action)
      }
      return isIfShow
    }

    const getActions = computed(() => {
      const opts = (toRaw(props.actions) || [])
        .filter((action) => {
          return hasPermission(action.auth) && isIfShow(action)
        })
        .map((action) => {
          const opt = {
            preIcon: action?.icon,
            type: 'text',
            size: 'small',
            ...action,
          }
          return omit(opt, ['icon']) as ActionItem
        })
      return opts
    })

    const getAlign = computed(() => {
      const columns = (table as TableActionType)?.getColumns?.() || []
      const actionColumn = columns.find((item) => item.flag === ACTION_COLUMN_FLAG)
      return actionColumn?.align ?? 'left'
    })

    function onCellClick(e: MouseEvent) {
      if (!props.stopButtonPropagation) return
      const path = e.composedPath() as HTMLElement[]
      const isInButton = path.find((ele) => {
        return ele.tagName?.toUpperCase() === 'BUTTON'
      })
      isInButton && e.stopPropagation()
    }

    return { prefixCls, getActions, getAlign, onCellClick }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table-action';

.#{$prefix-cls} {
  display: flex;
  align-items: center;

  &.left {
    justify-content: flex-start;
  }

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  button {
    display: flex;
    align-items: center;
  }
}
</style>
