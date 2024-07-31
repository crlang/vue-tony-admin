<template>
  <div class="main-out-box">
    <div class="">
      位于主框架外的页面
    </div>
    <ElButton class="mt-10" type="primary" @click="$router.go(-1)">
      返回
    </ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'MainOut',
  components: { ElButton },
})
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
