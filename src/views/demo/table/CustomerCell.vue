<template>
  <PageWrapper content-background>
    <BasicTable @register="registerTable">
      <template #id="{ label, prop }">
        <ElTableColumn :label="label" :prop="prop">
          <template #default="scope">ID: {{ scope.row.id }}</template>
        </ElTableColumn>
      </template>
      <template #no="{ label, prop }">
        <ElTableColumn :label="label" :prop="prop">
          <template #default="scope">
            <ElTag type="success">
              {{ scope.row.no }}
            </ElTag>
          </template>
        </ElTableColumn>
      </template>
      <template #avatar="{ label, prop }">
        <ElTableColumn :label="label" :prop="prop">
          <template #default="scope">
            <ElAvatar :size="60" :src="scope.row.avatar" />
          </template>
        </ElTableColumn>
      </template>
      <template #category="{ label, prop }">
        <ElTableColumn :label="label" :prop="prop">
          <template #default="scope">
            <ElTag type="success">
              {{ scope.row.category }}
            </ElTag>
          </template>
        </ElTableColumn>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAvatar, ElTableColumn, ElTag } from 'element-plus'
import { getCustomCellColumns } from './data'
import { BasicTable, useTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElTag, ElAvatar, ElTableColumn, BasicTable },
  setup() {
    const [registerTable] = useTable({
      title: '自定义列内容',
      api: demoListApi,
      columns: getCustomCellColumns(),
      border: true,
      showTableSetting: true,
    })

    return {
      registerTable,
    }
  },
})
</script>
