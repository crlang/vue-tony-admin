<template>
  <PageWrapper
    title="滚动组件函数示例"
    content="基于el-scrollbar">
    <div class="my-4">
      <el-button @click="scrollTo(100)">滚动到100px位置</el-button>
      <el-button @click="scrollTo(800)">滚动到800px位置</el-button>
      <el-button @click="scrollTo(0)">滚动到顶部</el-button>
      <el-button @click="scrollBottom()">滚动到底部</el-button>
    </div>
    <div class="scroll-wrap">
      <ScrollContainer
        class="mt-4"
        ref="scrollRef">
        <ul class="p-3">
          <li
            v-for="(k,i) in litdata"
            :key="i">{{ k }}</li>
        </ul>
      </ScrollContainer>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { ScrollContainer, ScrollActionType } from '@/components/Container/index'
import { PageWrapper } from '@/components/Page'
import { litdata } from './data'

export default defineComponent({
  components: { ScrollContainer, PageWrapper },
  setup() {
    const scrollRef = ref<Nullable<ScrollActionType>>(null)
    const getScroll = () => {
      const scroll = unref(scrollRef)
      if (!scroll) {
        throw new Error('scroll is Null')
      }
      return scroll
    }

    function scrollTo(top: number) {
      getScroll().scrollTo(top)
    }
    function scrollBottom() {
      getScroll().scrollBottom()
    }
    return {
      litdata,
      scrollTo,
      scrollRef,
      scrollBottom,
    }
  },
})
</script>

<style lang="scss" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background-color: var(--background-secondary-color);

  li {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-grey-color);
  }
}
</style>
