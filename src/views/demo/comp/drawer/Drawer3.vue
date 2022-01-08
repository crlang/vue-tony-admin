<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Modal Title"
    width="50%"
    showFooter
    @ok="handleOk">
    <p
      class="h-20"
      v-for="index in 40"
      :key="index">根据屏幕高度自适应</p>
    <template #insertFooter>
      <el-button>btn</el-button>
    </template>
    <template #centerFooter>
      <el-button>btn2</el-button>
    </template>

    <template #appendFooter>
      <el-button>btn3</el-button>
    </template>

    <!-- <template #footer>
      <el-button> customerFooter</el-button>
    </template> -->
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDrawer } from '@/components/Drawer'
export default defineComponent({
  components: { BasicDrawer },
  setup() {
    return {
      handleOk: () => {
        console.log('ok')
      },
    }
  },
})
</script>
