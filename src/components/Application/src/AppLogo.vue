<!--
 * @Author: crlang
 * @Date: 2021-09-29 17:55:24
-->
<template>
  <div
    :class="getAppLogoClass"
    @click="goHome">
    <img src="../../../assets/images/logo.png" />
    <span v-show="showTitle">{{ title }}</span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobSetting } from '@/hooks/setting'
import { useGo } from '@/hooks/web/usePage'
import { useDesign } from '@/hooks/web/useDesign'
import { PageEnum } from '@/enums/pageEnum'
import { useUserStore } from '@/store/modules/user'

const props = defineProps({
  /**
   * The theme of the current parent component
   */
  theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
  /**
   * The title is also displayed when the menu is collapsed
   */
  alwaysShowTitle: { type: Boolean },
})

const { prefixCls } = useDesign('app-logo')
const userStore = useUserStore()
const { title } = useGlobSetting()
const go = useGo()

const getAppLogoClass = computed(() => [prefixCls, props.theme, !props.showTitle ? 'is-hide-logo' : ''])

function goHome() {
  go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
}
</script>
<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-app-logo';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  > img {
    width: 44px;
  }

  > span {
    margin-left: 16px;
    font-family: var(--font-family-secondary);
    font-size: 33px;
    font-weight: 600;
    color: var(--heading-color);
  }
}

// html[data-theme='dark'] {
//   .#{$prefix-cls} {
//     > span {
//       color: #fff;
//     }
//   }
// }
</style>
