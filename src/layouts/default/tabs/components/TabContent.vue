<template>
  <ElDropdown
    ref="tabsDropdownRef"
    :trigger="getTrigger"
    @visible-change="handleContext"
    :popper-class="`${prefixCls}__popper`"
    @command="handleMenuEvent">
    <span v-if="getIsTabs">{{ getTitle }}</span>
    <Icon
      v-else
      name="ion:chevron-down" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in getDropMenuList"
          :key="index"
          :command="item.command"
          :disabled="item.disabled"
          :divided="item.divided">
          <Icon
            :name="item.icon"
            class="mr-2" />
          {{ item.text }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import type { TabContentProps } from '../types'

import { defineComponent, computed, unref, ref } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { Icon } from '@/components/Icon'
import { useTabDropdown } from '../useTabDropdown'
import { TabContentEnum } from '../types'

export default defineComponent({
  name: 'TabContent',
  components: { ElDropdown, ElDropdownItem, ElDropdownMenu, Icon },
  props: {
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null,
    },
    type: {
      type: Number as PropType<TabContentEnum>,
      default: 0,
    },
    prefixCls: String,
  },
  setup(props) {
    const tabsDropdownRef = ref()

    const getTitle = computed(() => {
      const { tabItem: { meta } = {} } = props
      return meta && meta.title
    })

    const getIsTabs = computed(() => props.type === TabContentEnum.TAB_TYPE)

    const getTrigger = computed((): 'contextmenu' | 'click' | 'hover' => (unref(getIsTabs) ? 'contextmenu' : 'hover'))

    const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(props as TabContentProps, getIsTabs)

    function handleContext(v: Boolean) {
      if (v === true && props.tabItem) {
        handleContextMenu(props.tabItem)
      }
    }

    function handleOpenDropdown() {
      tabsDropdownRef.value.handleOpen()
    }

    return {
      tabsDropdownRef,
      getDropMenuList,
      handleMenuEvent,
      handleContext,
      handleOpenDropdown,
      getTrigger,
      getIsTabs,
      getTitle,
    }
  },
})
</script>
