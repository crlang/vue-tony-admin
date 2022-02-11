<template>
  <PageWrapper title="虚拟滚动示例">
    <el-divider>基础滚动示例</el-divider>
    <div class="virtual-scroll-demo-wrap">
      <VScroll
        :itemHeight="60"
        :items="data"
        :height="300">
        <template #default="{ item }">
          <div class="virtual-scroll-demo__item">
            {{ item.title }}
          </div>
        </template>
      </VScroll>
    </div>

    <el-divider>即使不可见，也预先加载50条数据，防止空白</el-divider>
    <div class="virtual-scroll-demo-wrap">
      <VScroll
        :items="data"
        :itemHeight="60"
        :height="300"
        :bench="50">
        <template #default="{ item }">
          <div class="virtual-scroll-demo__item">
            {{ item.title }}
          </div>
        </template>
      </VScroll>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDivider } from 'element-plus'
import { VScroll } from '@/components/VirtualScroll'
import { PageWrapper } from '@/components/Page'
import { data } from './data'

export default defineComponent({
  components: { ElDivider, VScroll, PageWrapper },
  setup() {
    return { data }
  },
})
</script>

<style lang="scss" scoped>
.virtual-scroll-demo {
  &-wrap {
    display: flex;
    justify-content: center;
    margin: 0 20%;
    background-color: var(--background-secondary-color);
  }

  &__item {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-grey-color);
  }
}
</style>
