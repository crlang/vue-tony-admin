<template>
  <PageWrapper
    title="进度条动画示例"
    contentBackground>
    <CardGrid
      class="m-20"
      center>
      <CardGridItem>
        <CircleProgress
          :size="300"
          :width="10"
          :progress="progressNum"
          :isAnimation="false" />
      </CardGridItem>
      <CardGridItem>
        <CircleProgress
          :size="300"
          :width="10"
          timeFunction="cubic-bezier(0.81, 1.67, 0.08, 1.67)"
          :progress="progressNum" />
      </CardGridItem>
      <CardGridItem>
        <CircleProgress
          :size="300"
          :width="10"
          :duration="3000"
          timeFunction="cubic-bezier(0.93, -0.67, 0, 1.67)"
          :progress="progressNum" />
      </CardGridItem>
      <CardGridItem>
        <CircleProgress
          :size="300"
          :width="10"
          :delay="3000"
          :progress="progressNum" />
      </CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CardGrid, CardGridItem } from '@/components/CardGrid'
import { CircleProgress } from '@/components/Progress'
import { randomNumber } from '@/utils/demo'

export default defineComponent({
  components: {
    CardGrid,
    CardGridItem,
    CircleProgress,
  },
  setup() {
    const progressNum = computed(() => {
      return randomNumber(60, 100)
    })
    return { progressNum }
  },
})
</script>
