<template>
  <div>
    <template v-if="canFullscreen">
      <ElTooltip
        :content="t('component.modal.restore')"
        placement="bottom"
        v-if="fullScreen">
        <span><SvgIcon
          name="fullscreen-exit"
          @click="handleFullScreen" /></span>
      </ElTooltip>
      <ElTooltip
        :content="t('component.modal.maximize')"
        placement="bottom"
        v-else>
        <span><SvgIcon
          name="fullscreen"
          @click="handleFullScreen" /></span>
      </ElTooltip>
    </template>
    <ElTooltip
      :content="t('component.modal.close')"
      placement="bottom">
      <span><SvgIcon
        name="close"
        @click="handleCancel" /></span>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'ModalClose',
  components: { ElTooltip, SvgIcon },
  props: {
    canFullscreen: { type: Boolean, default: true },
    fullScreen: { type: Boolean },
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    const { t } = useI18n()

    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    function handleFullScreen(e: Event) {
      e?.stopPropagation()
      e?.preventDefault()
      emit('fullscreen')
    }

    return {
      t,
      handleCancel,
      handleFullScreen,
    }
  },
})
</script>
