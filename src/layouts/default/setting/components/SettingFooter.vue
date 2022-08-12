<template>
  <div :class="prefixCls">
    <ElButton
      type="primary"
      @click="handleCopy">
      <CopyDocument />
      拷贝
    </ElButton>

    <ElButton
      type="warning"
      @click="handleResetSetting"
      class="my-3">
      <RefreshLeft />
      重置
    </ElButton>

    <ElButton
      type="danger"
      @click="handleClearAndRedo">
      <Refresh />
      清空缓存并返回登录页
    </ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'
import { ElButton } from 'element-plus'

import { CopyDocument, RefreshLeft, Refresh } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'

import { useDesign } from '@/hooks/web/useDesign'
import { useMessage } from '@/hooks/web/useMessage'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'

import { updateColorWeak } from '@/logics/theme/updateColorWeak'
import { updateGrayMode } from '@/logics/theme/updateGrayMode'
import defaultSetting from '@/settings/projectSetting'
import { toggleDarkMode } from '@/logics/theme/dark'

export default defineComponent({
  name: 'SettingFooter',
  components: { ElButton, CopyDocument, RefreshLeft, Refresh },
  setup() {
    const permissionStore = usePermissionStore()
    const { prefixCls } = useDesign('setting-footer')
    const { createSuccessModal, createMessage } = useMessage()
    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const appStore = useAppStore()

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(JSON.stringify(unref(appStore.getProjectConfig), null, 2))
      unref(isSuccessRef) &&
        createSuccessModal({
          title: '操作成功',
          content: '复制成功,请到 src/settings/projectSetting.ts 中修改配置！',
        })
    }
    function handleResetSetting() {
      try {
        appStore.setProjectConfig(defaultSetting)
        const { colorWeak, grayMode } = defaultSetting
        toggleDarkMode(false)
        updateColorWeak(colorWeak)
        updateGrayMode(grayMode)
        createMessage.success('重置成功！')
      } catch (error) {
        createMessage.error(error as string)
      }
    }

    function handleClearAndRedo() {
      localStorage.clear()
      appStore.resetAllState()
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
      location.reload()
    }
    return {
      prefixCls,
      handleCopy,
      handleResetSetting,
      handleClearAndRedo,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-setting-footer';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;

  > .el-button {
    flex: 1;
    margin: 0 12px;
    border-radius: 4px;

    svg {
      width: 1em;
      height: 1em;
      color: #fff;
    }
  }
}
</style>
