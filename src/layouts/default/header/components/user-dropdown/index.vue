<template>
  <ElDropdown @command="handleMenuClick">
    <div :class="[prefixCls, itemClass]">
      <img
        :class="`${prefixCls}__avatar`"
        :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__name`">
        {{ getUserInfo.realName }}
      </span>
    </div>

    <template #dropdown>
      <ElDropdownMenu :class="`${prefixCls}-menulist`">
        <ElDropdownItem
          command="doc"
          v-if="getShowDoc">
          <Icon
            class="mr-2"
            name="ion:document-text-outline" />
          文档
        </ElDropdownItem>
        <ElDropdownItem
          v-if="getUseLockPage"
          :divided="getShowDoc"
          command="lock">
          <Icon
            class="mr-2"
            name="ion:lock-closed-outline" />
          锁定屏幕
        </ElDropdownItem>
        <ElDropdownItem command="logout">
          <Icon
            class="mr-2"
            name="ion:power-outline" />
          退出系统
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
  <LockAction @register="register" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'

import { DOC_URL } from '@/settings/siteSetting'
import { useUserStore } from '@/store/modules/user'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useModal } from '@/components/BasicModal'
import { openWindow } from '@/utils'
import { Icon } from '@/components/Icon'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

import headerImg from '@/assets/images/header.jpg'

type MenuEvent = 'logout' | 'doc' | 'lock'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    Icon,
  },
  props: {
    itemClass: String,
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown')
    const { getShowDoc, getUseLockPage } = useHeaderSetting()
    const userStore = useUserStore()

    const getUserInfo = computed(() => {
      const { realName = '', avatar, desc } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || headerImg, desc }
    })

    const [register, { openModal }] = useModal()

    function handleLock() {
      openModal(true)
    }

    //  login out
    function handleLoginOut() {
      userStore.confirmLoginOut()
    }

    // open doc
    function openDoc() {
      openWindow(DOC_URL)
    }

    function handleMenuClick(e: MenuEvent) {
      switch (e) {
      case 'logout':
        handleLoginOut()
        break
      case 'doc':
        openDoc()
        break
      case 'lock':
        handleLock()
        break
      }
    }

    return {
      prefixCls,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      register,
      getUseLockPage,
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-header-user-dropdown';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  width: auto;
  height: var(--header-height);
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  color: var(--header-text-color);
  cursor: pointer;
  background-color: var(--header-background-color);

  &:hover {
    background-color: var(--header-background-hover-color);
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__avatar {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &-menulist {
    min-width: 160px;
  }
}
</style>
