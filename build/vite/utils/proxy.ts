/**
 * 用于解析 .env.development 代理配置
 */
import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * 生成代理
 */
export function createProxy({
  VITE_PROXY_API_URL,
  VITE_GLOB_API_URL,
}: {
  VITE_PROXY_API_URL: string
  VITE_GLOB_API_URL: string
}) {
  const ret: ProxyTargetList = {}
  const isHttps = v => /^https:\/\//.test(v)

  // 代理API接口
  if (VITE_PROXY_API_URL !== '' && VITE_GLOB_API_URL !== '') {
    ret[VITE_PROXY_API_URL] = {
      target: VITE_GLOB_API_URL,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${VITE_PROXY_API_URL}`), ''),
      // https is require secure=false
      ...(isHttps(VITE_GLOB_API_URL) ? { secure: false } : {}),
    }
  }

  return ret
}
