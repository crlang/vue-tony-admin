<template>
  <div class="p-4">
    <BasicTable
      ref="tableRef"
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :stripe="stripe"
      showIndexColumn
      showCheckboxColumn
      :border="border"
      showTableSetting
      @columns-change="handleColumnChange">
      <template #address="{label,prop}">
        <el-table-column
          :label="label"
          :prop="prop">
          <template #default="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
      </template>
      <template #toolbar>
        <el-button
          type="primary"
          @click="toggleSelection">切换选中
        </el-button>
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
import type { TableActionType } from '@/components/Table'

import { defineComponent, ref, unref } from 'vue'
import { ElButton, ElTableColumn } from 'element-plus'
import { BasicTable } from '@/components/Table'
import { getBasicColumns, getBasicData } from './tableData'

export default defineComponent({
  components: { ElButton, ElTableColumn, BasicTable },
  setup() {
    const loading = ref(false)
    const stripe = ref(true)
    const border = ref(true)
    const tableRef = ref<Nullable<TableActionType>>(null) // 定义table ref，记得在末尾 return

    function getTable() {
      const table = unref(tableRef)
      if (!table) {
        throw new Error('tableAction is null')
      }
      return table as TableActionType
    }

    function toggleSelection() {
      getTable().toggleAllSelection()
    }
    function toggleStripe() {
      stripe.value = !stripe.value
    }
    function toggleLoading() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    function toggleBorder() {
      border.value = !border.value
    }

    // todo
    function handleColumnChange(data) {
      console.table('table column change', data)
    }

    return {
      tableRef,
      columns: getBasicColumns(),
      data: getBasicData(),
      loading,
      stripe,
      border,
      toggleSelection,
      toggleStripe,
      toggleLoading,
      toggleBorder,
      handleColumnChange,
    }
  },
})
</script>
