<template>
  <el-row class="ana-site" :gutter="32" v-if="datainfo">
    <el-col :span="16">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title ana-site__title">
            <span>流量趋势</span>
            <div class="ana-site__extra">
              <el-date-picker v-model="dateVal" type="daterange" range-separator="~" />
              <el-select v-model="dateType" placeholder="Select">
                <el-option
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
          </div>
        </template>
        <VisitAnalysis :type="dateType" :datainfo="datainfo.viewsLine || []" />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">转化占比</div>
        </template>
        <VisitAnalysisBar v-loading="loading" :type="dateType" :datainfo="datainfo.viewsPie || []" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElLoading, ElRow, ElCol, ElCard, ElSelect, ElOption, ElDatePicker } from 'element-plus';

import VisitAnalysis from './VisitAnalysis.vue';
import VisitAnalysisBar from './VisitAnalysisPie.vue';
import { DateModeType } from '../data';

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElSelect, ElOption, ElDatePicker, VisitAnalysisBar, VisitAnalysis },
  directives: {
    loading: ElLoading.directive,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    datainfo: {
      type: Object as PropType<Recordable>,
      default: null,
    },
  },
  setup() {
    const dateVal = ref<any>([new Date(), new Date()]);
    const dateType = ref<DateModeType>('week');
    const dateOptions = ref([
      { value: 'day', label: '按日' },
      { value: 'week', label: '按周' },
      { value: 'month', label: '按月' },
      { value: 'quarter', label: '按季度' },
      { value: 'year', label: '按年' },
    ]);

    return {
      dateType,
      dateVal,
      dateOptions,
    };
  },
});
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
