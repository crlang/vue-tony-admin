<template>
  <ElCard header="部门列表" shadow="never">
    <ElTree
      :data="treeData"
      default-expand-all
      :props="{ children: 'children', label: 'deptName' }"
      @current-change="handleSelect"
    />
  </ElCard>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ElCard, ElTree } from 'element-plus'

import { getDeptList } from '@/api/demo/system'
import type { DeptListItem } from '@/api/demo/model/systemModel'

type ElTreeType = InstanceType<typeof ElTree>

export default defineComponent({
  name: 'DeptTree',
  components: { ElCard, ElTree },

  emits: ['select'],
  setup(_, { emit }) {
    const treeData = ref<ElTreeType[]>([])

    async function fetch() {
      treeData.value = (await getDeptList()) as unknown as ElTreeType[]
    }

    function handleSelect(treeNodeData: DeptListItem) {
      emit('select', treeNodeData)
    }

    onMounted(() => {
      fetch()
    })
    return { treeData, handleSelect }
  },
})
</script>
