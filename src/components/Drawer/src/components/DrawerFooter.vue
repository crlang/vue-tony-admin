<template>
  <div
    :class="prefixCls"
    :style="getStyle"
    v-if="showFooter || $slots.footer">
    <template v-if="!$slots.footer">
      <slot name="insertFooter"></slot>
      <ElButton
        @click="handleClose"
        class="mr-2"
        v-if="showCancelBtn">
        {{ cancelText }}
      </ElButton>
      <slot name="centerFooter"></slot>
      <ElButton
        :type="confirmType"
        @click="handleOk"
        class="mr-2"
        :loading="confirmLoading"
        v-if="showConfirmBtn">
        {{ confirmText }}
      </ElButton>
      <slot name="appendFooter"></slot>
    </template>

    <template v-else>
      <slot name="footer"></slot>
    </template>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'

import { footerProps } from '../props'
export default defineComponent({
  name: 'BasicDrawerFooter',
  components: { ElButton },
  props: {
    ...footerProps,
    height: {
      type: String,
      default: '60px',
    },
  },
  emits: ['ok', 'close'],
  setup(props, { emit }) {
    const { prefixCls } = useDesign('basic-drawer-footer')

    const getStyle = computed((): CSSProperties => {
      const heightStr = `${props.height}`
      return {
        height: heightStr,
        lineHeight: heightStr,
      }
    })

    function handleOk() {
      emit('ok')
    }

    function handleClose() {
      emit('close')
    }
    return { handleOk, prefixCls, handleClose, getStyle }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-drawer-footer';

.#{$prefix-cls} {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 12px 0 20px;
  text-align: right;

  // background-color: var(--background-secondary-color);
  // border-top: 1px solid var(--border-grey-color);
}
</style>
