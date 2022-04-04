<template>
  <div :class="[prefixCls, { 'is-fullscreen': fullscreen }]">
    <ElUpload
      :file-list="[]"
      multiple
      @change="handleChange"
      :action="uploadUrl"
      :show-file-list="false"
      accept="image/*">
      <ElButton
        type="primary"
        size="small"
        plain
        v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </ElButton>
    </ElUpload>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElButton, ElUpload } from 'element-plus'
import { useGlobSetting } from '@/hooks/setting'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'TinymceImageUpload',
  components: { ElButton, ElUpload },
  props: {
    fullscreen: {
      type: Boolean,
    },
    prefixCls: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['uploading', 'success', 'fail'],
  setup(props, { emit }) {
    let uploading = false

    const { uploadUrl } = useGlobSetting()
    const { t } = useI18n()

    const getButtonProps = computed(() => {
      const { disabled } = props
      return {
        disabled,
      }
    })

    function handleChange(info: Recordable) {
      const status = info?.status
      const url = info?.response?.url
      const name = info?.name

      if (status === 'uploading' || status === 'ready') {
        if (!uploading) {
          emit('uploading', name)
          uploading = true
        }
      } else if (status === 'success') {
        emit('success', name, url)
        uploading = false
      } else if (status === 'fail') {
        emit('fail')
        uploading = false
      }
    }

    return {
      handleChange,
      uploadUrl: uploadUrl as string,
      t,
      getButtonProps,
    }
  },
})
</script>
