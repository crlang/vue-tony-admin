<template>
  <div :class="[prefixCls, getAlign]">
    <template
      v-for="action in getActions"
      :key="action?.id">
      <el-button
        type="text"
        v-bind="action.buttonProps"
        @click="action?.callback!(scopes)"><Icon
          :icon="action?.preIcon"
          v-if="action?.preIcon" />{{ action.buttonProps?.text || '' }}</el-button>
    </template>
  </div>
</template>

<script lang="ts">
import type { EleButton } from '@/components/ElementPlus'
import type { TableActionType } from '../types/table'
import type { ActionItem } from '../types/tableAction'

import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'
import { useTableContext } from '../hooks/useTableContext'
import { usePermission } from '@/hooks/web/usePermission'
import { isBoolean, isFunction } from '@/utils/is'
import { Icon } from '@/components/Icon'

export default defineComponent({
  name: 'TableAction',
  components: { ElButton, Icon },
  props: {
    prefixCls: String,
    column: {
      type: Object,
      default: null,
    },
    scopes: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const table: Partial<TableActionType> = useTableContext()

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
      const { actions = [] } = props.column
      const opts = actions.filter((action) => {
        return hasPermission(action.auth) && isIfShow(action)
      })
        .map((action:ActionItem) => {
          const opt = {
            callback: action?.callback,
            popConfirm: action?.popConfirm,
            preIcon: (action.icon || '') as string,
            buttonProps: {
              size: 'small',
              ...action,
              callback: undefined, // purify
              popConfirm: undefined, // purify
              icon: '', // purify
            } as EleButton,
          }

          return opt
        })
      return opts
    })

    const getAlign = computed(() => {
      const columns = (table as TableActionType)?.getColumns?.() || []
      const actionCol = columns.find((item) => item.type === 'action')
      return actionCol?.align ?? 'left'
    })

    return { getActions, getAlign }
  },
})
</script>
