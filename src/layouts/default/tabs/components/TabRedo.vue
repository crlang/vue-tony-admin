<template>
  <span
    @click="handleRedo"
    :title="t('layout.multipleTab.reload')"><Icon icon="codicon:debug-restart" /></span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTabs } from '@/hooks/web/useTabs'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'TabRedo',
  components: { Icon },

  setup() {
    const loading = ref(false)

    const { refreshPage } = useTabs()
    const { t } = useI18n()

    async function handleRedo() {
      loading.value = true
      await refreshPage()
      setTimeout(() => {
        loading.value = false
      }, 1200)
    }
    return { t, handleRedo, loading }
  },
})
</script>
