<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :stripe="stripe"
      showIndexColumn
      :border="border"
      showTableSetting
      :pagination="pagination"
      @columns-change="handleColumnChange">
      <template #address="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
      </template>
      <template #toolbar>
        <el-button
          type="primary"
          @click="toggleBorder">
          {{ !border ? '显示边框' : '隐藏边框' }}
        </el-button>
        <el-button
          type="primary"
          @click="toggleLoading"> 开启loading </el-button>
        <el-button
          type="primary"
          @click="toggleStripe">
          {{ !stripe ? '显示斑马纹' : '隐藏斑马纹' }}
        </el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { PaginationProps } from '@/components/Table'
import { ElButton, ElTableColumn } from 'element-plus'
import { BasicTable, ColumnChangeParam } from '@/components/Table'
import { getBasicColumns, getBasicData } from './tableData'

export default defineComponent({
  components: { ElButton, ElTableColumn, BasicTable },
  setup() {
    const loading = ref(false)
    const stripe = ref(true)
    const border = ref(true)
    const pagination = ref<any>(null)
    function toggleStripe() {
      stripe.value = !stripe.value
    }
    function toggleLoading() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        pagination.value = { pageSize: 20 }
      }, 3000)
    }
    function toggleBorder() {
      border.value = !border.value
    }

    function handleColumnChange(data: ColumnChangeParam[]) {
      console.log('ColumnChanged', data)
    }

    return {
      columns: getBasicColumns(),
      data: getBasicData(),
      loading,
      stripe,
      border,
      toggleStripe,
      toggleLoading,
      toggleBorder,
      pagination,
      handleColumnChange,
    }
  },
})
</script>
