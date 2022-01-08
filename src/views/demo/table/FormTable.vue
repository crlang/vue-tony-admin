<template>
  <BasicTable @register="registerTable">
    <template #form-custom>custom-slot</template>
    <template #toolbar>
      <el-button
        type="primary"
        @click="getFormValues">获取表单数据</el-button>
    </template>
  </BasicTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, useTable } from '@/components/Table'
import { getBasicColumns, getFormConfig } from './tableData'

import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const [registerTable, { getForm }] = useTable({
      title: '开启搜索区域',
      api: demoListApi,
      columns: getBasicColumns(),
      useSearchForm: true,
      formConfig: getFormConfig(),
      showTableSetting: true,
      rowKey: 'id',
    })
    const { createMessage } = useMessage()

    function getFormValues() {
      createMessage.success(JSON.stringify(getForm().getFieldsValue()))
    }

    return {
      registerTable,
      getFormValues,
    }
  },
})
</script>
