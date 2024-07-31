export function isValidWidthUnit(val: string | number): boolean {
  if (typeof val === 'number') {
    return true
  }
  return ['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some(unit => val.endsWith(unit)) || val.startsWith('calc')
}

export const isValidComponentSize = (val: string) => ['', 'large', 'default', 'small'].includes(val)

export const isValidDatePickType = (val: string) => ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'].includes(val)

export function isMobile(val: string | number) {
  const reg = /^1[3-9]\d{9}$/

  return reg.test(val)
}

export function validateMobile(_, value, callback) {
  if (!value) {
    return callback(new Error('请输入手机号码'))
  }
  else {
    if (isMobile(value)) {
      callback()
    }
    else {
      return callback(new Error('手机号码不正确'))
    }
  }
}
