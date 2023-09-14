export interface CardItem {
  title: string;
  subject: string;
  desc: string;
  value: number;
  scale: number;
  mix: number;
}

export interface DateItem {
  name: string;
  k1: number;
  k2: number;
  k3: number;
}

export interface DateKLine {
  k1: number[];
  k2: number[];
  k3: number[];
}

export interface DateBasicItem {
  name: string;
  value: number;
}

export type DateModeType = 'day' | 'week' | 'month' | 'quarter' | 'year';
