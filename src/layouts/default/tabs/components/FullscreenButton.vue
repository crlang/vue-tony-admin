<template>
  <span @click="handleFullscreen" :title="getIconText">
    <SvgIcon :name="getIcon" />
  </span>
</template>

<script lang="ts">
import { defineComponent, unref, computed } from 'vue';

import { SvgIcon } from '@/components/SvgIcon';
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { triggerWindowResize } from '@/utils/event';

export default defineComponent({
  name: 'FullscreenButton',
  components: { SvgIcon },
  setup() {
    const { getShowMenu, setMenuSetting } = useMenuSetting();
    const { getShowHeader, setHeaderSetting } = useHeaderSetting();

    const getIsUnFullscreen = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

    const getIcon = computed(() => (unref(getIsUnFullscreen) ? 'shrink' : 'arrowsalt'));

    const getIconText = computed(() => (unref(getIsUnFullscreen) ? '退出全屏' : '全屏'));

    function handleFullscreen() {
      const isUnFullscreen = unref(getIsUnFullscreen);
      setMenuSetting({
        show: isUnFullscreen,
        hidden: !isUnFullscreen,
      });
      setHeaderSetting({ show: isUnFullscreen });
      triggerWindowResize();
    }

    return { getIcon, getIconText, handleFullscreen };
  },
});
</script>
