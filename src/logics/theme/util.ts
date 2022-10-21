const docEle = document.documentElement
export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target || document.body
  let { className } = targetEl
  className = className.replace(clsName, '')
  targetEl.className = flag ? `${className} ${clsName} ` : className
}

export function setCssVar(prop: string, val: any, dom = docEle) {
  dom.style.setProperty(prop, val)
}

export function getCssVar(prop: string, dom = docEle) {
  return getComputedStyle(dom).getPropertyValue(prop) || ''
}
