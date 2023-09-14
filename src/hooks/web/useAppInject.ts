import { computed, unref } from 'vue';

import { useAppProviderContext } from '@/components/Application';

/**
 * 应用载入
 *
 * App inject
 */
export function useAppInject() {
  const values = useAppProviderContext();

  /**
   * 是否手机端
   */
  const getIsMobile = computed(() => unref(values.isMobile));

  return {
    getIsMobile,
  };
}
