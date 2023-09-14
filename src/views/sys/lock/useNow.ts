import { reactive, toRefs } from 'vue';
import dayjs from 'dayjs';

import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';

/**
 * 动态时间
 * @param immediate
 */
export function useNow(immediate = true) {
  let timer: IntervalHandle;

  const state = reactive({
    year: 0,
    month: 0,
    week: '',
    day: 0,
    hour: '',
    minute: '',
    second: 0,
    meridiem: '',
  });

  /** 更新 */
  const update = () => {
    const now = dayjs();

    const h = now.format('HH');
    const m = now.format('mm');
    const s = now.get('s');

    state.year = now.get('y');
    state.month = now.get('M') + 1;
    state.day = now.get('D');
    state.hour = h;
    state.minute = m;
    state.second = s;
  };

  /** 启动 */
  function start() {
    update();
    clearInterval(timer);
    timer = setInterval(() => update(), 1000);
  }

  /** 停止 */
  function stop() {
    clearInterval(timer);
  }

  tryOnMounted(() => {
    immediate && start();
  });

  tryOnUnmounted(() => {
    stop();
  });

  return {
    ...toRefs(state),
    start,
    stop,
  };
}
