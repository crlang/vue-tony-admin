<template>
  <PageWrapper title="后台权限示例" content-background>
    <CurrentPermissionMode />

    <ElAlert
      class="mt-4"
      type="info"
      title="点击后请查看左侧菜单变化"
      show-icon
    />

    <div class="mt-4">
      权限切换:
      <ElButtonGroup>
        <ElButton :disabled="!isBackPremissionMode" @click="switchToken(1)">获取用户id为1的菜单</ElButton>
        <ElButton :disabled="!isBackPremissionMode" @click="switchToken(2)">获取用户id为2的菜单</ElButton>
      </ElButtonGroup>

      <ElAlert
        class="mt-4"
        type="info"
        title="请先切换权限模式为后台权限模式"
        show-icon
      />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElAlert, ElButton, ElButtonGroup } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'
import { useUserStore } from '@/store/modules/user'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/modules/app'

export default defineComponent({
  components: { ElButton, ElAlert, ElButtonGroup, CurrentPermissionMode },
  setup() {
    const { refreshMenu } = usePermission()
    const userStore = useUserStore()
    const appStore = useAppStore()

    const isBackPremissionMode = computed(() => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK)

    async function switchToken(userId: number) {
      // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
      const token = `fakeToken${userId}`
      userStore.setToken(token)

      // 重新获取用户信息和菜单
      userStore.getUserInfoAction()
      refreshMenu()
    }

    return {
      RoleEnum,
      refreshMenu,
      switchToken,
      isBackPremissionMode,
    }
  },
})
</script>
