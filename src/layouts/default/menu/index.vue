<script lang="tsx">
import type { PropType, CSSProperties } from 'vue'

import { computed, defineComponent, unref, toRef } from 'vue'
import { BasicMenu } from '@/components/Menu'
import { SimpleMenu } from '@/components/SimpleMenu'
import { AppLogo } from '@/components/Application'

import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { ScrollContainer } from '@/components/Container'

import { useGo } from '@/hooks/web/usePage'
import { useSplitMenu } from './useLayoutMenu'
import { propTypes } from '@/utils/propTypes'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useDesign } from '@/hooks/web/useDesign'
import { GlobalThemeType } from '@/utils/types'

export default defineComponent({
  name: 'LayoutMenu',
  props: {
    theme: String as PropType<GlobalThemeType>,

    splitType: {
      type: Number as PropType<MenuSplitTyeEnum>,
      default: MenuSplitTyeEnum.NONE,
    },

    isHorizontal: propTypes.bool,
    //  menu Mode
    menuMode: {
      type: [String] as PropType<Nullable<MenuModeEnum>>,
      default: '',
    },
  },
  setup(props) {
    const go = useGo()

    const {
      getMenuMode,
      getMenuType,
      getMenuTheme,
      getCollapsed,
      getCollapsedShowTitle,
      getAccordion,
      getIsHorizontal,
      getIsSidebarType,
      getSplit,
    } = useMenuSetting()
    const { getShowLogo } = useRootSetting()

    const { prefixCls } = useDesign('layout-menu')

    const { menusRef } = useSplitMenu(toRef(props, 'splitType'))

    const { getIsMobile } = useAppInject()

    const getComputedMenuMode = computed(() =>
      unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode)
    )

    const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme))

    const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType))

    const getUseScroll = computed(() => {
      return (
        !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTyeEnum.LEFT ||
            props.splitType === MenuSplitTyeEnum.NONE)
      )
    })

    const getWrapperStyle = computed((): CSSProperties => {
      return {
        height: `calc(100% - ${unref(getIsShowLogo) ? '64px' : '0px'})`,
      }
    })

    const getLogoClass = computed(() => {
      return [
        `${prefixCls}-logo`,
        unref(getComputedMenuTheme),
        {
          [`${prefixCls}--mobile`]: unref(getIsMobile),
        },
      ]
    })

    const getCommonProps = computed(() => {
      const menus = unref(menusRef)
      return {
        menus,
        items: menus,
        theme: unref(getComputedMenuTheme),
        accordion: unref(getAccordion),
        collapse: unref(getCollapsed),
        collapsedShowTitle: unref(getCollapsedShowTitle),
        onMenuClick: handleMenuClick,
      }
    })
    /**
       * click menu
       * @param menu
       */

    function handleMenuClick(path: string) {
      go(path)
    }

    function renderHeader() {
      if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null

      return (
        <AppLogo
          showTitle={!unref(getCollapsed)}
          class={unref(getLogoClass)}
          theme={unref(getComputedMenuTheme)}
        />
      )
    }

    function renderMenu() {
      const { menus, ...menuProps } = unref(getCommonProps)
      // console.log(menus);
      if (!menus || !menus.length) return null
      return !props.isHorizontal ? (
        <SimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} items={menus} />
      ) : (
        <BasicMenu
          {...(menuProps as any)}
          isHorizontal={props.isHorizontal}
          type={unref(getMenuType)}
          showLogo={unref(getIsShowLogo)}
          mode={unref(getComputedMenuMode as any)}
          items={menus}
        />
      )
    }

    return () => {
      return (
        <>
          {renderHeader()}
          {unref(getUseScroll) ? (
            <ScrollContainer style={unref(getWrapperStyle)}>{() => renderMenu()}</ScrollContainer>
          ) : (
            renderMenu()
          )}
        </>
      )
    }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-layout-menu';
$logo-prefix-cls: '#{$tonyname}-app-logo';
.#{$logo-prefix-cls}.#{$prefix-cls} {
  &-logo {
    height: $side-logo-height;
    padding: 16px;
    white-space: nowrap;
    background: var(--sider-background-color);

    &.is-hide-logo {
      padding: 16px 8px;
      transition: none;
    }

    > img {
      width: var(--logo-size);
      height: var(--logo-size);
    }

    > span {
      font-size: 18px;
      color: #fff;
    }
  }

  &--mobile {
    .#{$logo-prefix-cls} {
      &__title {
        opacity: 1;
      }
    }
  }
}
</style>
