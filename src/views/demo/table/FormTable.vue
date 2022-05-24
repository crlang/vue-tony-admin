<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <el-button
          type="primary"
          @click="getFormValues">获取表单数据</el-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable } from '@/components/BasicTable'
import { getBasicColumns, getFormConfig } from './data'
import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const [registerTable, { getFormRef }] = useTable({
      title: '开启搜索区域',
      api: demoListApi,
      columns: getBasicColumns(),
      useSearchForm: true,
      formConfig: getFormConfig(),
      rowKey: 'id',
    })
    const { createInfoModal } = useMessage()

    function getFormValues() {
      createInfoModal({
        title: '温馨提示',
        content: JSON.stringify(getFormRef().getFieldsValue()),
      })
    }

    return {
      registerTable,
      getFormValues,
    }
  },
})
</script>
