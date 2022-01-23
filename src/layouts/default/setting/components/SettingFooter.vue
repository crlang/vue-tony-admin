<template>
  <div :class="prefixCls">
    <el-button
      type="primary"
      @click="handleCopy">
      <CopyDocument /> {{ t('layout.setting.copyBtn') }}
    </el-button>

    <el-button
      type="warning"
      @click="handleResetSetting"
      class="my-3">
      <RefreshLeft /> {{ t('common.resetText') }}
    </el-button>

    <el-button
      type="danger"
      @click="handleClearAndRedo">
      <Refresh /> {{ t('layout.setting.clearBtn') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'

import { CopyDocument, RefreshLeft, Refresh } from '@element-plus/icons'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'

import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'

import { updateColorWeak } from '@/logics/theme/updateColorWeak'
import { updateGrayMode } from '@/logics/theme/updateGrayMode'
import defaultSetting from '@/settings/projectSetting'

export default defineComponent({
  name: 'SettingFooter',
  components: { CopyDocument, RefreshLeft, Refresh },
  setup() {
    const permissionStore = usePermissionStore()
    const { prefixCls } = useDesign('setting-footer')
    const { t } = useI18n()
    const { createSuccessModal, createMessage } = useMessage()
    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const appStore = useAppStore()

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(JSON.stringify(unref(appStore.getProjectConfig), null, 2))
      unref(isSuccessRef) &&
        createSuccessModal({
          title: t('layout.setting.operatingTitle'),
          content: t('layout.setting.operatingContent'),
        })
    }
    function handleResetSetting() {
      try {
        appStore.setProjectConfig(defaultSetting)
        const { colorWeak, grayMode } = defaultSetting
        // updateTheme(themeColor)
        updateColorWeak(colorWeak)
        updateGrayMode(grayMode)
        createMessage.success(t('layout.setting.resetSuccess'))
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
      t,
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
