<script lang="ts">
import { defineComponent } from 'vue'
import type { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'
import { getSlot } from '@/utils/helper/tsxHelper'

export default defineComponent({
  name: 'Authority',
  props: {
    /**
     * 指定角色可见，可填写角色值或权限值
     */
    value: {
      type: [Number, Array, String] as PropType<RoleEnum | RoleEnum[] | string | string[]>,
      default: '',
    },
  },
  setup(props, { slots }) {
    const { hasPermission } = usePermission()

    /**
     * 渲染插槽内容
     */
    function renderAuth() {
      const { value } = props
      if (!value) {
        return getSlot(slots)
      }

      return hasPermission(value) ? getSlot(slots) : null
    }

    return () => renderAuth()
  },
})
</script>
