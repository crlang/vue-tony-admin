<template>
  <PageWrapper
    :title="`用户` + userId + `的资料`"
    content="这是用户资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据"
    headerFullHeight
    contentBackground>
    <template #extra>
      <el-button type="danger">禁用账号</el-button>
      <el-button type="primary">修改密码</el-button>
    </template>
    <template #footer>
      <el-tabs v-model="currentKey">
        <el-tab-pane
          name="detail"
          label="用户资料" />
        <el-tab-pane
          name="logs"
          label="操作日志" />
      </el-tabs>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <div
          v-for="i in 10"
          :key="i">这是用户{{ userId }}资料Tab</div>
      </template>
      <template v-if="currentKey == 'logs'">
        <div
          v-for="i in 10"
          :key="i">这是用户{{ userId }}操作日志Tab</div>
      </template>
    </div>
  </PageWrapper>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElButton, ElTabs, ElTabPane } from 'element-plus'
import { useRoute } from 'vue-router'
import { PageWrapper } from '@/components/Page'
import { useTabs } from '@/hooks/web/useTabs'

export default defineComponent({
  name: 'AccountDetail',
  components: { ElButton, ElTabs, ElTabPane, PageWrapper },
  setup() {
    const route = useRoute()
    // 此处可以得到用户ID
    const userId = ref(route.params?.id)
    const currentKey = ref('detail')
    const { setTitle } = useTabs()
    // TODO
    // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

    // 设置Tab的标题（不会影响页面标题）
    setTitle('详情：用户' + userId.value)

    return { userId, currentKey }
  },
})
</script>

<style></style>
