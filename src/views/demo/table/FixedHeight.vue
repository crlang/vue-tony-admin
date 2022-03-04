<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #name="{label,prop}">
        <el-table-column
          :label="label"
          :prop="prop">
          <template #header>
            <span class="mr-2">{{ label }}</span><BasicHelp :text="label" />
          </template>
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import { BasicTable, useTable } from '@/components/Table'
import { getCustomHeaderColumns } from './tableData'
import { demoListApi } from '@/api/demo/table'
import { BasicHelp } from '@/components/Basic'

export default defineComponent({
  components: { ElTableColumn, BasicTable, BasicHelp },
  setup() {
    const [registerTable] = useTable({
      title: '定高/头部自定义',
      api: demoListApi,
      columns: getCustomHeaderColumns(),
      height: 300,
    })

    return {
      registerTable,
    }
  },
})
</script>
