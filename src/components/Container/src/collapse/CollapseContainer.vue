<template>
  <div :class="prefixCls">
    <CollapseHeader
      :title="title"
      :canExpan="canExpan"
      :helpMessage="helpMessage"
      :prefixCls="prefixCls"
      :show="show"
      @expand="handleExpand">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #action>
        <slot name="action"></slot>
      </template>
    </CollapseHeader>

    <div class="p-4">
      <CollapseTransition :enable="canExpan">
        <el-skeleton
          v-if="loading"
          :active="loading" />
        <div
          :class="`${prefixCls}__body`"
          v-else
          v-show="show">
          <slot></slot>
        </div>
      </CollapseTransition>
    </div>
    <div
      :class="`${prefixCls}__footer`"
      v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'
// component
import { CollapseTransition } from '@/components/Transition'
import CollapseHeader from './CollapseHeader.vue'
import { triggerWindowResize } from '@/utils/event'
// hook
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { useDesign } from '@/hooks/web/useDesign'

const props = defineProps({
  title: { type: String, default: '' },
  loading: { type: Boolean },
  /**
   *  Can it be expanded
   */
  canExpan: { type: Boolean, default: true },
  /**
   * Warm reminder on the right side of the title
   */
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  /**
   * Whether to trigger window.resize when expanding and contracting,
   * Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
   */
  triggerWindowResize: { type: Boolean },
  /**
   * Delayed loading time
   */
  lazyTime: { type: Number, default: 0 },
})

const show = ref(true)

const { prefixCls } = useDesign('collapse-container')

/**
 * @description: Handling development events
 */
function handleExpand() {
  show.value = !show.value
  if (props.triggerWindowResize) {
    // 200 milliseconds here is because the expansion has animation,
    useTimeoutFn(triggerWindowResize, 200)
  }
}
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-collapse-container';

.#{$prefix-cls} {
  background-color: var(--background-secondary-color);
  border-radius: 2px;
  transition: all 0.3s ease-in-out;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 12px;
    border-bottom: 1px solid var(--border-grey-color);
  }

  &__footer {
    border-top: 1px solid var(--border-grey-color);
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    flex: 1;
  }
}
</style>
