import type { CSSProperties, DirectiveBinding, ObjectDirective } from 'vue';

interface IValue {
  width?: number;
  line?: number;
}

interface IOptions {
  [key: string]: CSSProperties;
}

const cssProperties: IOptions = {
  single: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  multiple: {
    display: '-webkit-box',
    overflow: 'hidden',
    wordBreak: 'break-all',
  },
};

/**
 * 文本溢出加省略号
 *
 * Text overflow with ellipsis
 * @Example v-ellipsis="Fn"
 */
const Ellipsis: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Array<IValue>>) {
    const { value = [100, 1], arg = 'single' } = binding;
    const [width, line] = value;
    Object.entries(cssProperties[arg]).forEach(([key, value]) => {
      el.style[key] = value;
    });
    el.style.width = `${width}px`;
    if (arg === 'multiple') {
      el.style.webkitLineClamp = `${line}`;
      el.style.webkitBoxOrient = 'vertical';
    }
  },
};

export default Ellipsis;
