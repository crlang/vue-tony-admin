import type { BarMap } from './types';
export const BAR_MAP: BarMap = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
};

export function renderThumbStyle({ move, size, bar }) {
  const style = {} as any;
  const translate = `translate${bar.axis}(${move}%)`;

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;

  return style;
}

export function toObject<T>(arr: Array<T>): Recordable<T> {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      Object.assign(res, arr[i]);
    }
  }
  return res;
}
