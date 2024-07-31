import * as echarts from 'echarts/core'

// echarts 图表并没有全部引入

import {
  BarChart, // 柱状图
  GaugeChart, // 仪表盘
  LineChart, // 折线图
  MapChart, // 地图
  PieChart, // 饼状图
} from 'echarts/charts'

import {
  AriaComponent, // Aria
  CalendarComponent, // Calendar
  DataZoomComponent, // DataZoom
  GraphicComponent, // Graphic
  GridComponent, // Grid
  LegendComponent, // Legend
  ParallelComponent, // Parallel
  PolarComponent, // Polar
  TimelineComponent, // Timeline
  TitleComponent, // Title
  ToolboxComponent, // Toolbox
  TooltipComponent, // Tooltip
  VisualMapComponent, // VisualMap
} from 'echarts/components'

// SVG渲染
import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  GaugeChart,
  SVGRenderer,
])

export default echarts
