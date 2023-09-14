import * as echarts from 'echarts/core';

// echarts 图表并没有全部引入

import {
  BarChart, // 柱状图
  LineChart, // 折线图
  PieChart, // 饼状图
  MapChart, // 地图
  GaugeChart, // 仪表盘
} from 'echarts/charts';

import {
  LegendComponent, // Legend
  TitleComponent, // Title
  TooltipComponent, // Tooltip
  GridComponent, // Grid
  PolarComponent, // Polar
  AriaComponent, // Aria
  ParallelComponent, // Parallel
  ToolboxComponent, // Toolbox
  DataZoomComponent, // DataZoom
  VisualMapComponent, // VisualMap
  TimelineComponent, // Timeline
  CalendarComponent, // Calendar
  GraphicComponent, // Graphic
} from 'echarts/components';

// SVG渲染
import { SVGRenderer } from 'echarts/renderers';

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
]);

export default echarts;
