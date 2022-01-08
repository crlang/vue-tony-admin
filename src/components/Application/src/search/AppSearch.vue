<template>
  <span
    role="img"
    @click="changeModal(true)">
    <el-tooltip
      effect="dark"
      :content="t('common.searchText')"
      placement="bottom-end">
      <Search style="width: 18px; height: 18px;" />
    </el-tooltip>
    <AppSearchModal
      @close="changeModal(false)"
      :visible="showModal" />
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Search } from '@element-plus/icons'
import AppSearchModal from './AppSearchModal.vue'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'AppSearch',
  components: { AppSearchModal, Search },
  setup() {
    const showModal = ref(false)
    const { t } = useI18n()

    function changeModal(show: boolean) {
      showModal.value = show
    }

    return {
      changeModal,
      t,
      showModal,
    }
  },
})
</script>
