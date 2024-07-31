<template>
  <div @click="showModal = true">
    <ElTooltip effect="dark" content="搜索" placement="bottom-end">
      <span><SvgIcon name="search" /></span>
    </ElTooltip>
    <AppSearchModal :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import AppSearchModal from './AppSearchModal.vue'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'AppSearch',
  components: { ElTooltip, AppSearchModal, SvgIcon },
  setup() {
    const showModal = ref(false)

    return {
      showModal,
    }
  },
})
</script>
