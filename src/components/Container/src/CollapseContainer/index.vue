<template>
  <div :class="prefixCls">
    <CollapseHeader
      :title="title"
      :canExpan="canExpan"
      :helpMessage="helpMessage"
      :prefixCls="prefixCls"
      :show="show"
      @expand="handleExpand">
      <template
        #title
        v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template
        #action
        v-if="$slots.action">
        <slot name="action"></slot>
      </template>
    </CollapseHeader>

    <div :class="`${prefixCls}__body`">
      <CollapseTransition v-if="canExpan">
        <ElSkeleton v-if="loading" />
        <div
          v-else
          v-show="show">
          <slot></slot>
        </div>
      </CollapseTransition>
      <template v-else>
        <ElSkeleton v-if="loading" />
        <div
          v-else
          v-show="show">
          <slot></slot>
        </div>
      </template>
    </div>
    <div
      :class="`${prefixCls}__footer`"
      v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { ElSkeleton } from 'element-plus'
import { CollapseTransition } from '@/components/Transition'
import CollapseHeader from './header.vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  components: { ElSkeleton, CollapseHeader, CollapseTransition },
  inheritAttrs: true,
  props: {
    /**
     * Collapse title
     */
    title: { type: String, default: '' },
    /**
     * Whether to show loading
     */
    loading: { type: Boolean },
    /**
     * Can it be expanded
     */
    canExpan: { type: Boolean, default: true },
    /**
     * Warm reminder on the right side of the title
     */
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
  },
  emits: ['expand'],
  setup(_, { emit }) {
    const show = ref(true)

    const { prefixCls } = useDesign('collapse-container')

    function handleExpand() {
      show.value = !show.value
      emit('expand', show.value)
    }

    return {
      prefixCls,
      show,
      handleExpand,
    }
  },
})

</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-collapse-container';

.#{$prefix-cls} {
  background-color: var(--background-primary-color);
  border-radius: var(--radius-base);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 12px;
    border-bottom: 1px solid var(--border-grey-color);
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    border-top: 1px solid var(--border-grey-color);
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
  }
}
</style>
