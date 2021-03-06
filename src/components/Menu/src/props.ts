import type { Menu } from '@/router/types'
import type { PropType } from 'vue'

import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
import { ThemeEnum } from '@/enums/appEnum'
import { propTypes } from '@/utils/propTypes'
type MenuMode = 'horizontal' | 'vertical' | 'inline'
type MenuTheme = 'light' | 'dark'

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: propTypes.bool,
  inlineIndent: propTypes.number.def(20),
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE,
  },

  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: ThemeEnum.DARK,
  },
  inlineCollapsed: propTypes.bool,
  mixSider: propTypes.bool,

  isHorizontal: propTypes.bool,
  accordion: propTypes.bool.def(true),
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool,
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true),
}
