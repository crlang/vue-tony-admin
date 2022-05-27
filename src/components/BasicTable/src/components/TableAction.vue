<template>
  <div :class="[prefixCls, getAlign]">
    <template
      v-for="action in getActions"
      :key="action?.id">
      <el-button
        type="text"
        v-bind="action.buttonProps"
        @click="action?.callback!(scopes)"><Icon
          :name="action?.icon"
          v-if="action?.icon" />{{ action.buttonProps?.text || '' }}</el-button>
    </template>
  </div>
</template>

<script lang="ts">
import type { EleButton } from '@/components/ElementPlus'
import type { TableActionType, TableActionItem } from '../typing'

import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'
import { isBoolean, isFunction } from '@vueuse/core'

import { useTableContext } from '../hooks/useTableContext'
import { usePermission } from '@/hooks/web/usePermission'
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
    function isIfShow(action: TableActionItem): boolean {
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
        .map((action:TableActionItem) => {
          const opt = {
            callback: action?.callback,
            popConfirm: action?.popConfirm,
            preIcon: (action.icon || '') as string,
            buttonProps: {
              size: 'small',
              ...action,
              callback: undefined, // purify
              popConfirm: undefined, // purify
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
