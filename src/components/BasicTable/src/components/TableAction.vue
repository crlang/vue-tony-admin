<template>
  <div :class="[prefixCls, getAlign]">
    <template
      v-for="action in getActions"
      :key="action?.id">
      <el-button
        type="text"
        size="small"
        v-bind="action.buttonProps"
        @click="handleClick(action)">
        <SvgIcon
          :name="action.svgName"
          v-if="action?.svgName" />{{ action.buttonProps?.text || '' }}
      </el-button>
    </template>
  </div>
</template>

<script lang="ts">
import type { EleButton } from '@/components/ElementPlus'
import type { TableActionItem, scopeInfo, BasicColumn } from '../typing'

import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'
import { isBoolean, isFunction } from '@vueuse/core'
import { omit } from 'lodash-es'

import { usePermission } from '@/hooks/web/usePermission'
import { SvgIcon } from '@/components/SvgIcon'
import { useMessage } from '@/hooks/web/useMessage'

interface TableActionItemX extends TableActionItem {
  buttonProps: EleButton
}

export default defineComponent({
  name: 'TableAction',
  components: { ElButton, SvgIcon },
  props: {
    prefixCls: String,
    /**
     * 继承-操作列内容
     *
     * Inherit - Manipulate Column Contents
     */
    column: {
      type: Object as PropType<BasicColumn>,
      default: null,
    },
    /**
     * 继承-当前操作行内容
     *
     * Inherit - current action line content
     */
    scopes: {
      type: Object as PropType<scopeInfo>,
      default: null,
    },
  },
  setup(props) {
    const { hasPermission } = usePermission()

    /**
     * 获取操作列内容
     *
     * Get action column content
     */
    const getActions = computed(() => {
      const { actions = [] } = props.column

      const opts = actions.filter((action) => {
        // 过滤权限
        return hasPermission(action.auth) && isIfShow(action)
      })
        .map((action: TableActionItem) => {
          const opt = {
            callback: action?.callback || null,
            popConfirm: action?.popConfirm || null,
            svgName: action.svgName,
            buttonProps: omit(action, ['svgName', 'popConfirm', 'auth', 'ifShow', 'callback']) as EleButton,
          }

          return opt
        })
      return opts as TableActionItemX[]
    })

    /**
     * 获取对齐方式，默认左对齐
     *
     * Get the alignment, the default is left aligned
     */
    const getAlign = computed(() => {
      const { align = 'left' } = props.column
      return align
    })

    /**
     * 判断操作按钮是否显示
     *
     * Whether the action button is displayed
     * @param action TableActionItem
     */
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

    /**
     * 处理按钮点击动作
     *
     * Handling button clicks
     * @param action TableActionItemX
     */
    function handleClick(action: TableActionItemX) {
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
