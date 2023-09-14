<template>
  <div>
    <ElDropdown @command="handleMenuClick">
      <div :class="prefixCls">
        <ElImage :class="`${prefixCls}__avatar`" :src="getUserInfo.avatar">
          <template #error>&nbsp;</template>
        </ElImage>
        <span :class="`${prefixCls}__name`">{{ getUserInfo.realName }}</span>
      </div>

      <template #dropdown>
        <ElDropdownMenu :class="`${prefixCls}-menulist`">
          <ElDropdownItem command="cpw">
            <SvgIcon class="mr-2" name="m_key" />
            <span>修改密码</span>
          </ElDropdownItem>
          <ElDropdownItem command="doc" v-if="getShowDoc">
            <SvgIcon class="mr-2" name="filetext" />
            <span>开发文档</span>
          </ElDropdownItem>
          <ElDropdownItem v-if="getUseLockPage" :divided="getShowDoc" command="lock">
            <SvgIcon class="mr-2" name="lock" />
            <span>锁定屏幕</span>
          </ElDropdownItem>
          <ElDropdownItem command="logout">
            <SvgIcon class="mr-2" name="poweroff" />
            <span>退出系统</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <LockAction @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElImage } from 'element-plus';

import { DOC_URL } from '@/settings/siteSetting';
import { useUserStore } from '@/store/modules/user';
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
import { useDesign } from '@/hooks/web/useDesign';
import { useModal } from '@/components/BasicModal';
import { openWindow } from '@/utils';
import { SvgIcon } from '@/components/SvgIcon';
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
import { useGo } from '@/hooks/web/usePage';

export default defineComponent({
  name: 'UserDropdown',
  components: {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElImage,
    LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    SvgIcon,
  },
  props: {
    itemClass: String,
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown');
    const { getShowDoc, getUseLockPage } = useHeaderSetting();
    const userStore = useUserStore();
    const go = useGo();

    const getUserInfo = computed(() => {
      const { nickname = '', avatar } = userStore.getUserInfo || {};
      return { realName: nickname, avatar };
    });

    const [register, { openModal }] = useModal();

    function handleMenuClick(e: 'logout' | 'doc' | 'lock' | 'cpw') {
      switch (e) {
        case 'logout':
          userStore.confirmLoginOut();
          break;
        case 'doc':
          openWindow(DOC_URL);
          break;
        case 'lock':
          openModal(true);
          break;
        case 'cpw':
          go('/system/change_password');
          break;
      }
    }

    return {
      prefixCls,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      register,
      getUseLockPage,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-user-dropdown';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
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

  &__avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    background-color: var(--header-background-hover-color);
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
