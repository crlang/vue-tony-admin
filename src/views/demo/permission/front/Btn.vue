<template>
  <PageWrapper
    title="前端权限按钮示例"
    content-background
    description="由于刷新的时候会请求用户信息接口，会根据接口重置角色信息，所以刷新后界面会恢复原样，如果不需要，可以注释 src/layout/default/index内的获取用户信息接口"
  >
    <CurrentPermissionMode />

    <p>
      当前角色:
      <span>{{ userStore.getRoleList }}</span>
    </p>
    <ElAlert
      class="mt-4"
      type="info"
      title="点击后请查看按钮变化"
      show-icon
    />

    <div class="mt-4">
      权限切换(请先切换权限模式为前端角色权限模式):
      <ElButtonGroup>
        <ElButton :type="isAdmin ? 'primary' : 'default'" @click="changeRole(RoleEnum.ADMIN)">
          {{ RoleEnum.ADMIN }}
        </ElButton>
        <ElButton :type="isTest ? 'primary' : 'default'" @click="changeRole(RoleEnum.TEST)">
          {{ RoleEnum.TEST }}
        </ElButton>
      </ElButtonGroup>
    </div>
    <BasicDivider>组件方式判断权限(有需要可以自行全局注册)</BasicDivider>
    <Authority :value="RoleEnum.ADMIN">
      <ElButton type="primary" class="mx-4">拥有admin角色权限可见</ElButton>
    </Authority>

    <Authority :value="RoleEnum.TEST">
      <ElButton type="success" class="mx-4">拥有test角色权限可见</ElButton>
    </Authority>

    <Authority :value="[RoleEnum.TEST, RoleEnum.ADMIN]">
      <ElButton type="danger" class="mx-4">拥有[test,admin]角色权限可见</ElButton>
    </Authority>

    <BasicDivider>函数方式方式判断权限(适用于函数内部过滤)</BasicDivider>
    <ElButton v-if="hasPermission(RoleEnum.ADMIN)" type="primary" class="mx-4">拥有admin角色权限可见</ElButton>

    <ElButton v-if="hasPermission(RoleEnum.TEST)" type="success" class="mx-4">拥有test角色权限可见</ElButton>

    <ElButton v-if="hasPermission([RoleEnum.TEST, RoleEnum.ADMIN])" type="danger" class="mx-4">拥有[test,admin]角色权限可见</ElButton>

    <BasicDivider>指令方式方式判断权限(该方式不能动态修改权限.)</BasicDivider>
    <ElButton v-auth="RoleEnum.ADMIN" type="primary" class="mx-4">拥有admin角色权限可见</ElButton>

    <ElButton v-auth="RoleEnum.TEST" type="success" class="mx-4">拥有test角色权限可见</ElButton>

    <ElButton v-auth="[RoleEnum.TEST, RoleEnum.ADMIN]" type="danger" class="mx-4">拥有[test,admin]角色权限可见</ElButton>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElAlert, ElButton, ElButtonGroup } from 'element-plus'
import CurrentPermissionMode from '../CurrentPermissionMode.vue'
import { useUserStore } from '@/store/modules/user'
import { RoleEnum } from '@/enums/roleEnum'
import { usePermission } from '@/hooks/web/usePermission'
import { Authority } from '@/components/Authority'
import { BasicDivider } from '@/components/Basic'

export default defineComponent({
  components: { ElButton, ElButtonGroup, ElAlert, BasicDivider, CurrentPermissionMode, Authority },
  setup() {
    const { changeRole, hasPermission } = usePermission()
    const userStore = useUserStore()

    return {
      userStore,
      RoleEnum,
      isAdmin: computed(() => userStore.getRoleList.includes(RoleEnum.ADMIN)),
      isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TEST)),
      changeRole,
      hasPermission,
    }
  },
})
</script>
