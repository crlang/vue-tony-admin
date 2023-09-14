/**
 * 列表-通知
 */
export interface ParamsNoticeList {
  type?: string;
}

/**
 * 详情-通知
 */
export interface ResponseNoticeInfo {
  id: string;
  avatar: string;
  title: string;
  titleDelete?: boolean;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: '' | 'success' | 'warning' | 'info' | 'danger';
}

export interface ResponseNoticeListItem {
  key: string;
  name: string;
  list: ResponseNoticeInfo[];
}

/**
 * 列表-通知
 */
export type ResponseNoticeList = ResponseNoticeListItem[];
