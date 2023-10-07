<template>
  <div class="main-out-box">
    <div class="">位于主框架外的页面</div>
    <el-button @click="$router.go(-1)" class="mt-10" type="primary">返回</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'MainOut',
  components: { ElButton },
});
</script>

<style lang="scss" scoped>
.main-out-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
