<template>
  <el-card header="部门列表" shadow="never">
    <el-tree
      :data="treeData"
      default-expand-all
      highlight-current
      :expand-on-click-node="false"
      :props="{ children: 'children', label: 'title' }"
      @current-change="handleSelect" />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ElCard, ElTree } from 'element-plus';

import { ApiDepartmentTreeList } from '@/api/department';

export default defineComponent({
  name: 'PartDepartment',
  components: { ElCard, ElTree },

  emits: ['select'],
  setup(_, { emit }) {
    const treeData = ref();

    async function fetch() {
      treeData.value = await ApiDepartmentTreeList();
    }

    function handleSelect(nodeData) {
      emit('select', nodeData);
    }

    onMounted(() => {
      fetch();
    });
    return { treeData, handleSelect };
  },
});
</script>
