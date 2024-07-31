<template>
  <PageWrapper
    title="单号：234231029431"
    description="组合详情"
    class="p-4"
    header-class="pb-0"
    content-background
  >
    <template #toolbar>
      <ElButton>操作一</ElButton>
      <ElButton>操作二</ElButton>
      <ElButton type="primary">主操作</ElButton>
    </template>

    <template #extra>
      <ElTabs v-model="tabActivedName">
        <ElTabPane name="detail" label="详情" />
        <ElTabPane name="rule" label="规则" />
      </ElTabs>
    </template>

    <div v-if="tabActivedName === 'detail'" class="pt-4 m-4">
      <ElDescriptions size="small" :column="2">
        <ElDescriptionsItem label="创建人">曲丽丽</ElDescriptionsItem>
        <ElDescriptionsItem label="订购产品">XX 服务</ElDescriptionsItem>
        <ElDescriptionsItem label="创建时间">2021-01-01</ElDescriptionsItem>
        <ElDescriptionsItem label="关联单据"><ElButton text>12421</ElButton></ElDescriptionsItem>
        <ElDescriptionsItem label="生效日期">2021-01-01 ~ 2022-01-01</ElDescriptionsItem>
        <ElDescriptionsItem label="备注">请于两个工作日内确认</ElDescriptionsItem>
      </ElDescriptions>

      <ElCard header="流程进度" class="mt-4">
        <ElSteps :active="1" finish-status="success">
          <ElStep title="创建项目">
            <template #description>
              <div>Tony</div>
              <p>2016-12-12 12:32</p>
            </template>
          </ElStep>
          <ElStep title="部门初审">
            <template #description>
              <p>Chad</p>
            </template>
          </ElStep>
          <ElStep title="财务复核" />
          <ElStep title="完成" />
        </ElSteps>
      </ElCard>

      <ElCard header="用户信息" class="mt-4">
        <ElDescriptions :column="3">
          <ElDescriptionsItem label="用户姓名">付小小</ElDescriptionsItem>
          <ElDescriptionsItem label="会员卡号">XX 32943898021309809423</ElDescriptionsItem>
          <ElDescriptionsItem label="身份证">3321944288191034921</ElDescriptionsItem>
          <ElDescriptionsItem label="联系方式">18112345678</ElDescriptionsItem>
          <ElDescriptionsItem label="联系地址" :span="2">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</ElDescriptionsItem>
        </ElDescriptions>

        <ElDescriptions title="信息组" :column="3">
          <ElDescriptionsItem label="某某数据">111</ElDescriptionsItem>
          <ElDescriptionsItem label="该数据更新时间">2017-08-08</ElDescriptionsItem>
          <ElDescriptionsItem label="某某数据">725</ElDescriptionsItem>
          <ElDescriptionsItem label="该数据更新时间">2017-08-08</ElDescriptionsItem>
        </ElDescriptions>

        <ElCard header="多层级信息组" class="mt-4">
          <ElDescriptions title="组名称" :column="3">
            <ElDescriptionsItem label="负责人">林东东</ElDescriptionsItem>
            <ElDescriptionsItem label="角色码">1234567</ElDescriptionsItem>
            <ElDescriptionsItem label="所属部门">XX公司 - YY部</ElDescriptionsItem>
            <ElDescriptionsItem label="过期时间">2017-08-08</ElDescriptionsItem>
            <ElDescriptionsItem label="描述" :span="2">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</ElDescriptionsItem>
          </ElDescriptions>
          <BasicDivider />
          <ElDescriptions title="组名称" :column="1">
            <ElDescriptionsItem label="学名">Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</ElDescriptionsItem>
          </ElDescriptions>
          <BasicDivider />
          <ElDescriptions title="组名称" :column="1">
            <ElDescriptionsItem label="负责人">付小小</ElDescriptionsItem>
            <ElDescriptionsItem label="角色码">1234568</ElDescriptionsItem>
          </ElDescriptions>
        </ElCard>
      </ElCard>
      <ElCard header="用户近半年来电记录" class="my-8">
        <ElEmpty />
      </ElCard>
      <BasicTable v-bind="registerTimeTableFields" @register="registerTimeTable" />
    </div>
    <div v-else class="pt-4 m-4">~~~ rule ~~~</div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElButton, ElCard, ElDescriptions, ElDescriptionsItem, ElEmpty, ElStep, ElSteps, ElTabPane, ElTabs } from 'element-plus'

import { refundTimeTableData, refundTimeTableSchema } from './data'
import { BasicTable, useTable } from '@/components/BasicTable'
import { BasicDivider } from '@/components/Basic'

export default defineComponent({
  components: {
    ElButton,
    ElTabs,
    ElTabPane,
    ElDescriptions,
    ElDescriptionsItem,
    ElStep,
    ElSteps,
    ElCard,
    ElEmpty,
    BasicDivider,
    BasicTable,
  },
  setup() {
    const tabActivedName = ref('detail')
    const registerTimeTableFields = reactive<any>({
      title: '退货进度',
      columns: refundTimeTableSchema,
      dataSource: refundTimeTableData,
      showIndexColumn: false,
      scroll: { y: 300 },
    })
    const [registerTimeTable] = useTable()
    return {
      registerTimeTableFields,
      registerTimeTable,
      tabActivedName,
    }
  },
})
</script>
