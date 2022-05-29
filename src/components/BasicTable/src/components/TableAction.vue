<template>
  <div :class="[prefixCls, getAlign]">
    <template
      v-for="action in getActions"
      :key="action?.id">
      <el-button
        type="text"
        size="small"
        v-bind="action.buttonProps"
        @click="handleClick(action)"><SvgIcon
          :name="action.svgName"
          v-if="action?.svgName" />{{ action.buttonProps?.text || '' }}</el-button>
    </template>
  </div>
</template>

<script lang="ts">
import type { EleButton } from '@/components/ElementPlus'
import type { TableActionType, TableActionItem, scopeInfo } from '../typing'

import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'
import { isBoolean, isFunction } from '@vueuse/core'

import { useTableContext } from '../hooks/useTableContext'
import { usePermission } from '@/hooks/web/usePermission'
import { SvgIcon } from '@/components/SvgIcon'
import { omit } from 'lodash-es'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'TableAction',
  components: { ElButton, SvgIcon },
  props: {
    prefixCls: String,
    column: {
      type: Object,
      default: null,
    },
    scopes: {
      type: Object as PropType<scopeInfo>,
      default: null,
    },
  },
  setup(props) {
    const table: Partial<TableActionType> = useTableContext()

    const { hasPermission } = usePermission()

    const getActions = computed(() => {
      const { actions = [] } = props.column
      const opts = actions.filter((action) => {
        return hasPermission(action.auth) && isIfShow(action)
      })
        .map((action:TableActionItem) => {
          const opt = {
            callback: action?.callback || null,
            popConfirm: action?.popConfirm || null,
            svgName: action.svgName,
            buttonProps: omit(action, ['svgName', 'popConfirm', 'auth', 'ifShow', 'callback']) as EleButton,
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
    function handleClick(action:TableActionItem) {
      const { createConfirm } = useMessage()
      // 如果存在确认按钮时
      // If there is a confirmation
      if (action.popConfirm) {
        createConfirm({ ...action.popConfirm }).then(res => {
          action?.callback!(props.scopes, res)
        })
          .catch(err => {
            action?.callback!(props.scopes, err)
          })
      } else {
        action?.callback!(props.scopes)
      }
    }
    return {
      getActions,
      getAlign,
      handleClick,
    }
  },
})
</script>
