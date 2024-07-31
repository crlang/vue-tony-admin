<template>
  <PageWrapper content-background title="按钮权限控制" description="必须处于后台权限模式才可测试此页面所展示的功能">
    <CurrentPermissionMode />
    <p>
      当前拥有的code列表:
      <span>{{ permissionStore.getPermCodeList }}</span>
    </p>
    <BasicDivider />
    <el-alert
      class="mt-4"
      type="info"
      title="点击后请查看按钮变化"
      show-icon
    />
    <BasicDivider />
    <ElButton
      type="primary"
      class="mr-2"
      :disabled="!isBackPremissionMode"
      @click="switchToken(2)"
    >
      点击切换按钮权限(用户id为2)
    </ElButton>
    <ElButton type="primary" :disabled="!isBackPremissionMode" @click="switchToken(1)">点击切换按钮权限(用户id为1,默认)</ElButton>

    <template v-if="isBackPremissionMode">
      <BasicDivider>组件方式判断权限</BasicDivider>
      <Authority value="1000">
        <ElButton type="primary" class="mx-4">拥有code ['1000']权限可见</ElButton>
      </Authority>

      <Authority value="2000">
        <ElButton color="success" class="mx-4">拥有code ['2000']权限可见</ElButton>
      </Authority>

      <Authority :value="['1000', '2000']">
        <ElButton color="error" class="mx-4">拥有code ['1000','2000']角色权限可见</ElButton>
      </Authority>

      <BasicDivider>函数方式方式判断权限</BasicDivider>
      <ElButton v-if="hasPermission('1000')" type="primary" class="mx-4">拥有code ['1000']权限可见</ElButton>

      <ElButton v-if="hasPermission('2000')" color="success" class="mx-4">拥有code ['2000']权限可见</ElButton>

      <ElButton v-if="hasPermission(['1000', '2000'])" color="error" class="mx-4">拥有code ['1000','2000']角色权限可见</ElButton>

      <BasicDivider>指令方式方式判断权限(该方式不能动态修改权限.)</BasicDivider>
      <ElButton v-auth="'1000'" type="primary" class="mx-4">拥有code ['1000']权限可见</ElButton>

      <ElButton v-auth="'2000'" color="success" class="mx-4">拥有code ['2000']权限可见</ElButton>

      <ElButton v-auth="['1000', '2000']" color="error" class="mx-4">拥有code ['1000','2000']角色权限可见</ElButton>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { usePermission } from '@/hooks/web/usePermission'
import { Authority } from '@/components/Authority'
import { usePermissionStore } from '@/store/modules/permission'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { BasicDivider } from '@/components/Basic'

export default defineComponent({
  components: { ElButton, BasicDivider, CurrentPermissionMode, Authority },
  setup() {
    const { hasPermission } = usePermission()
    const permissionStore = usePermissionStore()
    const appStore = useAppStore()
    const userStore = useUserStore()

    const isBackPremissionMode = computed(() => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK)

    async function switchToken(userId: number) {
      // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
      const token = `fakeToken${userId}`
      userStore.setToken(token)

      // 重新获取用户信息和菜单
      userStore.getUserInfoAction()
      permissionStore.changePermissionCode()
    }

    return {
      hasPermission,
      permissionStore,
      switchToken,
      isBackPremissionMode,
    }
  },
})
</script>
