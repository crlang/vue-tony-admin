<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'

import type { DateBasicItem } from '../data'
import { useECharts } from '@/hooks/web/useECharts'

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
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
    const initChart = () => {
      const list = props.datainfo || []
      const xdata: string[] = []
      const ydata: number[] = []

      if (list?.length) {
        list.forEach((k) => {
          xdata.push(k.name)
          ydata.push(k.value)
        })
      }

      setOptions({
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xdata,
        },
        yAxis: {
          type: 'value',
        },
        grid: { left: '1%', right: '1%', top: '3%', bottom: '0', containLabel: true },
        series: [
          {
            data: ydata,
            type: 'line',
          },
        ],
      })
    }

    watch(
      () => props.datainfo,
      () => {
        initChart()
      },
      { deep: true },
    )

    onMounted(initChart)

    return {
      chartRef,
    }
  },
})
</script>
