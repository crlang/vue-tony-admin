import { computed, defineComponent, toRaw, unref } from 'vue'
import type { TableColumnRender, scopeInfo } from '../typing'
import type { EleTableColumn } from '@/components/ElementPlus'

export default defineComponent({
  name: 'TableRender',
  props: {
    /**
     * 自定义渲染函数内容
     */
    customRender: {
      type: Function as PropType<(info: TableColumnRender) => void>,
    },
    /**
     * 官方自带行列、索引数据
     */
    scope: { type: Object as PropType<scopeInfo> },
    /**
     * 当前列数据(含自定义)
     */
    column: { type: Object as PropType<EleTableColumn> },
  },
  setup(props) {
    const res = computed((): TableColumnRender => {
      const { scope, column } = props
      if (column?.prop && scope?.row) {
        return {
          text: scope.row[column.prop] || undefined,
          record: toRaw(scope.row),
          index: scope.$index,
          scope,
          column,
        }
      }
      return undefined
    })

    return () => props.customRender(unref(res))
  },
})
