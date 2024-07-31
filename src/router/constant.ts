export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const EXCEPTION_COMPONENT = () => import('../views/core/exception/Exception.vue')

/**
 * 默认布局
 */
export const LAYOUT = () => import('@/layouts/default/index.vue')

/**
 * 上级布局
 */
export function getParentLayout(_name?: string) {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME,
      })
    })
}
