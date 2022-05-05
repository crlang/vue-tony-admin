<template>
  <PageWrapper title="Tree 操作示例">
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card header="右侧操作按钮/自定义图标">
          <el-tree
            :data="treeData"
            :render-content="actionList" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="右键菜单">
          <el-tree
            :data="treeData"
            @node-contextmenu="getRightMenuList" />
        </el-card>
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElTree, ElRow, ElCol } from 'element-plus'
import { treeData } from './data'
import { useContextMenu } from '@/hooks/web/useContextMenu'
import { CreateContextOptions } from '@/components/ContextMenu'
import { Delete, Position } from '@element-plus/icons'

export default defineComponent({
  components: { ElCard, ElTree, ElRow, ElCol },
  setup() {
    const [createContextMenu] = useContextMenu()

    function handleSend(node: any, data:any, store:any) {
      console.log('click send', node, data, store)
    }

    function getRightMenuList(event:MouseEvent, nodeData:any, node:any, nodeInstance:any) {
      console.log(event, nodeData, node, nodeInstance)

      const MenuItems = [
        {
          label: '新增',
          handler: () => {
            console.table('点击了新增', node)
          },
          icon: 'bi:plus',
        },
        {
          label: '删除',
          handler: () => {
            console.table('点击了删除', node)
          },
          icon: 'bx:bxs-folder-open',
        },
      ]

      const contextMenuOptions: CreateContextOptions = { event, items: MenuItems }

      if (!contextMenuOptions.items?.length) return

      createContextMenu(contextMenuOptions)
    }

    function actionList(h, { node, data, store }) {
      return h(
        'div',
        {
          class: 'demo-tree-action',
        },
        h('span', null, node.label),
        h(
          'div',
          null,
          h(
            Position,
            {
              class: 'mr-2',
              onClick: () => handleSend(node, data, store),
            }
          ),
          h(
            Delete,
            {
              class: 'mr-2',
            }
          )
        )
      )
    }

    return {
      treeData,
      actionList,
      getRightMenuList,
    }
  },
})
</script>

<style lang="scss">
  .demo-tree-action {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;

    > div {
      display: flex;
    }
  }
</style>
