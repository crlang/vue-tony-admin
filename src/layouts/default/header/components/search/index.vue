<template>
  <div @click="showModal = true">
    <ElTooltip
      effect="dark"
      content="搜索"
      placement="bottom-end">
      <span><Search /></span>
    </ElTooltip>
    <AppSearchModal
      @close="showModal = false"
      :visible="showModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Search } from '@element-plus/icons'
import AppSearchModal from './AppSearchModal.vue'
import { ElTooltip } from 'element-plus'

export default defineComponent({
  name: 'AppSearch',
  components: { ElTooltip, AppSearchModal, Search },
  setup() {
    const showModal = ref(false)

    return {
      showModal,
    }
  },
})
</script>
