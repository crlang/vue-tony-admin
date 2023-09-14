<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, watch } from 'vue';

import { useECharts } from '@/hooks/web/useECharts';

import { DateKLine, DateItem, DateModeType } from '../data';

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
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

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
        legend: {
          icon: 'circle',
          top: '0%',
          left: '5%',
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: '#556677',
          },
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c',
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
        },
        grid: { left: '1%', right: '1%', top: '10%', bottom: 0, containLabel: true },
        xAxis: [
          {
            type: 'category',
            data: xdata,
            axisLine: {
              lineStyle: {
                color: '#DCE2E8',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: '#556677',
              fontSize: 12,
              margin: 15,
            },
            axisPointer: {
              label: {
                padding: [0, 0, 10, 0],
                margin: 15,
                fontSize: 12,
              },
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8',
              },
            },
            axisLabel: {
              color: '#556677',
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: 'value',
            position: 'right',
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#556677',
              formatter: '{value}',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8',
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: 'K1',
            type: 'line',
            data: kdata.k1,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#9effff',
                },
                {
                  offset: 1,
                  color: '#9E87FF',
                },
              ]),
              shadowColor: 'rgba(158,135,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
          },
          {
            name: 'K2',
            type: 'line',
            data: kdata.k2,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#73DD39',
                },
                {
                  offset: 1,
                  color: '#73DDFF',
                },
              ]),
              shadowColor: 'rgba(115,221,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
          },
          {
            name: 'K3',
            type: 'line',
            data: kdata.k3,
            symbolSize: 1,
            yAxisIndex: 1,
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#fe9a',
                },
                {
                  offset: 1,
                  color: '#fe9a8b',
                },
              ]),
              shadowColor: 'rgba(254,154,139, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20,
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
