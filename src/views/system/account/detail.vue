<template>
  <PageWrapper :title="`${userInfo?.nickname || '用户'}的资料`" header-class="pb-0" content-background>
    <template #toolbar>
      <ElButton type="primary" :disabled="userInfo?.status === 0">修改资料</ElButton>
      <ElButton type="warning" :disabled="userInfo?.status === 0">修改密码</ElButton>
      <ElButton v-if="userInfo?.status === 1" type="danger">禁用账号</ElButton>
      <ElButton v-else-if="userInfo?.status === 0" type="success">启用账号</ElButton>
    </template>
    <template #extra>
      <ElTabs v-model="currentKey" class="mt-4">
        <ElTabPane name="detail" label="用户资料" />
        <ElTabPane name="logs" label="操作日志" />
      </ElTabs>
    </template>

    <div class="p-4">
      <template v-if="currentKey === 'detail'">
        <BasicDescription
          :border="false"
          :column="3"
          :data="userInfo"
          :schema="accountDescSchema"
        />
      </template>

      <template v-if="currentKey === 'logs'">
        <BasicTable @register="registerRefundTable" />
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ElButton, ElTabPane, ElTabs } from 'element-plus'
import { useRoute } from 'vue-router'

import { accountDescSchema, accountLogTableSchema } from './data'
import { useTabs } from '@/hooks/web/useTabs'
import { BasicDescription } from '@/components/BasicDescription'
import { BasicTable, useTable } from '@/components/BasicTable'

import type { ResponseUserInfo } from '@/api/types'
import { ApiUserInfo, ApiUserLogs } from '@/api/user'

export default defineComponent({
  name: 'AccountDetail',
  components: { ElButton, ElTabs, ElTabPane, BasicDescription, BasicTable },
  setup() {
    const route = useRoute()
    const userId = ref<string>(String(route.query?.id || ''))
    const currentKey = ref('detail')
    const { setTitle } = useTabs()
    const userInfo = ref<ResponseUserInfo | undefined>()

    const [registerRefundTable] = useTable({
      api: ApiUserLogs,
      searchInfo: { userId },
      columns: accountLogTableSchema,
      showIndexColumn: false,
    })

    function initInfo() {
      ApiUserInfo(userId.value)
        .then((res) => {
          userInfo.value = res
        })
        .catch(() => {})
    }

    // 设置Tab的标题（不会影响页面标题）
    setTitle(`详情：用户(${userId.value})`)

    onMounted(() => {
      initInfo()
    })

    return {
      userId,
      userInfo,
      currentKey,

      accountDescSchema,
      registerRefundTable,
    }
  },
})
</script>
