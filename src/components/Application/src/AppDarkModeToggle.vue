<template>
  <div v-if="getShowDarkModeToggle" :class="prefixCls" @click="toggleDark">
    <SvgIcon v-if="isDark" :class="`${prefixCls}-moon`" name="moon" />
    <SvgIcon v-else :class="`${prefixCls}-sun`" name="sun" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SvgIcon } from '@/components/SvgIcon';
import { useDesign } from '@/hooks/web/useDesign';
import { useRootSetting } from '@/hooks/setting/useRootSetting';
import { updateHeaderColor, updateSidebarColor, toggleDarkMode, isDark } from '@/logics/theme';

export default defineComponent({
  components: { SvgIcon },
  setup() {
    const { prefixCls } = useDesign('app-dark');
    const { getShowDarkModeToggle } = useRootSetting();

    function toggleDark() {
      toggleDarkMode();

      updateHeaderColor();
      updateSidebarColor();
    }

    return {
      prefixCls,
      getShowDarkModeToggle,
      toggleDark,
      isDark,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-app-dark';

.#{$prefix-cls} {
  position: relative;
  color: var(--text-primary-color);
  cursor: pointer;

  &-sun {
    color: #fbac13;
  }

  &-moon {
    color: #fcfeda;
  }
}
</style>
