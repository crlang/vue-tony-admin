<template>
  <div
    :class="getClass"
    ref="wrapperRef">
    <div
      v-if="getShowheader"
      ref="headerRef"
      :class="getHeaderClass">
      <div
        v-if="title"
        :class="`${prefixCls}-header__title`">{{ title }}</div>
      <template v-else>
        <slot name="title"></slot>
      </template>

      <div
        v-if="description"
        :class="`${prefixCls}-header__description`">{{ description }}</div>
      <template v-else>
        <slot name="description"></slot>
      </template>

      <div
        :class="`${prefixCls}-header__toolbar`"
        v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </div>

      <template v-if="$slots.extra">
        <slot name="extra"></slot>
      </template>
    </div>

    <div
      :class="getContentClass"
      ref="contentRef">
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
import { defineComponent, computed, ref, provide } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'

import { PageWrapperFixedHeightKey } from './helper'

export default defineComponent({
  name: 'PageWrapper',
  props: {
    /**
     * 页面标题(slot)
     *
     * Page header title
     */
    title: String,
    /**
     * 页面描述(slot)
     *
     * Page header description
     */
    description: String,
    /**
     * 头部是否固定
     *
     * Whether the header is fixed
     */
    headerFixed: Boolean,
    /**
     * 头部 class
     *
     * Header class
     */
    headerClass: String,
    /**
     * 内容区高度是否占满
     *
     * Whether the content is full
     */
    contentFullHeight: Boolean,
    /**
     * 内容区 class
     *
     * Content class
     */
    contentClass: String,
    /**
     * 内容区背景
     *
     * Content background
     */
    contentBackground: Boolean,
  },
  setup(props, { slots }) {
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headerRef = ref<HTMLDivElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)
    const footerRef = ref<HTMLDivElement | null>(null)
    const { prefixCls } = useDesign('page-wrapper')

    // 根据提供的内容，自动判断是否高度占满
    // According to the provided content, automatically determine whether the height is full
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

    const getShowheader = computed(() => {
      return !!(
        props?.title ||
        slots?.title ||
        props?.description ||
        slots?.description ||
        slots?.toolbar ||
        slots?.extra
      )
    })

    const getHeaderClass = computed(() => {
      const { headerFixed, headerClass } = props
      return [
        `${prefixCls}-header`,
        headerClass,
        {
          [`${prefixCls}-header--fixed`]: headerFixed,
        },
      ]
    })

    const getContentClass = computed(() => {
      const { contentBackground, contentFullHeight, contentClass } = props
      return [
        `${prefixCls}-content`,
        contentClass,
        {
          [`${prefixCls}-content--background`]: contentBackground,
          [`${prefixCls}-content--full`]: contentFullHeight,
        },
      ]
    })

    return {
      prefixCls,
      wrapperRef,
      headerRef,
      contentRef,
      footerRef,
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

    &--fixed {
      position: sticky;
      top: 0;
      right: 0;
      left: 0;
      z-index: 999;
      box-shadow: var(--card-shadow);
    }

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
    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05),
      0 -12px 48px 16px rgba(0, 0, 0, 0.03);
  }

  &--full {
    display: flex;
    height: 100%;
    flex-direction: column;

    .#{$prefix-cls}-footer {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
    }
  }

}
</style>
