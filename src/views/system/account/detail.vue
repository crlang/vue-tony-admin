<template>
  <PageWrapper :title="`${userInfo?.nickname || '用户'}的资料`" headerClass="pb-0" contentBackground>
    <template #toolbar>
      <el-button type="primary" :disabled="userInfo?.status === 0">修改资料</el-button>
      <el-button type="warning" :disabled="userInfo?.status === 0">修改密码</el-button>
      <el-button type="danger" v-if="userInfo?.status === 1">禁用账号</el-button>
      <el-button type="success" v-else-if="userInfo?.status === 0">启用账号</el-button>
    </template>
    <template #extra>
      <el-tabs class="mt-4" v-model="currentKey">
        <el-tab-pane name="detail" label="用户资料" />
        <el-tab-pane name="logs" label="操作日志" />
      </el-tabs>
    </template>

    <div class="p-4">
      <template v-if="currentKey == 'detail'">
        <BasicDescription
          :border="false"
          :column="3"
          :data="userInfo"
          :schema="accountDescSchema" />
      </template>

      <template v-if="currentKey == 'logs'">
        <BasicTable @register="registerRefundTable" />
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ElButton, ElTabs, ElTabPane } from 'element-plus';
import { useRoute } from 'vue-router';

import { useTabs } from '@/hooks/web/useTabs';
import { BasicDescription } from '@/components/BasicDescription';
import { BasicTable, useTable } from '@/components/BasicTable';

import { ResponseUserInfo } from '@/api/types';
import { ApiUserInfo, ApiUserLogs } from '@/api/user';
import { accountDescSchema, accountLogTableSchema } from './data';

export default defineComponent({
  name: 'AccountDetail',
  components: { ElButton, ElTabs, ElTabPane, BasicDescription, BasicTable },
  setup() {
    const route = useRoute();
    const userId = ref<string>(String(route.query?.id || ''));
    const currentKey = ref('detail');
    const { setTitle } = useTabs();
    const userInfo = ref<ResponseUserInfo | undefined>();

    const [registerRefundTable] = useTable({
      api: ApiUserLogs,
      searchInfo: { userId },
      columns: accountLogTableSchema,
      showIndexColumn: false,
    });

    function initInfo() {
      ApiUserInfo(userId.value)
        .then((res) => {
          userInfo.value = res;
        })
        .catch(() => {});
    }

    // 设置Tab的标题（不会影响页面标题）
    setTitle(`详情：用户(${userId.value})`);

    onMounted(() => {
      initInfo();
    });

    return {
      userId,
      userInfo,
      currentKey,

      accountDescSchema,
      registerRefundTable,
    };
  },
});
</script>
