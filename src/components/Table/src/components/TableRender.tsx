import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableRender',

  props: {
    render: [Object, Function, String, Number],
  },

  setup(props) {
    return () => props.render()
  },
})
