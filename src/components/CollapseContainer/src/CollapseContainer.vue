<template>
  <div :class="prefixCls">
    <div v-if="title || $slots.title || $slots.action" :class="`${prefixCls}__header`">
      <BasicTitle :help-message="helpMessage">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          <slot name="title"></slot>
        </template>
      </BasicTitle>
      <div :class="`${prefixCls}__action`">
        <slot name="extra"></slot>
        <template v-if="canExpan">
          <SvgIcon :name="show ? 'up' : 'down'" @click="handleExpand" />
        </template>
      </div>
    </div>

    <div :class="`${prefixCls}__body`">
      <ExpandTransition v-if="canExpan">
        <ElSkeleton v-if="loading" />
        <div v-else v-show="show">
          <slot></slot>
        </div>
      </ExpandTransition>
      <template v-else>
        <ElSkeleton v-if="loading" />
        <div v-else v-show="show">
          <slot></slot>
        </div>
      </template>
    </div>
    <div v-if="$slots.footer" :class="`${prefixCls}__footer`">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElSkeleton } from 'element-plus'

import { basicProps } from './props'
import { useDesign } from '@/hooks/web/useDesign'
import { ExpandTransition } from '@/components/Transition'
import { BasicTitle } from '@/components/Basic'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  name: 'CollapseContainer',
  components: { ElSkeleton, ExpandTransition, BasicTitle, SvgIcon },
  props: basicProps,
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
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 12px;
    border-bottom: 1px solid var(--border-color-light);
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    border-top: 1px solid var(--border-color);
  }

  &__action {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
