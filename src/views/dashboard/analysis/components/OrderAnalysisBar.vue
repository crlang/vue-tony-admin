<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, watch } from 'vue';

import { useECharts } from '@/hooks/web/useECharts';

import { DateModeType, DateKLine, DateItem } from '../data';

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
      type: Array as PropType<DateItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

    const initChart = () => {
      const list = props.datainfo || [];
      const xdata: string[] = [];
      const kdata: DateKLine = {
        k1: [],
        k2: [],
        k3: [],
      };
      if (list?.length) {
        list.forEach((k) => {
          xdata.push(k.name);
          kdata.k1.push(k.k1);
          kdata.k2.push(k.k2);
          kdata.k3.push(k.k3);
        });
      }
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: xdata,
        },
        yAxis: {
          type: 'value',
        },
        grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
        series: [
          {
            data: kdata.k1,
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
          },
          {
            data: kdata.k2,
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
          },
          {
            data: kdata.k3,
            type: 'bar',
            emphasis: {
              focus: 'series',
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
