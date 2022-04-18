<template>
  <div
    :class="getClass"
    ref="wrapperRef">
    <div
      v-if="getShowheader"
      ref="headerRef"
      :class="getHeaderClass">
      <template v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template v-else-if="title">
        <div :class="`${prefixCls}-header__title`">{{ title }}</div>
      </template>
      <template v-if="$slots.description">
        <slot name="description"></slot>
      </template>
      <template v-else-if="description">
        <div :class="`${prefixCls}-header__description`">{{ description }}</div>
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

    <PageFooter
      v-if="getShowFooter"
      :prefixCls="`${prefixCls}-footer`"
      ref="footerRef">
      <template #left>
        <slot name="leftFooter"></slot>
      </template>

      <template #default>
        <slot name="footer"></slot>
      </template>

      <template #right>
        <slot name="rightFooter"></slot>
      </template>
    </PageFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import PageFooter from './PageFooter.vue'

import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'PageWrapper',
  components: { PageFooter },
  // inheritAttrs: false,
  props: {
    /**
     * Page header title
     */
    title: String,
    /**
     * Page header description
     */
    description: String,
    /**
     * Whether the header is full
     */
    headerFullHeight: Boolean,
    /**
     * Whether the header is fixed
     */
    headerFixed: Boolean,
    /**
     * Header class
     */
    headerClass: String,
    /**
     * Whether the content is full
     */
    contentFullHeight: Boolean,
    /**
     * Content class
     */
    contentClass: String,
    /**
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
      return (
        props?.title ||
        props?.description ||
        slots?.title ||
        slots?.description ||
        slots?.extra
      )
    })

    const getShowFooter = computed(() => {
      return (
        slots?.leftFooter ||
        slots?.rightFooter ||
        slots?.footer
      )
    })

    const getHeaderClass = computed(() => {
      const { headerFullHeight, headerFixed, headerClass } = props
      return [
        `${prefixCls}-header`,
        headerClass,
        {
          [`${prefixCls}-header--full`]: headerFullHeight,
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
      getShowFooter,
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

    &--full {
      padding: 0;
    }

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

    &__left,
    &__right {
      flex: 1;
    }
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
