<template>
  <div>
    <BasicTable
      @register="registerTable"
      @edit-change="handleEditChange">
      <template #action="coo">
        <el-table-column v-slot="scope">
          <TableAction :actions="createActions(scope.row, coo)" />
        </el-table-column>
      </template>
    </BasicTable>
    <el-button
      class="mt-4 mb-8"
      type="warning"
      @click="handleAdd">新增成员</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTableColumn, ElButton } from 'element-plus'
import { BasicTable, useTable, TableAction, BasicColumn, ActionItem, EditRecordRow } from '@/components/Table'

export default defineComponent({
  components: { ElTableColumn, ElButton, BasicTable, TableAction },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: '成员姓名',
        prop: 'name',
        edit: true,
      },
      {
        label: '工号',
        prop: 'no',
        edit: true,
      },
      {
        label: '所属部门',
        prop: 'dept',
        edit: true,
      },
    ]

    const data: any[] = [
      {
        name: 'John Brown',
        no: '00001',
        dept: 'New York No. 1 Lake Park',
      },
      {
        name: 'John Brown2',
        no: '00002',
        dept: 'New York No. 2 Lake Park',
      },
      {
        name: 'John Brown3',
        no: '00003',
        dept: 'New York No. 3Lake Park',
      },
    ]

    const [registerTable, { getDataSource }] = useTable({
      columns: columns,
      dataSource: data,
      actionColumn: {
        width: 160,
        label: '操作',
        prop: 'action',
        isSlot: true,
      },
    })

    function handleEdit(record: EditRecordRow) {
      record.onEdit?.(true)
    }

    function handleCancel(record: EditRecordRow) {
      record.onEdit?.(false)
      if (record.isNew) {
        const data = getDataSource()
        const index = data.findIndex((item) => item.key === record.key)
        data.splice(index, 1)
      }
    }

    function handleSave(record: EditRecordRow) {
      record.onEdit?.(false, true)
    }

    function handleEditChange(data: Recordable) {
      console.log(data)
    }

    function handleAdd() {
      const data = getDataSource()
      const addRow: EditRecordRow = {
        name: '',
        no: '',
        dept: '',
        editable: true,
        edit: true,
        isNew: true,
        key: `${Date.now()}`,
      }
      data.push(addRow)
    }

    function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
      if (!record.editable) {
        return [
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '删除',
          },
        ]
      }
      return [
        {
          label: '保存',
          onClick: handleSave.bind(null, record, column),
        },
        {
          label: '取消',
          popConfirm: {
            title: '是否取消编辑',
            confirm: handleCancel.bind(null, record, column),
          },
        },
      ]
    }

    return {
      registerTable,
      handleEdit,
      createActions,
      handleAdd,
      getDataSource,
      handleEditChange,
    }
  },
})
</script>
