<template>
  <div>
    <BasicTable
      @register="registerTable"
      @edit-change="handleEditChange" />
    <el-button
      class="mt-4 mb-8"
      type="warning"
      @click="handleAdd">新增成员</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable, BasicColumn } from '@/components/Table'

export default defineComponent({
  components: { ElButton, BasicTable },
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
      {
        actions: [
          {
            text: '编辑',
            callback: handleEdit,
          },
          {
            text: '删除',
          },
        ],
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
    })

    function handleEdit(record) {
      record.onEdit?.(true)
    }

    function handleSave(record) {
      record.onEdit?.(false, true)
    }

    function handleEditChange(data) {
      console.log(data)
    }

    function handleAdd() {
      const data = getDataSource()
      const addRow = {
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

    function createActions(record, column: BasicColumn) {
      if (!record.editable) {
        return [
          {
            text: '编辑',
            onClick: handleEdit.bind(null, record),
          },
          {
            text: '删除',
          },
        ]
      }
      return [
        {
          text: '保存',
          onClick: handleSave.bind(null, record, column),
        },
        {
          text: '取消',
          // popConfirm: {
          //   title: '是否取消编辑',
          //   confirm: handleCancel.bind(null, record, column),
          // },
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
