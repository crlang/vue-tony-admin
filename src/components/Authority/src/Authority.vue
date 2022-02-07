<script lang="ts">
import { defineComponent } from 'vue'
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'
import { getSlot } from '@/utils/helper/tsxHelper'

export default defineComponent({
  name: 'Authority',
  props: {
    /**
     * Specified role is visible
     * the value can pass the role value or can pass the code permission value
     */
    value: {
      type: [Number, Array, String] as PropType<RoleEnum | RoleEnum[] | string | string[]>,
      default: '',
    },
  },
  setup(props, { slots }) {
    const { hasPermission } = usePermission()

    /**
     * Render role button
     */
    function renderAuth() {
      const { value } = props
      if (!value) {
        return getSlot(slots)
      }
      return hasPermission(value) ? getSlot(slots) : null
    }

    return () => {
      // Role-based value control
      return renderAuth()
    }
  },
})
</script>
