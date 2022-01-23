<template>
  <el-dropdown
    @command="handleMenuClick">
    <div :class="[prefixCls,itemClass]">
      <img
        :class="`${prefixCls}__avatar`"
        :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__name`">
        {{ getUserInfo.realName }}
      </span>
    </div>

    <template #dropdown>
      <el-dropdown-menu :class="`${prefixCls}-menulist`">
        <el-dropdown-item
          command="doc"
          v-if="getShowDoc"><Icon
            class="mr-2"
            icon="ion:document-text-outline" />{{ t('layout.header.dropdownItemDoc') }}</el-dropdown-item>
        <el-dropdown-item
          v-if="getUseLockPage"
          :divided="getShowDoc"
          command="lock"><Icon
            class="mr-2"
            icon="ion:lock-closed-outline" />{{ t('layout.header.tooltipLock') }}</el-dropdown-item>
        <el-dropdown-item
          command="logout"
          divided><Icon
            class="mr-2"
            icon="ion:power-outline" />{{ t('layout.header.dropdownItemLoginOut') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <LockAction @register="register" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { DOC_URL } from '@/settings/siteSetting'

import { useUserStore } from '@/store/modules/user'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'
import { useModal } from '@/components/Modal'

import headerImg from '@/assets/images/header.jpg'
import { openWindow } from '@/utils'
import { Icon } from '@/components/Icon'

import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

type MenuEvent = 'logout' | 'doc' | 'lock'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    Icon,
  },
  props: {
    itemClass: String,
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown')
    const { t } = useI18n()
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
      console.log('handle key', e)
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
      t,
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
