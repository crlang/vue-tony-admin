<template>
  <PageWrapper contentBackground>
    <BasicTable @register="registerTable">
      <template #id="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            ID: {{ scope.row.id }}
          </template>
        </el-table-column>
      </template>
      <template #no="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <el-tag type="success">
              {{ scope.row.no }}
            </el-tag>
          </template>
        </el-table-column>
      </template>
      <template #avatar="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <el-avatar
              :size="60"
              :src="scope.row.avatar" />
          </template>
        </el-table-column>
      </template>
      <template #imgArr="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <TableImg
              :size="60"
              :simpleShow="true"
              :imgList="scope.row.imgArr" />
          </template>
        </el-table-column>
      </template>
      <template #imgs="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <TableImg
              :size="60"
              :imgList="scope.row.imgs" />
          </template>
        </el-table-column>
      </template>
      <template #category="coo">
        <el-table-column
          :label="coo.label"
          :prop="coo.prop">
          <template #default="scope">
            <el-tag type="success">
              {{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTag, ElAvatar, ElTableColumn } from 'element-plus'
import { BasicTable, useTable, TableImg } from '@/components/Table'
import { demoListApi } from '@/api/demo/table'
import { getCustomCellColumns } from './tableData'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { ElTag, ElAvatar, ElTableColumn, PageWrapper, BasicTable, TableImg },
  setup() {
    const [registerTable] = useTable({
      title: '自定义列内容',
      titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
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
