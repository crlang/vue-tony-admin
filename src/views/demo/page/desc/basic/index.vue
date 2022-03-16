<template>
  <PageWrapper
    title="基础详情页"
    contentBackground>
    <Description
      title="退款申请"
      size="small"
      :border="false"
      :column="3"
      :data="refundData"
      :schema="refundSchema"
    />
    <Description
      title="用户信息"
      size="small"
      class="mt-4"
      :border="false"
      :column="3"
      :data="personData"
      :schema="personSchema"
    />
    <BasicTable
      v-bind="registerRefundTableFields"
      @register="registerRefundTable" />
    <BasicTable
      v-bind="registerTimeTableFields"
      @register="registerTimeTable" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Description } from '@/components/Description'
import { BasicTable, useTable } from '@/components/Table'
import { PageWrapper } from '@/components/Page'

import {
  refundSchema,
  refundData,
  personSchema,
  personData,
  refundTableSchema,
  refundTimeTableSchema,
  refundTableData,
  refundTimeTableData
} from './data'
export default defineComponent({
  components: { Description, BasicTable, PageWrapper },
  setup() {
    const registerRefundTableFields = reactive<any>({
      title: '退货商品',
      dataSource: refundTableData,
      columns: refundTableSchema,
      showIndexColumn: false,
      scroll: { y: 300 },
      showSummary: true,
      summaryMethod: handleSummary,
    })

    const [registerRefundTable] = useTable()

    const registerTimeTableFields = reactive<any>({
      title: '退货进度',
      columns: refundTimeTableSchema,
      dataSource: refundTimeTableData,
      scroll: { y: 300 },
    })
    const [registerTimeTable] = useTable()

    function handleSummary(tableData: any[]) {
      let totalT5 = 0
      let totalT6 = 0
      tableData.forEach((item) => {
        totalT5 += item.t5
        totalT6 += item.t6
      })
      return [
        {
          t1: '总计',
          t5: totalT5,
          t6: totalT6,
        },
      ]
    }
    return {
      refundTableData,
      registerRefundTableFields,
      refundTimeTableData,
      registerRefundTable,
      registerTimeTableFields,
      registerTimeTable,
      refundSchema,
      refundData,
      personSchema,
      personData,
    }
  },
})
</script>

<style lang="scss" scoped>
.basic-desc-table {
  padding: 12px;

  &__title {
    height: 44px;
    padding: 0 7px;
    margin-bottom: -8px;
    font-size: 14px;
    line-height: 44px;
    border-bottom: 1px solid var(--border-grey-color)
  }
}
</style>
