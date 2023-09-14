import { nextTick, onMounted, onActivated } from 'vue';

/**
 * 在 OnMounted 或者 OnActivated 时触发
 *
 * Triggered on OnMounted or OnActivated
 * @param hook callback func
 */
export function onMountedOrActivated(hook: AnyFunction) {
  let mounted: boolean;

  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });

  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}
