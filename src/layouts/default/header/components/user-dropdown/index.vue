<template>
  <el-dropdown
    @command="handleMenuClick">
    <span
      :class="[prefixCls, `${prefixCls}--${theme}`]"
      class="flex">
      <img
        :class="`${prefixCls}__header`"
        :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span
          :class="`${prefixCls}__name`"
          class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

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
  <LockAction v-model:visible="lockScreenVisible" />
</template>
<script lang="ts">
// components

import { defineComponent, computed, ref } from 'vue'

import { DOC_URL } from '@/settings/siteSetting'

import { useUserStore } from '@/store/modules/user'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'
// import { useModal } from '@/components/Modal'

import headerImg from '@/assets/images/header.jpg'
import { propTypes } from '@/utils/propTypes'
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
    theme: propTypes.oneOf(['dark', 'light']),
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown')
    const { t } = useI18n()
    const { getShowDoc, getUseLockPage } = useHeaderSetting()
    const userStore = useUserStore()
    const lockScreenVisible = ref(false)

    const getUserInfo = computed(() => {
      const { realName = '', avatar, desc } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || headerImg, desc }
    })

    // const [register, { openModal }] = useModal()

    function handleLock() {
      lockScreenVisible.value = true
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
      lockScreenVisible,
      t,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      // register,
      getUseLockPage,
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-header-user-dropdown';

.#{$prefix-cls} {
  align-items: center;
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

  &__header {
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
