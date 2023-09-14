export type DateModeType = 'day' | 'week' | 'month' | 'quarter' | 'year';

/**
 * 分析统计-仪表盘
 */
export interface ParamsDashboardHomeStat {
  dateType?: DateModeType;
  startDate?: string;
  endDate?: string;
}

export interface DashboardCardItem {
  title: string;
  subject: string;
  desc: string;
  value: number;
  scale: number;
  mix: number;
}

export interface DashboardChartItem {
  name: string;
  value: number;
}

export interface DashboardChartKItem {
  name: string;
  k1: number[];
  k2: number[];
  k3: number[];
}

/**
 * 分析统计-仪表盘
 */
export interface ResponseDashboardHomeStat {
  cardInfo: DashboardCardItem[];
  viewsInfo: {
    viewsLine: DashboardChartKItem[];
    viewsPie: DashboardChartItem[];
  };
  orderInfo: {
    orderBar: DashboardChartKItem[];
    orderGauge: DashboardChartItem[];
  };
  productInfo: {
    productLine: DashboardChartItem[];
    productBar: DashboardChartItem[];
    productPie: DashboardChartItem[];
  };
}

export interface DashboardUserInfo {
  name: string;
  avatar: string;
  desc: string;
  projectCount: number;
  teamTotal: number;
  teamIndex: number;
  projectViews: number;
}
export interface DashboardProjectInfo {
  title: string;
  icon: string;
  desc: string;
  group: string;
  date: string;
}
export interface DashboardNavInfo {
  title: string;
  icon: string;
  color: string;
}
export interface DashboardNewsInfo {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}
export interface DashboardProgressInfo {
  content: string;
  desc: string;
  timestamp: string;
  size: 'large' | 'normal';
  type: 'success' | 'warning' | 'info' | 'primary' | 'danger';
  color: string;
  hollow: boolean;
}
export interface DashboardRatioInfo {
  value: number;
  name: string;
}

export interface ResponseDashboardWrokbench {
  userInfo: DashboardUserInfo;
  projectInfo: DashboardProjectInfo[];
  navInfo: DashboardNavInfo[];
  newsInfo: DashboardNewsInfo[];
  progressInfo: DashboardProgressInfo[];
  ratioInfo: DashboardRatioInfo[];
}
