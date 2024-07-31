<template>
  <PageWrapper title="打印示例">
    <ElButton type="primary" @click="jsonPrint">Json Print</ElButton>

    <ElButton
      type="primary"
      class="ml-5"
      :loading="printLoading"
      @click="imagePrint"
    >
      Image Print
    </ElButton>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import printJS from 'print-js'

export default defineComponent({
  name: 'AppLogo',
  components: { ElButton },
  setup() {
    const printLoading = ref(false)
    function jsonPrint() {
      printJS({
        printable: [
          { name: 'll', email: '123@gmail.com', phone: '123' },
          { name: 'qq', email: '456@gmail.com', phone: '456' },
        ],
        properties: ['name', 'email', 'phone'],
        type: 'json',
      })
    }

    function imagePrint() {
      printJS({
        printable: ['https://anncwb.github.io/anncwb/images/preview1.png', 'https://anncwb.github.io/anncwb/images/preview2.png'],
        type: 'image',
        header: 'Multiple Images',
        imageStyle: 'width:100%;',
        onLoadingStart() {
          printLoading.value = true
        },
        onLoadingEnd() {
          printLoading.value = false
        },
      })
    }
    return {
      jsonPrint,
      imagePrint,
      printLoading,
    }
  },
})
</script>
