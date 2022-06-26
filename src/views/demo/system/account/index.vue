<template>
  <PageWrapper
    contentFullHeight
    fixedHeight>
    <el-row
      class="dept-wrap"
      :gutter="16">
      <el-col
        :span="6"
        class="dept-tree">
        <DeptTree @select="handleSelect" />
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
              size="small"
              @click="handleCreate">新增账号</el-button>
          </template>
        </BasicTable>
      </el-col>
    </el-row>

    <AccountModal
      @register="registerModal"
      @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElRow, ElCol, ElButton } from 'element-plus'

import { BasicColumn, BasicTable, useTable } from '@/components/BasicTable'
import { getAccountList } from '@/api/demo/system'
import DeptTree from './DeptTree.vue'

import AccountModal from './AccountModal.vue'
import { Document, Edit, Delete } from '@element-plus/icons'
import { useGo } from '@/hooks/web/usePage'
import { DeptListItem } from '@/api/demo/model/systemModel'
import { useMessage } from '@/hooks/web/useMessage'
import { searchFormSchema } from './data'
import { useModal } from '@/components/BasicModal'

export default defineComponent({
  name: 'AccountManagement',
  components: {
    ElRow,
    ElCol,
    ElButton,
    BasicTable,
    DeptTree,
    AccountModal,
  },
  setup() {
    const go = useGo()
    const { createConfirm, createMessage } = useMessage()

    const [registerModal, { openModal }] = useModal()

    const columns: BasicColumn[] = [
      {
        label: '用户名',
        prop: 'account',
        width: 120,
      },
      {
        label: '昵称',
        prop: 'nickname',
        width: 120,
      },
      {
        label: '邮箱',
        prop: 'email',
        width: 120,
      },
      {
        label: '创建时间',
        prop: 'createTime',
        width: 180,
      },
      {
        label: '角色',
        prop: 'role',
        width: 200,
      },
      {
        label: '备注',
        prop: 'remark',
      },
      {
        width: 220,
        fixed: 'right',
        actions: [
          {
            icon: 'clarity:info-standard-line',
            text: '查看',
            callback: handleView,
          },
          {
            icon: 'clarity:note-edit-line',
            text: '编辑',
            callback: handleEdit,
          },
          {
            icon: 'ep:delete',
            text: '删除',
            callback: handleDelete,
          },
        ],
      },
    ]

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      })
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
      border: true,
      pagination: { pageSize: 5 },
      searchFn(info) {
        return info
      },
    })

    function handleEdit({ row }) {
      openModal(true, {
        record: row,
        isUpdate: true,
      })
    }

    function handleDelete({ row }) {
      createConfirm({ title: '温馨提示', content: `是否确认删除「${row.nickname}」?`, type: 'error' })
        .then(() => {
          createMessage.success('删除成功')
        })
        .catch(() => {})
    }

    function handleSuccess({ isUpdate, values }) {
      if (isUpdate) {
        // 演示不刷新表格直接更新内部数据。
        // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        updateTableDataRecord(values.id, values)
      } else {
        reload()
      }
    }

    function handleSelect(deptItem: DeptListItem) {
      searchInfo.deptId = deptItem?.id
      reload()
    }

    function handleView({ row }) {
      go('/system/account_detail/' + row.id)
    }

    return {
      searchInfo,
      registerTable,
      registerModal,
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
