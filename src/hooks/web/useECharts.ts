import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { unref, nextTick, watch, computed, ref } from 'vue';
import { tryOnUnmounted, useDebounceFn, useTimeoutFn } from '@vueuse/core';

import { useEventListener } from '@/hooks/event/useEventListener';
import { useBreakpoint } from '@/hooks/event/useBreakpoint';
import echarts from '@/utils/lib/echarts';
import { isDark } from '@/logics/theme';

import { useMenuSetting } from '../setting/useMenuSetting';

/**
 * 使用Echarts图表
 *
 * Echarts
 * @param elRef
 * @param theme
 */
export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'default') {
  const { getCollapsed } = useMenuSetting();
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let removeResizeFn: Fn = () => {};

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    if (!isDark.value) {
      return cacheOptions.value as EChartsOption;
    }
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption;
  });

  /**
   * 初始化图表
   * @param t 主题
   */
  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  /**
   * 设置图表配置
   *
   * Set chart options
   * @param options
   * @param clear 是否先清空图表
   */
  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    return new Promise((resolve) => {
      if (unref(elRef)?.offsetHeight === 0) {
        useTimeoutFn(() => {
          setOptions(unref(getOptions));
          resolve(null);
        }, 30);
      }
      nextTick(() => {
        useTimeoutFn(() => {
          if (!chartInstance) {
            initCharts(isDark.value ? 'dark' : 'light');

            if (!chartInstance) return;
          }
          clear && chartInstance?.clear();

          chartInstance?.setOption(unref(getOptions));
          resolve(null);
        }, 30);
      });
    });
  }

  /**
   * 重新匹配图表大小
   *
   * Resize chart
   */
  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn',
      },
    });
  }

  watch(
    () => isDark.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts(theme ? 'dark' : 'light');
        setOptions(cacheOptions.value);
      }
    },
  );

  watch(
    () => getCollapsed,
    () => {
      useTimeoutFn(() => {
        resizeFn();
      }, 300);
    },
  );

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  /**
   * 获取图表实例
   *
   * Get chart instance
   */
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(isDark.value ? 'dark' : 'default');
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
