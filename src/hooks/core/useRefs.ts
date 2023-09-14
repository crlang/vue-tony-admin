import type { Ref } from 'vue';

import { shallowRef, onBeforeUpdate } from 'vue';

/**
 * Ref 操作
 *
 * Ref operation
 */
export function useRefs(): {
  refs: Ref<HTMLElement[]>;
  setRefs: (index: number) => (el: HTMLElement) => void;
  } {
  const refs = shallowRef([]) as Ref<HTMLElement[]>;

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index: number) => (el: HTMLElement) => {
    refs.value[index] = el;
  };

  return {
    refs,
    setRefs,
  };
}
