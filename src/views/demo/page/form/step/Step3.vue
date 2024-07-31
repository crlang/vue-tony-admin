<template>
  <div class="step3">
    <ElResult icon="success" title="操作成功" sub-title="预计两小时内到账">
      <template #extra>
        <ElButton type="primary" @click="redo">再转一笔</ElButton>
        <ElButton>查看账单</ElButton>
      </template>
    </ElResult>
    <div class="desc-wrap">
      <ElDescriptions :column="1">
        <ElDescriptionsItem label="付款账户">test@alipay.com</ElDescriptionsItem>
        <ElDescriptionsItem label="收款账户">test@example.com</ElDescriptionsItem>
        <ElDescriptionsItem label="收款人姓名">Tony</ElDescriptionsItem>
        <ElDescriptionsItem label="转账金额">500元</ElDescriptionsItem>
      </ElDescriptions>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton, ElDescriptions, ElDescriptionsItem, ElResult } from 'element-plus'

export default defineComponent({
  components: {
    ElResult,
    ElButton,
    ElDescriptions,
    ElDescriptionsItem,
  },
  emits: ['redo'],
  setup(_, { emit }) {
    return {
      redo: () => {
        emit('redo')
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.step3 {
  width: 600px;
  margin: 0 auto;
}

.desc-wrap {
  padding: 24px 40px;
  margin-top: 24px;
  background-color: var(--background-main-color);

  .el-descriptions {
    --el-fill-color-blank: none;
  }
}
</style>
