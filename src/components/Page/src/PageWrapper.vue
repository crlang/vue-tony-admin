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
      ref="footerRef">
      <template #left>
        <slot name="leftFooter"></slot>
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
  inheritAttrs: false,
  props: {
    title: String,
    description: String,
    headerFullHeight: Boolean,
    headerFixed: Boolean,
    contentFullHeight: Boolean,
    contentClass: String,
    contentBackground: Boolean,
  },
  setup(props, { slots, attrs }) {
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headerRef = ref<HTMLDivElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)
    const footerRef = ref<HTMLDivElement | null>(null)
    const { prefixCls } = useDesign('page-wrapper')

    const getClass = computed(() => {
      const { contentFullHeight } = props

      return [
        prefixCls,
        attrs.class ?? {},
        {
          [`${prefixCls}__full`]: contentFullHeight,
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

    const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter)

    const getHeaderClass = computed(() => {
      const { headerFullHeight, headerFixed } = props
      return [
        `${prefixCls}-header`,
        {
          [`${prefixCls}-header-full`]: headerFullHeight,
          [`${prefixCls}-header-fixed`]: headerFixed,
        },
      ]
    })

    const getContentClass = computed(() => {
      const { contentBackground, contentFullHeight, contentClass } = props
      return [
        `${prefixCls}-content`,
        contentClass,
        {
          [`${prefixCls}-content-bg`]: contentBackground,
          [`${prefixCls}-content-full`]: contentFullHeight,
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
$prefix-cls: '#{$namespace}-page-wrapper';

.#{$prefix-cls} {
  position: relative;

  &__full {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  &-header {
    position: relative;
    padding: 16px 24px;
    background-color: #fff;

    &-full {
      padding: 0;
    }

    &-fixed {
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
  }

  &-content {
    padding: 16px;
    margin: 16px;
    overflow: hidden;

    &-full {
      height: 100%;
      overflow: auto;
    }
  }

  &-content-bg {
    background-color: var(--background-secondary-color);
  }
}
</style>
