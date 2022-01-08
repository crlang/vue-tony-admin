<template>
  <div>
    <template v-if="canFullscreen">
      <el-tooltip
        :content="t('component.modal.restore')"
        placement="bottom"
        v-if="fullScreen">
        <span><SvgIcon
          name="fullscreen-exit"
          @click="handleFullScreen" /></span>
      </el-tooltip>
      <el-tooltip
        :content="t('component.modal.maximize')"
        placement="bottom"
        v-else>
        <span><SvgIcon
          name="fullscreen"
          @click="handleFullScreen" /></span>
      </el-tooltip>
    </template>
    <el-tooltip
      :content="t('component.modal.close')"
      placement="bottom">
      <span><SvgIcon
        name="close"
        @click="handleCancel" /></span>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'ModalClose',
  components: { SvgIcon },
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
