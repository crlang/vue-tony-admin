<template>
  <PageWrapper
    title="导出示例"
    description="可以选择导出格式">
    <BasicTable
      title="基础表格"
      :columns="columns"
      :dataSource="data">
      <template #toolbar>
        <el-button
          @click="modalVisible=true"
          :disabled="!data?.length">导出</el-button>
      </template>
    </BasicTable>
    <ExpExcelModal
      v-model:visible="modalVisible"
      @success="defaultHeader" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable } from '@/components/Table'
import { jsonToSheetXlsx, ExportModalResult } from '@/components/Excel'
import { PageWrapper } from '@/components/Page'
import { ExpExcelModal } from '@/components/Excel'
import { columns, data } from './data'

export default defineComponent({
  components: { ElButton, PageWrapper, BasicTable, ExpExcelModal },
  setup() {
    const modalVisible = ref(false)

    function defaultHeader({ filename, bookType }: ExportModalResult) {
      jsonToSheetXlsx({
        data: data,
        filename,
        write2excelOpts: {
          bookType,
        },
      })
    }

    return {
      modalVisible,
      columns,
      data,
      defaultHeader,
    }
  },
})
</script>
