<template>
  <div ref="wrapperRef" :class="getClass">
    <div v-if="getShowheader" ref="headerRef" :class="getHeaderClass">
      <div v-if="getTitle" :class="`${prefixCls}-header__title`">
        {{ getTitle }}
      </div>
      <template v-else>
        <slot name="title"></slot>
      </template>

      <div v-if="getDesc" :class="`${prefixCls}-header__description`">
        {{ getDesc }}
      </div>
      <template v-else>
        <slot name="description"></slot>
      </template>

      <div v-if="$slots.toolbar" :class="`${prefixCls}-header__toolbar`">
        <slot name="toolbar"></slot>
      </div>

      <template v-if="$slots.extra">
        <slot name="extra"></slot>
      </template>
    </div>

    <div ref="contentRef" :class="getContentClass">
      <slot></slot>
    </div>

    <template v-if="$slots.footer">
      <div :class="`${prefixCls}-footer`">
        <slot name="footer"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

import { PageWrapperFixedHeightKey } from './helper'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'PageWrapper',
  props: {
    /**
     * 页面标题(slot)
     */
    title: String,
    /**
     * 页面描述(slot)
     */
    description: String,
    /**
     * 当title和description不存在的时候，是否继承路由
     */
    inheritRouter: {
      type: Boolean,
      default: true,
    },
    /**
     * 头部 class
     */
    headerClass: String,
    /**
     * 内容区高度是否占满
     */
    contentFullHeight: Boolean,
    /**
     * 内容区 class
     */
    contentClass: String,
    /**
     * 内容区背景
     */
    contentBackground: Boolean,
  },
  setup(props, { slots }) {
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headerRef = ref<HTMLDivElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)
    const footerRef = ref<HTMLDivElement | null>(null)
    const { prefixCls } = useDesign('page-wrapper')
    const route = useRoute()

    // 根据提供的内容，自动判断是否高度占满
    provide(
      PageWrapperFixedHeightKey,
      computed(() => props.contentFullHeight),
    )

    const getClass = computed(() => {
      const { contentFullHeight } = props

      return [
        prefixCls,
        {
          [`${prefixCls}--full`]: contentFullHeight,
        },
      ]
    })

    const getTitle = computed(() => {
      const { title, inheritRouter } = props
      if (inheritRouter) {
        return title || route.meta.title || undefined
      }

      return title || undefined
    })

    const getDesc = computed(() => {
      const { description, inheritRouter } = props

      if (inheritRouter) {
        return description || route.meta.description || undefined
      }

      return description || undefined
    })
    const getShowheader = computed(() => {
      return !!(getTitle.value || slots?.title || getDesc.value || slots?.description || slots?.toolbar || slots?.extra)
    })

    const getHeaderClass = computed(() => {
      const { headerClass } = props
      return [`${prefixCls}-header`, headerClass]
    })

    const getContentClass = computed(() => {
      const { contentBackground, contentClass } = props
      return [
        `${prefixCls}-content`,
        contentClass,
        {
          [`${prefixCls}-content--background`]: contentBackground,
        },
      ]
    })

    return {
      prefixCls,
      wrapperRef,
      headerRef,
      contentRef,
      footerRef,
      getTitle,
      getDesc,
      getClass,
      getShowheader,
      getHeaderClass,
      getContentClass,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-page-wrapper';

.#{$prefix-cls} {
  position: relative;

  &-header {
    position: relative;
    padding: 16px;
    background-color: var(--background-primary-color);
    box-shadow: var(--card-shadow);

    &__title {
      font-size: 20px;
      font-weight: 600;
      line-height: 32px;
    }

    &__description {
      padding-top: 16px;
      color: var(--text-secondary-color);
    }

    &__toolbar {
      position: absolute;
      top: 16px;
      right: 16px;
    }

    /* stylelint-disable-next-line selector-class-pattern */
    .el-tabs__header {
      margin-bottom: 0;
    }
  }

  &-content {
    padding: 16px;
    overflow: hidden;

    &--full {
      height: 100%;
      overflow: auto;
    }

    &--background {
      background-color: var(--background-primary-color);
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--background-primary-color);
    border-top: 1px solid var(--border-color);
    box-shadow:
      0 -6px 16px -8px rgb(0 0 0 / 8%),
      0 -9px 28px 0 rgb(0 0 0 / 5%),
      0 -12px 48px 16px rgb(0 0 0 / 3%);
  }

  &--full {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .#{$prefix-cls}-header {
      flex-shrink: 0;
    }

    .#{$prefix-cls}-content {
      flex-grow: 1;
      overflow: auto;
    }

    .#{$prefix-cls}-footer {
      flex-shrink: 0;
    }
  }
}
</style>
