<template>
  <PageWrapper title="全屏示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Window Full Screen">
      <ElButton type="primary" class="mr-2" @click="enter">Enter Window Full Screen</ElButton>
      <ElButton type="success" class="mr-2" @click="toggle">Toggle Window Full Screen</ElButton>

      <ElButton type="danger" class="mr-2" @click="exit">Exit Window Full Screen</ElButton>

      Current State: {{ isFullscreen }}
    </CollapseContainer>

    <CollapseContainer class="w-full mt-5 bg-white rounded-md" title="Dom Full Screen">
      <ElButton type="primary" class="mr-2" @click="toggleDom">Enter Dom Full Screen</ElButton>
    </CollapseContainer>

    <div ref="domRef" class="flex items-center justify-center w-1/2 h-64 mx-auto mt-10 bg-white rounded-md">
      <ElButton type="primary" class="mr-2" @click="toggleDom">Exit Dom Full Screen</ElButton>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { CollapseContainer } from '@/components/CollapseContainer'

export default defineComponent({
  components: { ElButton, CollapseContainer },
  setup() {
    const domRef = ref(null)
    const { enter, toggle, exit, isFullscreen } = useFullscreen()

    const { toggle: toggleDom } = useFullscreen(domRef)
    return {
      enter,
      toggleDom,
      toggle,
      isFullscreen,
      exit,
      domRef,
    }
  },
})
</script>
