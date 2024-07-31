<template>
  <ElRow v-if="datainfo" class="ana-product" :gutter="32">
    <ElCol :span="8">
      <ElCard shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">
            转化率
          </div>
        </template>
        <Basic1 :datainfo="datainfo.productLine || []" />
      </ElCard>
    </ElCol>
    <ElCol :span="8">
      <ElCard shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">
            访问来源
          </div>
        </template>
        <Basic2 :datainfo="datainfo.productBar || []" />
      </ElCard>
    </ElCol>
    <ElCol :span="8">
      <ElCard shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">
            成交占比
          </div>
        </template>
        <Basic3 :datainfo="datainfo.productPie || []" />
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElCol, ElLoading, ElRow } from 'element-plus'

import Basic1 from './Basic1.vue'
import Basic2 from './Basic2.vue'
import Basic3 from './Basic3.vue'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, Basic1, Basic2, Basic3 },
  directives: {
    loading: ElLoading.directive,
  },
  props: {
    loading: {
      type: Boolean,
    },
    datainfo: {
      type: Object as PropType<Recordable>,
      default: null,
    },
  },
  setup() {
    return {}
  },
})
</script>
