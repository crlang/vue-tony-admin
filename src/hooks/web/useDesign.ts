import { prefixCls } from '@/settings/designSetting';

/**
 * 页面设计定义
 *
 * Project design
 * @param scope
 */
export function useDesign(scope: string) {
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  };
}
