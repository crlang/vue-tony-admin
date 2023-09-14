<template>
  <LayoutLockPage />
  <ElBacktop v-if="getUseOpenBackTop" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" />
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
import { ElBacktop } from 'element-plus';

import { useRootSetting } from '@/hooks/setting/useRootSetting';
import { SettingButtonPositionEnum } from '@/enums/appEnum';
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

export default defineComponent({
  name: 'LayoutFeatures',
  components: {
    ElBacktop,
    LayoutLockPage: createAsyncComponent(() => import('@/views/sys/lock/index.vue')),
    SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue')),
  },
  setup() {
    const { getUseOpenBackTop, getShowSettingButton, getSettingButtonPosition } = useRootSetting();

    const getIsFixedSettingDrawer = computed(() => {
      if (!unref(getShowSettingButton)) {
        return false;
      }

      return unref(getSettingButtonPosition) === SettingButtonPositionEnum.FIXED;
    });

    return {
      getUseOpenBackTop,
      getIsFixedSettingDrawer,
    };
  },
});
</script>
