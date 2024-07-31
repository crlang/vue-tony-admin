import { isNullOrUnDef } from '../is'

export interface CreateStorageParams {
  prefixKey: string
  storage: Storage
  timeout?: Nullable<number>
}
export function createStorage({ prefixKey = '', storage = sessionStorage, timeout = null }: Partial<CreateStorageParams> = {}) {
  /**
   * 缓存类
   * 构造参数可以传递到sessionStorage、localStorage或其组合中
   *
   * @class Cache
   */
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string

    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * 设置缓存
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      })

      this.storage.setItem(this.getKey(key), stringData)
    }

    /**
     * 读取缓存
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) {
        return def
      }

      try {
        const data = JSON.parse(val)
        const { value, expire } = data
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      }
      catch {
        return def
      }
    }

    /**
     * 删除缓存
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * 清空缓存
     */
    clear(): void {
      this.storage.clear()
    }
  }
  return new WebStorage()
}
