import { nextTick, onActivated, onMounted } from 'vue'

/**
 * 在 OnMounted 或者 OnActivated 时触发
 *
 * @param hook callback func
 */
export function onMountedOrActivated(hook: AnyFunction) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
