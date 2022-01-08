<!--
 * @Author: CRLang
 * @Description: List component
-->
<template>
  <ul :class="prefixCls+'-items'">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'List',
  components: {
  },
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    center: {
      type: Boolean,
      defalut: false,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('list')

    const getContentClass = computed(() => [
      prefixCls + '__container',
      'row-span' + props.rows,
      {
        [`items-center`]: unref(props.center),
      },
    ])

    return {
      prefixCls,
      getContentClass,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-list';

.#{$prefix-cls} {
  position: relative;

  * {
    outline: none;
  }

  &-pagination {
    margin-top: 24px;
    text-align: right;
  }

  &-more {
    margin-top: 12px;
    text-align: center;

    button {
      padding-right: 32px;
      padding-left: 32px;
    }
  }

  &-spin {
    min-height: 40px;
    text-align: center;
  }

  &-empty-text {
    padding: 16px;
    font-size: 14px;
    color: rgba(0, 0, 0, 25%);
    text-align: center;
  }

  &-items {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    color: rgba(0, 0, 0, 85%);
    border-bottom: 1px solid var(--border-base-color);

    &--card {
      border-bottom: none;
    }

    &-meta {
      display: flex;
      flex: 1;
      align-items: flex-start;
      max-width: 100%;

      &-avatar {
        margin-right: 16px;
      }

      &-content {
        flex: 1 0;
        width: 0;
        color: rgba(0, 0, 0, 85%);
      }

      &-title {
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 1.5  ;
        color: rgba(0, 0, 0, 85%);

        > a {
          color: rgba(0, 0, 0, 85%);
          transition: all 0.3s;

          // &:hover {
          //   color: $primary-color;
          // }
        }
      }

      &-description {
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 45%);
      }
    }

    &-action {
      padding: 0;
      margin-left: 48px;
      font-size: 0;
      list-style: none;
      flex: 0 0 auto;

      & > li {
        position: relative;
        display: inline-block;
        padding: 0 8px;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 45%);
        text-align: center;

        &:first-child {
          padding-left: 0;
        }
      }

      &-split {
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 14px;
        margin-top: -7px;
        background-color: #f0f0f0;
      }
    }
  }

  &-header {
    background: transparent;
  }

  &-footer {
    background: transparent;
  }

  &-header,
  &-footer {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &-empty {
    padding: 16px 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 45%);
    text-align: center;
  }

  &-split.#{$prefix-cls}-item {
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  &-split.#{$prefix-cls}-header {
    border-bottom: 1px solid #f0f0f0;
  }

  &-split.#{$prefix-cls}-empty.#{$prefix-cls}-footer {
    border-top: 1px solid #f0f0f0;
  }

  &-loading.#{$prefix-cls}-spin-nested-loading {
    min-height: 32px;
  }

  &-lg.#{$prefix-cls}-item {
    padding: 24px;
  }

  &-sm.#{$prefix-cls}-item {
    padding: 12px;
  }

  &-vertical.#{$prefix-cls}-item {
    align-items: initial;

    &-main {
      display: block;
      flex: 1;
    }

    &-extra {
      margin-left: 40px;
    }

    &-meta {
      margin-bottom: 16px;

      &-title {
        margin-bottom: 12px;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 85%);
      }
    }

    &-action {
      margin-top: 16px;
      margin-left: auto;

      > li {
        padding: 0 16px;

        &:first-child {
          padding-left: 0;
        }
      }
    }
  }

  // ============================ without flex ============================
  &-item-no-flex {
    display: block;
  }

  // Horizontal
  &:not(#{$prefix-cls}-vertical) {
    .#{$prefix-cls}-item-no-flex {
      .#{$prefix-cls}-item-action {
        float: right;
      }
    }
  }
}
</style>
