<template>
  <PageWrapper title="Tree 操作示例">
    <ElRow :gutter="16">
      <ElCol :span="12">
        <ElCard header="右侧操作按钮/自定义图标">
          <ElTree :data="treeData" :render-content="actionList" />
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard header="右键菜单">
          <ElTree :data="treeData" @node-contextmenu="getRightMenuList" />
        </ElCard>
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElCol, ElRow, ElTree } from 'element-plus'

import { treeData } from './data'
import { useContextMenu } from '@/hooks/web/useContextMenu'
import type { CreateContextMenuOptions } from '@/components/ContextMenu'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  components: { ElCard, ElTree, ElRow, ElCol },
  setup() {
    const [createContextMenu] = useContextMenu()

    function handleSend(_node, _data, _store) {
      // do something
    }

    function getRightMenuList(event: MouseEvent) {
      const MenuItems = [
        {
          label: '新增',
          handler: () => {
            // do something
          },
          icon: 'ep:plus',
        },
        {
          label: '删除',
          handler: () => {
            // do something
          },
          icon: 'ep:delete',
        },
      ]

      const contextMenuOptions: CreateContextMenuOptions = { event, items: MenuItems }

      if (!contextMenuOptions.items?.length)
        return

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
          h(SvgIcon, {
            name: 'plus',
            class: 'mr-2',
            onClick: () => handleSend(node, data, store),
          }),
          h(SvgIcon, {
            name: 'filetext',
            class: 'mr-2',
          }),
        ),
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
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;

  > div {
    display: flex;
  }
}
</style>
