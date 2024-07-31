<template>
  <div :class="[prefixCls, getAlign]">
    <template v-for="action in getActions" :key="action?.id">
      <ElButton
        text
        size="small"
        v-bind="action.buttonProps"
        :class="`${prefixCls}--button`"
        @click="handleClick(action)"
      >
        <SvgIcon v-if="action?.iconName" :class="`${prefixCls}--icon`" :name="action.iconName" />
        <span :class="`${prefixCls}--text`">{{ action?.btnText || '' }}</span>
      </ElButton>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { omit } from 'lodash-es'
import type { BasicColumn, TableActionItem, scopeInfo } from '../typing'
import type { EleButton } from '@/components/ElementPlus'

import { usePermission } from '@/hooks/web/usePermission'
import { SvgIcon } from '@/components/SvgIcon'
import { useMessage } from '@/hooks/web/useMessage'
import { isBoolean, isFunction } from '@/utils/is'

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
     */
    column: {
      type: Object as PropType<BasicColumn>,
      default: null,
    },
    /**
     * 继承-当前操作行内容
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
     */
    const getActions = computed(() => {
      const { actions = [] } = props.column

      const opts = actions
        .filter((action) => {
          // 过滤权限
          return hasPermission(action.auth) && isIfShow(action)
        })
        .map((action: TableActionItem) => {
          const opt = {
            callback: action?.callback || null,
            popConfirm: action?.popConfirm || null,
            iconName: action?.iconName || null,
            btnText: action?.btnText || null,
            buttonProps: omit(action, ['iconName', 'popConfirm', 'auth', 'ifShow', 'callback', 'btnText']) as EleButton,
          }

          return opt
        })
      return opts as TableActionItemX[]
    })

    /**
     * 获取对齐方式，默认左对齐
     */
    const getAlign = computed(() => {
      const { align = 'left' } = props.column
      return align
    })

    /**
     * 判断操作按钮是否显示
     *
     * @param action TableActionItem
     */
    function isIfShow(action: TableActionItem): boolean {
      const ifShow = action.ifShow
      const { column, scopes } = props

      let isIfShow = true

      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(column, scopes, action)
      }
      return isIfShow
    }

    /**
     * 处理按钮点击动作
     *
     * @param action TableActionItemX
     */
    function handleClick(action: TableActionItemX) {
      const { createConfirm } = useMessage()

      // 如果存在确认按钮时
      if (action.popConfirm) {
        createConfirm({ ...action.popConfirm })
          .then((res) => {
            action?.callback!(props.scopes, res)
          })
          .catch((err) => {
            action?.callback!(props.scopes, err)
          })
      }
      else {
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
