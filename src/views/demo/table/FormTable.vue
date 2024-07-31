<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <ElButton type="primary" @click="getFormValues">获取表单数据</ElButton>
      </template>
      <template #form-field10="{ model, field }">
        <ElInput v-model:modelValue="model[field]" placeholder="自定义slot" />
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { getBasicColumns, getFormConfig } from './data'
import { BasicTable, useTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, ElInput, BasicTable },
  setup() {
    const [registerTable, { getFormRef }] = useTable({
      title: '开启搜索区域',
      api: demoListApi,
      columns: getBasicColumns(),
      pagination: {},
      useSearchForm: true,
      formConfig: getFormConfig(),
      rowKey: 'id',
    })
    const { createInfoModal } = useMessage()

    function getFormValues() {
      createInfoModal({
        title: '温馨提示',
        message: JSON.stringify(getFormRef().getFieldsValue()),
      })
    }

    return {
      registerTable,
      getFormValues,
    }
  },
})
</script>
