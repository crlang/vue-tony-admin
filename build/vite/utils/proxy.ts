/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;

/**
 * Generate proxy
 */
export function createProxy({
  VITE_PROXY_API_URL,
  VITE_PROXY_UPLOAD_URL,
  VITE_GLOB_API_URL,
  VITE_GLOB_UPLOAD_URL,
}: {
  VITE_PROXY_API_URL: string;
  VITE_PROXY_UPLOAD_URL: string;
  VITE_GLOB_API_URL: string;
  VITE_GLOB_UPLOAD_URL: string;
}) {
  const ret: ProxyTargetList = {};
  const isHttps = (v) => /^https:\/\//.test(v);

  // 代理基础接口
  if (VITE_PROXY_API_URL !== '' && VITE_GLOB_API_URL !== '') {
    ret[VITE_PROXY_API_URL] = {
      target: VITE_GLOB_API_URL,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${VITE_PROXY_API_URL}`), ''),
      // https is require secure=false
      ...(isHttps(VITE_GLOB_API_URL) ? { secure: false } : {}),
    };
  }

  // 代理上传接口
  if (VITE_PROXY_UPLOAD_URL !== '' && VITE_GLOB_UPLOAD_URL !== '') {
    ret[VITE_PROXY_UPLOAD_URL] = {
      target: VITE_GLOB_UPLOAD_URL,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${VITE_PROXY_UPLOAD_URL}`), ''),
      ...(isHttps(VITE_GLOB_UPLOAD_URL) ? { secure: false } : {}),
    };
  }

  return ret;
}
