<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';

import { useECharts } from '@/hooks/web/useECharts';

import { DateModeType, DateBasicItem } from '../data';

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '280px',
    },
    type: {
      type: String as PropType<DateModeType>,
      default: 'day',
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
      const gaugedata = props.datainfo || [];

      setOptions({
        tooltip: {
          formatter: '{b0}完成进度{c0}%',
        },
        grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            radius: '90%',
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 84,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugedata,
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
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
