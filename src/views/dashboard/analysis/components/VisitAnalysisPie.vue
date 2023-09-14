<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, watch } from 'vue';

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
      const piedata = props.datainfo || [];
      setOptions({
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: 'Tony',
            type: 'pie',
            radius: '85%',
            center: ['50%', '50%'],
            data: piedata,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
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
