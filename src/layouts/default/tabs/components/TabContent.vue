<template>
  <el-dropdown
    :trigger="getTrigger"
    @visible-change="handleContext"
    :popper-class="`${prefixCls}__contextmenu`"
    @command="handleMenuEvent">
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in getDropMenuList"
          :key="item.command"
          :command="item.command"
          :disabled="item.disabled"
          :divided="item.divided"> <Icon
            :icon="item.icon"
            class="mr-2" /> {{ item.text }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <div
      :class="`${prefixCls}__info`"
      v-if="getIsTabs">
      <span :class="`${prefixCls}__info-text`">{{ getTitle }}</span>
    </div>
    <div
      :class="tabClass"
      v-else>
      <Icon icon="ion:chevron-down" />
    </div>
  </el-dropdown>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

import { defineComponent, computed, unref } from 'vue'
import { Icon } from '@/components/Icon'

import { TabContentProps } from '../types'

import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { useTabDropdown } from '../useTabDropdown'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'

export default defineComponent({
  name: 'TabContent',
  components: { Icon },
  props: {
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null,
    },
    isExtra: Boolean,
    tabClass: String,
  },
  setup(props) {
    const { prefixCls } = useDesign('multiple-tabs-content')
    const { t } = useI18n()

    const getTitle = computed(() => {
      const { tabItem: { meta } = {} } = props
      return meta && t(meta.title as string)
    })

    const getIsTabs = computed(() => !props.isExtra)

    const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
      unref(getIsTabs) ? ['contextmenu'] : ['click']
    )
    const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()

    const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(props as TabContentProps, getIsTabs)

    function handleContext(v:Boolean) {
      if (v === true && props.tabItem) {
        handleContextMenu(props.tabItem)
      }
    }

    return {
      prefixCls,
      getDropMenuList,
      handleMenuEvent,
      handleContext,
      getTrigger,
      getIsTabs,
      getTitle,
      getShowQuick,
      getShowRedo,
      getShowFold,
    }
  },
})
</script>
