<template>
  <ElRow v-if="datainfo" class="ana-site" :gutter="32">
    <ElCol :span="16">
      <ElCard shadow="always">
        <template #header>
          <div class="dashboard-analysis__title ana-site__title">
            <span>订单趋势</span>
            <div class="ana-site__extra">
              <ElDatePicker v-model="dateVal" type="daterange" range-separator="~" />
              <ElSelect v-model="dateType" placeholder="Select">
                <ElOption
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </div>
          </div>
        </template>
        <OrderAnalysisBar :type="dateType" :datainfo="datainfo.orderBar || []" />
      </ElCard>
    </ElCol>
    <ElCol :span="8">
      <ElCard shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">
            任务进度
          </div>
        </template>
        <OrderAnalysis :type="dateType" :datainfo="datainfo.orderGauge || []" />
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElCard, ElCol, ElDatePicker, ElLoading, ElOption, ElRow, ElSelect } from 'element-plus'

import type { DateModeType } from '../data'
import OrderAnalysis from './OrderAnalysis.vue'
import OrderAnalysisBar from './OrderAnalysisBar.vue'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElSelect, ElOption, ElDatePicker, OrderAnalysis, OrderAnalysisBar },
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
    const dateVal = ref<any>([new Date(), new Date()])
    const dateType = ref<DateModeType>('quarter')
    const dateOptions = ref([
      { value: 'day', label: '按日' },
      { value: 'week', label: '按周' },
      { value: 'month', label: '按月' },
      { value: 'quarter', label: '按季度' },
      { value: 'year', label: '按年' },
    ])

    return {
      dateType,
      dateVal,
      dateOptions,
    }
  },
})
</script>

<style lang="scss" scoped>
.ana-site {
  margin: 2rem 0;

  &__title {
    position: relative;
  }

  &__extra {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;

    .el-select {
      width: 150px;
      margin-left: 8px;
    }
  }
}
</style>
