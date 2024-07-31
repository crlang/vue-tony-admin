<template>
  <PageWrapper title="数字动画示例" content-background>
    <CardGrid class="m-20" center>
      <CardGridItem>
        <CountTo
          suffix="$"
          color="red"
          :start-val="1"
          :end-val="300000"
          :decimals="2"
          :duration="6000"
        />
      </CardGridItem>
      <CardGridItem>
        <CountTo ref="countRef" :autoplay="false" @finished="handleFinished" />
        <ElButton @click="handleStart">
          Go
        </ElButton>
      </CardGridItem>
      <CardGridItem>
        <CountTo
          separator="-"
          color="rgba(138,43,226,.6)"
          :start-val="10000"
          :end-val="500000"
          :duration="8000"
        />
      </CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { CountTo } from '@/components/CountTo'
import { CardGrid, CardGridItem } from '@/components/CardGrid'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: {
    ElButton,
    CountTo,
    CardGrid,
    CardGridItem,
  },
  setup() {
    const countRef = ref()
    const { createMessage } = useMessage()

    function handleFinished() {
      createMessage.success('done')
    }
    function handleStart() {
      countRef.value.start()
    }

    return { countRef, handleStart, handleFinished }
  },
})
</script>
