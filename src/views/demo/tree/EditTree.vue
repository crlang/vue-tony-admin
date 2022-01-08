<template>
  <PageWrapper title="Tree函数操作示例">
    <div class="flex">
      <el-card
        class="w-1/2"
        header="右侧操作按钮/自定义图标">
        <el-tree
          class="w-full"
          :data="treeData"
          :render-content="actionList"
        />
      </el-card>
      <el-card
        class="w-1/2 mx-4"
        header="右键菜单">
        <el-tree
          :data="treeData"
          @node-contextmenu="getRightMenuList" />
      </el-card>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { treeData } from './data'
import { PageWrapper } from '@/components/Page'
import { useContextMenu } from '@/hooks/web/useContextMenu'
import { CreateContextOptions } from '@/components/ContextMenu'
import { Delete, Position } from '@element-plus/icons'
export type { ContextMenuItem } from '@/hooks/web/useContextMenu'

export default defineComponent({
  components: { PageWrapper },
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
            console.log('点击了新增', node)
          },
          icon: 'bi:plus',
        },
        {
          label: '删除',
          handler: () => {
            console.log('点击了删除', node)
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
        'span',
        {
          class: 'w-full flex justify-between items-center',
        },
        h('span', null, node.label),
        h(
          'div',
          null,
          h(
            Position,
            {
              class: 'mr-2',
              style: 'width: 1em; height: 1em;',
              onClick: () => handleSend(node, data, store),
            }
          ),
          h(
            Delete,
            {
              class: 'mr-2',
              style: 'width: 1em; height: 1em;',
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
