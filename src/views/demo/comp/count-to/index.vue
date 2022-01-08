<template>
  <PageWrapper title="数字动画示例">
    <CardGrid
      class="my-2"
      :rows="4"
      center>
      <CardGridItem><CountTo
        prefix="$"
        :color="'#409EFF'"
        :startVal="1"
        :endVal="200000"
        :duration="8000" /></CardGridItem>
      <CardGridItem><CountTo
        suffix="$"
        :color="'red'"
        :startVal="1"
        :endVal="300000"
        :decimals="2"
        :duration="6000" /></CardGridItem>
      <CardGridItem><CountTo
        suffix="$"
        :color="'rgb(0,238,0)'"
        :startVal="1"
        :endVal="400000"
        :duration="7000" /></CardGridItem>
      <CardGridItem><CountTo
        separator="-"
        :color="'rgba(138,43,226,.6)'"
        :startVal="10000"
        :endVal="500000"
        :duration="8000" /></CardGridItem>
    </CardGrid>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CountTo } from '@/components/CountTo/index'
import { PageWrapper } from '@/components/Page'
import { CardGrid, CardGridItem } from '@/components/CardGrid'

export default defineComponent({
  components: {
    CountTo,
    PageWrapper,
    CardGrid,
    CardGridItem,
  },
})
</script>
<style lang="scss" scoped>
.count-to-demo {
  &-card {
    width: 50%;
    font-size: 30px;
    text-align: center;
  }
}
</style>
