<template>
  <div class="mt-2">
    当前权限模式:
    <el-button type="primary" plain>
      {{ permissionMode === PermissionModeEnum.BACK ? '后台权限模式' : '前端角色权限模式' }}
    </el-button>
    <el-button class="ml-4" @click="togglePermissionMode" type="primary">切换权限模式</el-button>
    <BasicDivider />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ElButton } from 'element-plus';

import { BasicDivider } from '@/components/Basic';
import { useAppStore } from '@/store/modules/app';
import { PermissionModeEnum } from '@/enums/appEnum';
import { usePermission } from '@/hooks/web/usePermission';

export default defineComponent({
  name: 'CurrentPermissionMode',
  components: { ElButton, BasicDivider },
  setup() {
    const appStore = useAppStore();
    const permissionMode = computed(() => appStore.getProjectConfig.permissionMode);
    const { togglePermissionMode } = usePermission();

    return {
      permissionMode,
      PermissionModeEnum,
      togglePermissionMode,
    };
  },
});
</script>
