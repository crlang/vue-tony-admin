import { computed, defineComponent, toRaw, unref } from 'vue'

export default defineComponent({
  name: 'TableRender',

  props: {
    customRender: [Object, Function, String, Number],
    scope: { type: Object },
    column: { type: Object },
  },
  setup(props) {
    const basic = computed(() => {
      const { scope, column } = props
      if (!column.prop || !scope.row) {
        return undefined
      }

      return {
        text: scope.row[column.prop] || undefined,
        record: toRaw(scope.row),
        index: scope.$index,
      }
    })
    return () => props.customRender(unref(basic), props.scope, props.column)
  },
})
