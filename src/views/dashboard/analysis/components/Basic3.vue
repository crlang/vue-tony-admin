<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';

import { useECharts } from '@/hooks/web/useECharts';

import { DateBasicItem } from '../data';

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    datainfo: {
      type: Array as PropType<DateBasicItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    const initChart = () => {
      const piedata = props.datainfo || [];

      setOptions({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '0%',
          icon: 'circle',
          left: 'center',
        },
        grid: { left: '1%', right: '1%', top: '3%', bottom: '0', containLabel: true },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['40%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 32,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: piedata,
          },
        ],
      });
    };

    watch(
      () => props.datainfo,
      () => {
        initChart();
      },
      { deep: true },
    );

    onMounted(initChart);

    return {
      chartRef,
    };
  },
});
</script>
