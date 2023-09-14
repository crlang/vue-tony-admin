interface BasicPageParams {
  page: number;
  pageSize: number;
}

interface BasicFetchResult<T> {
  items: T[];
  page: number;
  total: number;
}

export type DemoParams = BasicPageParams;

export interface DemoListItem {
  id: string;
  beginTime: string;
  endTime: string;
  address: string;
  name: string;
  no: number;
  type: number;
  status: number;
}

export type DemoListGetResultModel = BasicFetchResult<DemoListItem>;
