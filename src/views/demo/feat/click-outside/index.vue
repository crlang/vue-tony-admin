<template>
  <PageWrapper title="点内外部触发事件">
    <ClickOutside @click-outside="handleClickOutside" class="flex justify-center">
      <div @click="innerClick" class="demo-box">
        {{ text }}
      </div>
    </ClickOutside>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ClickOutside } from '@/components/ClickOutside';

export default defineComponent({
  components: { ClickOutside },
  setup() {
    const text = ref('Click');

    function handleClickOutside() {
      text.value = 'Click Out Side';
    }

    function innerClick() {
      text.value = 'Click Inner';
    }
    return { innerClick, handleClickOutside, text };
  },
});
</script>

<style lang="scss" scoped>
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  font-size: 24px;
  color: #fff;
  background-color: var(--primary-color);
  border-radius: 10px;
}
</style>
