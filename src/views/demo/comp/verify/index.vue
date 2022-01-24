<template>
  <PageWrapper title="拖动校验示例">
    <div class="ty-demo">
      <BasicDragVerify
        ref="el1"
        @success="handleSuccess" />
      <el-button
        type="primary"
        size="large"
        @click="handleBtnClick(el1)">还原</el-button>
    </div>

    <div class="ty-demo">
      <BasicDragVerify
        ref="el2"
        @success="handleSuccess"
        circle />
      <el-button
        type="primary"
        size="large"
        @click="handleBtnClick(el2)">还原</el-button>
    </div>

    <div class="ty-demo">
      <BasicDragVerify
        ref="el3"
        @success="handleSuccess"
        text="拖动以进行校验"
        successText="校验成功"
        :barStyle="{
          backgroundColor: '#018ffb'
        }"
      />
      <el-button
        type="primary"
        size="large"
        @click="handleBtnClick(el3)">还原</el-button>
    </div>

    <div class="ty-demo">
      <BasicDragVerify
        ref="el4"
        @success="handleSuccess">
        <template #actionIcon="isPassing">
          <template v-if="isPassing"><Coffee style="width: 1.45em;" /></template>
          <template v-else><ArrowRight style="width: 1.45em;" /></template>
        </template>
      </BasicDragVerify>
      <el-button
        type="primary"
        size="large"
        @click="handleBtnClick(el4)">还原</el-button>
    </div>

    <div class="ty-demo">
      <BasicDragVerify
        ref="el5"
        @success="handleSuccess">
        <template #text="isPassing">
          <div v-if="isPassing"><Coffee style="width: 1.45em;" />成功</div>
          <div v-else>拖动<ArrowRight style="width: 1.45em;" /></div>
        </template>
      </BasicDragVerify>
      <el-button
        type="primary"
        size="large"
        @click="handleBtnClick(el5)">还原</el-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicDragVerify, DragVerifyActionType, PassingData } from '@/components/Verify/index'
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
.ty-demo {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
</style>
