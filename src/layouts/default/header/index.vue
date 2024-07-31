<template>
  <ElHeader :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo v-if="getShowHeaderLogo || getIsMobile" :class="`${prefixCls}-logo`" :style="getLogoWidth" />
      <LayoutTrigger v-if="(getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile" :class="`${prefixCls}-trigger`" :sider="false" />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" />
    </div>

    <div v-if="getShowTopMenu && !getIsMobile" :class="`${prefixCls}-menu`">
      <LayoutMenu :is-horizontal="true" :split-type="getSplitType" :menu-mode="getMenuMode" />
    </div>

    <div :class="`${prefixCls}-action`">
      <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item`" />

      <UserDropDown :class="`${prefixCls}-action__item`" />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </ElHeader>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { ElHeader } from 'element-plus'

import LayoutMenu from '../menu/index.vue'
import LayoutTrigger from '../trigger/index.vue'
import { ErrorAction, FullScreen, LayoutBreadcrumb, Notify, UserDropDown } from './components'
import { AppLogo } from '@/components/Application'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'
import { SettingButtonPositionEnum } from '@/enums/appEnum'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    ElHeader,
    AppLogo,
    LayoutTrigger,
    LayoutBreadcrumb,
    LayoutMenu,
    UserDropDown,
    FullScreen,
    Notify,
    ErrorAction,
    SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue')),
  },
  setup() {
    const { prefixCls } = useDesign('layout-header')
    const { getShowTopMenu, getShowHeaderTrigger, getSplit, getIsMixMode, getMenuWidth, getIsMixSidebar } = useMenuSetting()
    const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition } = useRootSetting()

    const { getShowFullScreen, getShowNotice, getShowContent, getShowBread, getShowHeaderLogo, getShowHeader } = useHeaderSetting()

    const { getIsMobile } = useAppInject()

    const getHeaderClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--mobile`]: unref(getIsMobile),
        },
      ]
    })

    const getShowSetting = computed(() => {
      if (!unref(getShowSettingButton)) {
        return false
      }

      return unref(getShowHeader) && unref(getSettingButtonPosition) === SettingButtonPositionEnum.HEADER
    })

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile)) {
        return {}
      }
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth)
      return { width: `${width}px` }
    })

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE
    })

    const getMenuMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
    })

    return {
      prefixCls,
      getHeaderClass,
      getShowHeaderLogo,
      getShowHeaderTrigger,
      getIsMobile,
      getShowBread,
      getShowContent,
      getSplitType,
      getSplit,
      getMenuMode,
      getShowTopMenu,
      getShowFullScreen,
      getShowNotice,
      getUseErrorHandle,
      getLogoWidth,
      getIsMixSidebar,
      getShowSettingButton,
      getShowSetting,
    }
  },
})
</script>

<style lang="scss" src="./index.scss"></style>
