<template>
  <el-card shadow="hover">
    <template #header><div class="el-card__header--title">进展统计</div></template>
    <div ref="chartRef" :style="{ width, height }"></div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { ElCard } from 'element-plus';

import { useECharts } from '@/hooks/web/useECharts';

import { DashboardNewsInfo } from '@/api/types';

export default defineComponent({
  components: { ElCard },
  props: {
    datainfo: {
      type: Array as PropType<DashboardNewsInfo[]>,
      default: () => [],
    },
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '400px',
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

    function initChart() {
      const piedata = props.datainfo || [];

      setOptions({
        legend: {
          top: 'bottom',
        },
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: 'user',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: piedata,
          },
        ],
      });
    }

    onMounted(initChart);

    return { chartRef };
  },
});
</script>
