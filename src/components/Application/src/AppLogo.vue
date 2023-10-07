<template>
  <div :class="prefixCls" @click="goHome">
    <img v-if="showLogo" src="@/assets/images/logo.png" :style="logoStyle" />
    <span v-if="showTitle" :style="titleStyle">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useGlobSetting } from '@/hooks/setting';
import { useGo } from '@/hooks/web/usePage';
import { useDesign } from '@/hooks/web/useDesign';
import { PageEnum } from '@/enums/pageEnum';
import { useUserStore } from '@/store/modules/user';

export default defineComponent({
  props: {
    showLogo: {
      type: Boolean,
      default: true,
    },
    logoSize: {
      type: String,
      default: '32px',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    titleSize: {
      type: String,
      default: '32px',
    },
    clickBack: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('app-logo');
    const userStore = useUserStore();
    const { title } = useGlobSetting();
    const go = useGo();

    const logoStyle = computed(() => {
      return {
        '--logo-size': props.logoSize,
      };
    });

    const titleStyle = computed(() => {
      return {
        '--title-size': props.titleSize,
      };
    });

    function goHome() {
      if (!props.clickBack) {
        return;
      }
      go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
    }

    return {
      prefixCls,
      title,
      goHome,
      logoStyle,
      titleStyle,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-logo';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  > img {
    width: var(--logo-size, 32px);
    min-height: var(--logo-size, 32px);
  }

  > span {
    margin-left: 16px;
    font-family: var(--font-family-logo);
    font-size: var(--title-size);
    font-weight: 600;
  }
}
</style>
