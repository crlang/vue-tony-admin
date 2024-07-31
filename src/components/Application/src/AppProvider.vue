<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { createAppProviderContext } from './useAppContext'
import { createBreakpointListen } from '@/hooks/event/useBreakpoint'
import { useAppStore } from '@/store/modules/app'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  setup(_, { slots }) {
    const isMobile = ref(false)
    const isSetState = ref(false)

    const appStore = useAppStore()

    // 监控屏幕断点信息变化
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
      handleRestoreState()
    })

    // 将变量注入全局
    createAppProviderContext({
      isMobile,
    })

    /**
     * 用于保持窗口更改前的状态
     */
    function handleRestoreState() {
      if (unref(isMobile)) {
        if (!unref(isSetState)) {
          isSetState.value = true
          const {
            menuSetting: { type: menuType, mode: menuMode, collapsed: menuCollapsed, split: menuSplit },
          } = appStore.getProjectConfig
          appStore.setProjectConfig({
            menuSetting: {
              type: MenuTypeEnum.SIDEBAR,
              mode: MenuModeEnum.INLINE,
              split: false,
            },
          })
          appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit })
        }
      }
      else {
        if (unref(isSetState)) {
          isSetState.value = false
          const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo
          appStore.setProjectConfig({
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit,
            },
          })
        }
      }
    }
    return () => slots.default?.()
  },
})
</script>
