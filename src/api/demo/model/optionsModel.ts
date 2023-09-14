interface BasicFetchResult<T> {
  items: T[];
  page: number;
  total: number;
}

export interface DemoOptionsItem {
  label: string;
  value: string;
}

export interface selectParams {
  id: number | string;
}

export type DemoOptionsGetResultModel = BasicFetchResult<DemoOptionsItem>;
