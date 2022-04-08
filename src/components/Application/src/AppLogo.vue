<template>
  <div
    :class="getAppLogoClass"
    @click="goHome">
    <img src="@/assets/images/logo.png" />
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
import { GlobalThemeType } from '@/utils/types'

const props = defineProps({
  /**
   * The theme of the current parent component
   */
  theme: { type: String as PropType<GlobalThemeType> },
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

const getAppLogoClass = computed(() => [
  prefixCls,
  props.theme,
  !props.showTitle ? 'is-hide-logo' : '',
])

function goHome() {
  go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
}
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-logo';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  cursor: pointer;

  > img {
    width: var(--logo-size);
    height: var(--logo-size);
  }

  > span {
    margin-left: 16px;
    font-family: var(--font-family-logo);
    font-size: 33px;
    font-weight: 600;
  }
}
</style>
