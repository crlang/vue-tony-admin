<template>
  <el-card
    header="部门列表"
    class="h-full"
    shadow="never">
    <el-tree
      :data="treeData"
      :props="{ children: 'children', label: 'deptName' }"
      @current-change="handleSelect"
    />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { TreeType } from '@/components/Tree'
import { getDeptList } from '@/api/demo/system'
import { DeptListItem } from '@/api/demo/model/systemModel'

export default defineComponent({
  name: 'DeptTree',
  components: { },

  emits: ['select'],
  setup(_, { emit }) {
    const treeData = ref<TreeType[]>([])

    async function fetch() {
      treeData.value = (await getDeptList()) as unknown as TreeType[]
      console.log('treeData', treeData.value)
    }

    function handleSelect(treeNodeData:DeptListItem) {
      emit('select', treeNodeData)
    }

    onMounted(() => {
      fetch()
    })
    return { treeData, handleSelect }
  },
})
</script>
