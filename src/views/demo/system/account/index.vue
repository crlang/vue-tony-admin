<template>
  <PageWrapper
    contentFullHeight
    fixedHeight
    content-class="p-4">
    <el-row
      class="dept-wrap"
      :gutter="16">
      <el-col
        :span="6"
        class="dept-tree">
        <DeptTree
          @select="handleSelect" />
      </el-col>

      <el-col
        :span="18"
        class="dept-table">
        <BasicTable
          @register="registerTable"
          :searchInfo="searchInfo">
          <template #toolbar>
            <el-button
              type="primary"
              @click="handleCreate">新增账号</el-button>
          </template>
          <template #action="coo">
            <el-table-column :label="coo.label">
              <template #default="scope">
                <TableAction
                  :actions="[
                    {
                      icon: 'clarity:info-standard-line',
                      label: '查看',
                      onClick: handleView.bind(null, scope.row),
                    },
                    {
                      icon: 'clarity:note-edit-line',
                      label: '编辑',
                      onClick: handleEdit.bind(null, scope.row),
                    },
                    {
                      icon: 'ep:delete',
                      color: 'error',
                      label: '删除',
                      onClick: handleDelete.bind(null, scope.row),

                    },
                  ]"
                />
              </template>
            </el-table-column>
          </template>
        </BasicTable>
      </el-col>
    </el-row>

    <AccountModal
      v-model:visible="modalVisible"
      @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElRow, ElCol, ElButton, ElTableColumn } from 'element-plus'

import { BasicTable, useTable, TableAction } from '@/components/Table'
import { getAccountList } from '@/api/demo/system'
import { PageWrapper } from '@/components/Page'
import DeptTree from './DeptTree.vue'

import AccountModal from './AccountModal.vue'
import { Document, Edit, Delete } from '@element-plus/icons'
import { useGo } from '@/hooks/web/usePage'
import { DeptListItem } from '@/api/demo/model/systemModel'
import { useMessage } from '@/hooks/web/useMessage'
import { columns, searchFormSchema } from './data'

export default defineComponent({
  name: 'AccountManagement',
  components: {
    ElRow,
    ElCol,
    ElButton,
    ElTableColumn,
    BasicTable,
    PageWrapper,
    DeptTree,
    AccountModal,
    TableAction,
  },
  setup() {
    const go = useGo()
    const { createConfirm, createMessage } = useMessage()

    const modalVisible = ref(false)
    const demodata = ref<Recordable[]>()

    function handleCreate() {
      modalVisible.value = true
      // openModal(true, {
      //   isUpdate: false
      // })
    }

    const searchInfo = reactive<Recordable>({})
    const [registerTable, { reload, updateTableDataRecord }] = useTable({
      title: '账号列表',
      api: getAccountList,
      rowKey: 'id',
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      showTableSetting: true,
      border: true,
      pagination: { size: 5 },
      handleSearchInfoFn(info) {
        console.log('handleSearchInfoFn', info)
        return info
      },
      actionColumn: {
        width: 120,
        label: '操作',
        prop: 'action',
        isSlot: true,
      },
    })

    function handleEdit(record: Recordable) {
      console.log(record)
      modalVisible.value = true
    }

    function handleDelete(record: Recordable) {
      console.log(record)
      createConfirm({ title: '温馨提示', content: '是否确认删除?', type: 'error' }).then(res => {
        console.log('', res)
        createMessage.success('删除成功')
      })
        .catch(err => {
          console.log(' err', err)
        })
    }

    function handleSuccess({ isUpdate, values }) {
      if (isUpdate) {
        // 演示不刷新表格直接更新内部数据。
        // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        const result = updateTableDataRecord(values.id, values)
        console.log(result)
      } else {
        reload()
      }
    }

    function handleSelect(deptItem:DeptListItem) {
      searchInfo.deptId = deptItem?.id
      reload()
    }

    function handleView(record: Recordable) {
      go('/system/account_detail/' + record.id)
    }

    return {
      modalVisible,
      searchInfo,
      registerTable,
      demodata,
      Document,
      Edit,
      Delete,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      handleView,
    }
  },
})
</script>
<style lang="scss" scoped>
.dept {
  &-wrap {
    // display: flex;
    height: 100%;
  }

  &-tree {
    height: 100%;
  }

  &-table {
    height: 100%;
    .#{$tonyname}-basic-table {
      height: calc(100% - 52px);
    }
  }
}

</style>
