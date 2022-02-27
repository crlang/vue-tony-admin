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
          @click="openModal()"
          type="primary"
          :disabled="!data?.length">导出</el-button>
      </template>
    </BasicTable>
    <ExpExcelModal
      @register="register"
      @success="defaultHeader" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable } from '@/components/Table'
import { jsonToSheetXlsx, ExportModalResult } from '@/components/Excel'
import { PageWrapper } from '@/components/Page'
import { ExpExcelModal } from '@/components/Excel'
import { columns, data } from './data'
import { useModal } from '@/components/Modal'

export default defineComponent({
  components: { ElButton, BasicTable, ExpExcelModal, PageWrapper },
  setup() {
    function defaultHeader({ filename, bookType }: ExportModalResult) {
      // 默认Object.keys(data[0])作为header
      jsonToSheetXlsx({
        data,
        filename,
        write2excelOpts: {
          bookType,
        },
      })
    }
    const [register, { openModal }] = useModal()

    return {
      defaultHeader,
      columns,
      data,
      register,
      openModal,
    }
  },
})
</script>
