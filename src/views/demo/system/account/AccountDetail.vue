<template>
  <PageWrapper
    :title="`用户${userId}的资料`"
    description="这是用户资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据"
    header-class="py-0-imp"
    content-background
  >
    <template #toolbar>
      <ElButton size="small" type="danger">禁用账号</ElButton>
      <ElButton size="small" type="primary">修改密码</ElButton>
    </template>
    <template #extra>
      <ElTabs v-model="currentKey" type="card" class="mt-4">
        <ElTabPane name="detail" label="用户资料" />
        <ElTabPane name="logs" label="操作日志" />
      </ElTabs>
    </template>

    <div class="pt-4 m-4">
      <template v-if="currentKey === 'detail'">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}资料Tab</div>
      </template>

      <template v-if="currentKey === 'logs'">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}操作日志Tab</div>
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton, ElTabPane, ElTabs } from 'element-plus'
import { useRoute } from 'vue-router'
import { useTabs } from '@/hooks/web/useTabs'

export default defineComponent({
  name: 'AccountDetail',
  components: { ElButton, ElTabs, ElTabPane },
  setup() {
    const route = useRoute()
    const userId = ref(route.params?.id)
    const currentKey = ref('detail')
    const { setTitle } = useTabs()
    // TODO
    // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

    // 设置Tab的标题（不会影响页面标题）
    setTitle(`详情：用户${userId.value}`)

    return { userId, currentKey }
  },
})
</script>
