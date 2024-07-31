<template>
  <PageWrapper title="消息示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Message">
      <ElButton class="mr-2" @click="infoMsg('Info message')">Info</ElButton>
      <ElButton class="mr-2" type="success" @click="successMsg('Success message')">Success</ElButton>
      <ElButton class="mr-2" type="warning" @click="warningMsg('Warning message')">Warning</ElButton>
      <ElButton class="mr-2" type="danger" @click="errorMsg('Error message')">Error</ElButton>
      <ElButton class="mr-2" type="primary" @click="handleLoading">Loading</ElButton>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Comfirm">
      <ElButton class="mr-2" @click="handleConfirm('info')">Info</ElButton>
      <ElButton type="warning" class="mr-2" @click="handleConfirm('warning')">Warning</ElButton>
      <ElButton type="success" class="mr-2" @click="handleConfirm('success')">Success</ElButton>
      <ElButton type="danger" class="mr-2" @click="handleConfirm('error')">Error</ElButton>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Modal">
      <ElButton class="mr-2" @click="handleInfoModal">Info</ElButton>
      <ElButton type="success" class="mr-2" @click="handleSuccessModal">Success</ElButton>
      <ElButton type="danger" class="mr-2" @click="handleErrorModal">Error</ElButton>
      <ElButton type="warning" class="mr-2" @click="handleWarningModal">Warning</ElButton>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Notification 用法与上面一致">
      <ElButton class="mr-2" @click="handleNotify('info')">Info</ElButton>
      <ElButton type="success" class="mr-2" @click="handleNotify('success')">Success</ElButton>
      <ElButton type="danger" class="mr-2" @click="handleNotify('error')">Error</ElButton>
      <ElButton type="warning" class="mr-2" @click="handleNotify('warning')">Warning</ElButton>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, CollapseContainer },
  setup() {
    const { createMessage, createConfirm, createSuccessModal, createInfoModal, createErrorModal, createWarningModal, createNotification } = useMessage()
    const { info, success, warning, error } = createMessage

    function handleLoading() {
      const t = createMessage.loading('Loading...')

      setTimeout(() => {
        t.close()
      }, 3000)
    }

    function handleConfirm(type: 'warning' | 'error' | 'success' | 'info') {
      createConfirm({
        title: 'Tip',
        message: 'content message...',
        type,
      })
    }
    function handleSuccessModal() {
      createSuccessModal({ title: 'Tip', message: 'content message...' })
    }
    function handleErrorModal() {
      createErrorModal({ title: 'Tip', message: 'content message...' })
    }
    function handleWarningModal() {
      createWarningModal({ title: 'Tip', message: 'content message...' })
    }
    function handleInfoModal() {
      createInfoModal({ title: 'Tip', message: 'content message...' })
    }
    function handleNotify(type: 'warning' | 'error' | 'success' | 'info') {
      createNotification({
        title: 'Tip',
        message: 'content message...',
        type,
      })
    }
    return {
      infoMsg: info,
      successMsg: success,
      warningMsg: warning,
      errorMsg: error,
      handleLoading,
      handleConfirm,
      handleSuccessModal,
      handleErrorModal,
      handleWarningModal,
      handleInfoModal,
      handleNotify,
    }
  },
})
</script>
