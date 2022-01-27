<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #action="coo">
        <el-table-column
          :width="coo.width"
          :label="coo.label"
          align="center"
          :prop="coo.prop">
          <template #default="scope">
            <TableAction
              :actions="[
                {
                  label: '启用',
                  onClick: handleOpen.bind(null, scope.row),
                  auth: 'admin' // 根据权限控制是否显示: 无权限，不显示
                },
                {
                  label: '编辑',
                  onClick: handleEdit.bind(null, scope.row),
                  auth: 'other' // 根据权限控制是否显示: 无权限，不显示
                },
                {
                  label: '删除',
                  icon: 'ic:outline-delete-outline',
                  onClick: handleDelete.bind(null, scope.row),
                  auth: 'admin' // 根据权限控制是否显示: 有权限，会显示
                }
              ]"
            />
          </template>
        </el-table-column>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import { BasicTable, useTable, BasicColumn, TableAction } from '@/components/Table'

import { demoListApi } from '@/api/demo/table'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElTableColumn, BasicTable, TableAction },
  setup() {
    const { createConfirm, createMessage } = useMessage()
    const columns:BasicColumn[] = [
      {
        label: '编号',
        prop: 'no',
        width: 100,
      },
      {
        label: '姓名',
        prop: 'name',
        auth: 'test', // 根据权限控制是否显示: 无权限，不显示
      },
      {
        label: '状态',
        prop: 'status',
      },
      {
        label: '地址',
        prop: 'address',
        auth: 'admin', // 同时根据权限和业务控制是否显示
        ifShow: true,
      },
      {
        label: '开始时间',
        prop: 'beginTime',
      },
      {
        label: '结束时间',
        prop: 'endTime',
      },
    ]
    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns,
      border: true,
      actionColumn: {
        width: 200,
        label: 'Action',
        prop: 'action',
        isSlot: true,
      },
    })
    function handleEdit(record: Recordable) {
      console.log('点击了编辑', record)
    }
    function handleDelete(record: Recordable) {
      console.log('点击了删除', record)
      createConfirm({
        title: '温馨提示',
        content: '是否删除当前文件？',
        type: 'warning',
      })
        .then(() => {
          createMessage.success('删除完成')
        })
        .catch(() => {
          createMessage.info('取消删除')
        })
    }
    function handleOpen(record: Recordable) {
      console.log('点击了启用', record)
    }
    return {
      registerTable,
      handleEdit,
      handleDelete,
      handleOpen,
    }
  },
})
</script>
