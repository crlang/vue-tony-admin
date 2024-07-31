<template>
  <PageWrapper title="滚动组件函数示例">
    <div class="my-4">
      <ElButton @click="scrollTo(100)">
        滚动到100px位置
      </ElButton>
      <ElButton @click="scrollTo(800)">
        滚动到800px位置
      </ElButton>
      <ElButton @click="scrollTo(0)">
        滚动到顶部
      </ElButton>
      <ElButton @click="scrollBottom()">
        滚动到底部
      </ElButton>
    </div>
    <div class="scroll-wrap">
      <ScrollContainer ref="scrollRef" class="mt-4">
        <ul class="p-3">
          <li v-for="(k, i) in litdata" :key="i">
            {{ k }}
          </li>
        </ul>
      </ScrollContainer>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { ElButton } from 'element-plus'

import { litdata } from './data'
import { ScrollContainer } from '@/components/ScrollContainer'

import type { ScrollActionType } from '@/components/ScrollContainer'

export default defineComponent({
  components: { ElButton, ScrollContainer },
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
  background-color: var(--background-primary-color);

  li {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-color-light);
  }
}
</style>
