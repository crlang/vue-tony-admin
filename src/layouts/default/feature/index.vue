<template>
  <LayoutLockPage />
  <el-backtop v-if="getUseOpenBackTop" />
  <SettingDrawer
    v-if="getIsFixedSettingDrawer"
    :class="prefixCls" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useUserStoreWithOut } from '@/store/modules/user'

import { SettingButtonPositionEnum } from '@/enums/appEnum'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

import SessionTimeoutLogin from '@/views/sys/login/SessionTimeoutLogin.vue'
export default defineComponent({
  name: 'LayoutFeatures',
  components: {
    LayoutLockPage: createAsyncComponent(() => import('@/views/sys/lock/index.vue')),
    SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue')),
    SessionTimeoutLogin,
  },
  setup() {
    const { getUseOpenBackTop, getShowSettingButton, getSettingButtonPosition, getFullContent } = useRootSetting()
    const userStore = useUserStoreWithOut()
    const { prefixCls } = useDesign('setting-drawer-fearure')
    const { getShowHeader } = useHeaderSetting()

    const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)

    const getIsFixedSettingDrawer = computed(() => {
      if (!unref(getShowSettingButton)) {
        return false
      }
      const settingButtonPosition = unref(getSettingButtonPosition)

      if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
        return !unref(getShowHeader) || unref(getFullContent)
      }
      return settingButtonPosition === SettingButtonPositionEnum.FIXED
    })

    return {
      getUseOpenBackTop,
      getIsFixedSettingDrawer,
      prefixCls,
      getIsSessionTimeout,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-setting-drawer-fearure';

.#{$prefix-cls} {
  position: absolute;
  top: 45%;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: var(--white-color);
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 6px 0 0 6px;

  svg {
    width: 1em;
    height: 1em;
  }
}
</style>
