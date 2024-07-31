<template>
  <div class="fixed h-full w-full flex flex-col justify-center items-center text-4xl">
    <div class="">位于主框架外的页面</div>
    <ElButton class="mt-10" type="primary" @click="$router.go(-1)">Back</ElButton>
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
