<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #name="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #header>
            <span class="mr-2">{{ coo.label }}</span><BasicHelp :text="coo.label" />
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
import { BasicTable, useTable } from '@/components/Table'
import { getCustomHeaderColumns } from './tableData'
import { demoListApi } from '@/api/demo/table'
import { BasicHelp } from '@/components/Basic'

export default defineComponent({
  components: { BasicTable, BasicHelp },
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
