<template>
  <div
    :class="customClass"
    @dblclick="handleTitleDbClick">
    <BasicTitle :helpMessage="helpMessage">{{ customTitle }}</BasicTitle>
    <div :class="`${customClass}__extra`">
      <template v-if="showFullscreen">
        <ElTooltip
          :content="t('component.modal.restore')"
          placement="bottom"
          v-if="fullscreen">
          <span @click="handleFullscreen"><SvgIcon name="fullscreen-exit" /></span>
        </ElTooltip>
        <ElTooltip
          :content="t('component.modal.maximize')"
          placement="bottom"
          v-else>
          <span @click="handleFullscreen"><SvgIcon name="fullscreen" /></span>
        </ElTooltip>
      </template>
      <ElTooltip
        v-if="showClose"
        :content="t('component.modal.close')"
        placement="bottom">
        <span @click="handleCancel"><SvgIcon name="close" /></span>
      </ElTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { BasicTitle } from '@/components/Basic'
import { ElTooltip } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { SvgIcon } from '@/components/Icon'
import { useModalDragMove } from '../hooks/useModalDrag'
import { headerProps } from '../props'

export default defineComponent({
  name: 'BasicModalHeader',
  components: { ElTooltip, BasicTitle, SvgIcon },
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean }, // 继承
    destroyOnClose: { type: Boolean }, // 继承
    fullscreen: { type: Boolean }, // 继承
    draggable: { type: Boolean }, // 继承
    customClass: { type: String },
    customTitle: { type: String },
    ...headerProps,
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const { modelValue, draggable, destroyOnClose } = toRefs(props)
    useModalDragMove({
      modelValue,
      destroyOnClose,
      draggable,
    })

    function handleTitleDbClick(e) {
      if (!props.showFullscreen) return
      e.stopPropagation()

      handleFullscreen(e)
    }

    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    function handleFullscreen(e: Event) {
      console.log('eee+++', e)
      e?.stopPropagation()
      e?.preventDefault()
      emit('fullscreen')
    }

    return {
      t,
      handleCancel,
      handleFullscreen,
      handleTitleDbClick,
    }
  },
})
</script>
