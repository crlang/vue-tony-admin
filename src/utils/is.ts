const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 是否已定义(Defined)
 * @param val

 */
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

/**
 * 是否未定义(Undefined)
 * @param val

 */
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

/**
 * 是否对象(Object)
 * @param val

 */
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

/**
 * 是否空内容(Empty)
 * @param val

 */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

/**
 * 是否日期(Date)
 * @param val

 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * 是否为空(Null)
 * @param val

 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * 是否为空且未定义(Undefined and Null)
 * @param val

 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

/**
 * 是否为空或者未定义(Undefined or Null)
 * @param val

 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * 是否数字(Number)
 * @param val

 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

/**
 * 是否期约(Promise)
 * @param val

 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * 是否字符串(String)
 * @param val

 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * 是否函数方法(Function)
 * @param val

 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * 是否布尔(Boolean)
 * @param val

 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * 是否正则表达式(RegExp)
 * @param val

 */
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

/**
 * 是否数组(Array)
 * @param val

 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * 是否客户端(Window)
 * @param val

 */
export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

/**
 * 是否元素(Element)
 * @param val

 */
export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

/**
 * 是否映射(Map)
 * @param val

 */
export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

/**
 * 是否服务端(Server)
 */
export const isServer = typeof window === 'undefined';

/**
 * 是否客户端(Window)
 */
export const isClient = !isServer;

/**
 * 是否地址(Url)
 * @param path
 */
export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}
