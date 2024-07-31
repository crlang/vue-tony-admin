import { defineAsyncComponent } from 'vue'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'

import { noop } from '@/utils'

interface Options {
  size?: 'default' | 'small' | 'large'
  delay?: number
  timeout?: number
  loading?: boolean
  retry?: boolean
}

export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 100, timeout = 30000, loading = false, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading
      ? (
          <ElIcon class="is-loading" size={size}>
            <Loading />
          </ElIcon>
        )
      : undefined,
    // 如果超时，将显示错误组件
    // 默认值: Infinity
    // TODO
    timeout,
    // 定义组件是否可暂停。默认值：true
    delay,
    /**
     *
     * @param {*} error 错误消息对象
     * @param {*} retry 一个函数，指示当加载器 promise rejects 时 async 组件是否应该重试
     * @param {*} fail  错误结束
     * @param {*} attempts 允许的最大重试次数
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
          // 在获取错误时重试，最多3次尝试
            retry()
          }
          else {
            // 请注意，retry/fail 就像 promise 的 resolve/reject
            // 必须调用其中一个命令才能继续错误处理。
            fail()
          }
        },
  })
}
