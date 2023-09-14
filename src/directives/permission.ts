import type { Directive, DirectiveBinding } from 'vue';

import { usePermission } from '@/hooks/web/usePermission';

/**
 * 判断是否有权限
 *
 * Determine whether there is permission
 * @param el Element
 * @param binding
 */
function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

/**
 * 权限控制元素节点内容
 *
 * Permission Control Element Node Content
 * @Example v-auth="Fn"
 */
const authDirective: Directive = {
  mounted,
};

export default authDirective;
