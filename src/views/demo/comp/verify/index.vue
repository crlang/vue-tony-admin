<template>
  <PageWrapper title="拖动校验示例">

    <div class="flex p-4">
      <BasicDragVerify
        ref="el1"
        isSlot
        @success="handleSuccess" />
      <el-button @click="handleBtnClick(el1)">还原</el-button>
    </div>

    <div class="flex p-4">
      <BasicDragVerify
        ref="el2"
        @success="handleSuccess"
        circle />
      <el-button @click="handleBtnClick(el2)">还原</el-button>
    </div>

    <div class="flex p-4">
      <BasicDragVerify
        ref="el3"
        @success="handleSuccess"
        text="拖动以进行校验"
        successText="校验成功"
        :barStyle="{
          backgroundColor: '#018ffb'
        }" />
      <el-button @click="handleBtnClick(el3)">还原</el-button>
    </div>

    <div class="flex p-4">
      <BasicDragVerify
        ref="el4"
        @success="handleSuccess">
        <template #actionIcon="isPassing">
          <template v-if="isPassing"><Coffee style="width: 1.45em;" /></template>
          <template v-else><ArrowRight style="width: 1.45em;" /></template>
        </template>
      </BasicDragVerify>
      <el-button @click="handleBtnClick(el4)">还原</el-button>
    </div>

    <div class="flex p-4">
      <BasicDragVerify
        ref="el5"
        @success="handleSuccess">
        <template #text="isPassing">
          <template v-if="isPassing">
            <div class="demo-custom-verify is-actived"><Coffee /> 验证成功</div>
          </template>
          <template v-else>
            <div class="demo-custom-verify">请拖动 <ArrowRight /></div>
          </template>
        </template>
      </BasicDragVerify>
      <el-button @click="handleBtnClick(el5)">还原</el-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import type { DragVerifyActionType, PassingData } from '@/components/Verify'

import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicDragVerify } from '@/components/Verify'
import { useMessage } from '@/hooks/web/useMessage'
import { Coffee, ArrowRight } from '@element-plus/icons'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { ElButton, BasicDragVerify, Coffee, ArrowRight, PageWrapper },
  setup() {
    const { createMessage } = useMessage()
    const el1 = ref<Nullable<DragVerifyActionType>>(null)
    const el2 = ref<Nullable<DragVerifyActionType>>(null)
    const el3 = ref<Nullable<DragVerifyActionType>>(null)
    const el4 = ref<Nullable<DragVerifyActionType>>(null)
    const el5 = ref<Nullable<DragVerifyActionType>>(null)

    function handleSuccess(data: PassingData) {
      const { time } = data
      createMessage.success(`校验成功,耗时${time}秒`)
    }

    function handleBtnClick(elRef: Nullable<DragVerifyActionType>) {
      if (!elRef) {
        return
      }
      elRef.resume()
    }

    return {
      handleSuccess,
      el1,
      el2,
      el3,
      el4,
      el5,
      handleBtnClick,
    }
  },
})
</script>

<style lang="scss" scoped>
  .demo-custom-verify {
    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      width: 1.3em;
      height: 1.5em;
      margin: 0 4px;
    }

    &.is-actived {
      color: #fff;
      -webkit-text-fill-color: #fff;
    }
  }
</style>
