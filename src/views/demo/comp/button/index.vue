<template>
  <PageWrapper title="基础组件" description="基础组件依赖于element-plus,组件库已有的基础组件,项目中不会再次进行demo展示（二次封装组件除外）">
    <ElRow :gutter="12">
      <ElCol :span="24">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              basic button (custom components)
            </div>
          </template>
          <BasicButton pre-icon="moon">
            Default
          </BasicButton>
          <BasicDivider direction="vertical" />
          <BasicButton type="primary" pre-icon="moon">
            Primary
          </BasicButton>
          <BasicDivider direction="vertical" />

          <BasicButton suf-icon="moon" type="success">
            Success
          </BasicButton>
          <BasicDivider direction="vertical" />
          <BasicButton suf-icon="moon" :icon-size="22" type="info">
            Large Icon
          </BasicButton>

          <BasicDivider direction="vertical" />
          <BasicButton shadow>
            Shadow
          </BasicButton>
          <BasicDivider direction="vertical" />
          <BasicButton shadow type="primary">
            Success
          </BasicButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              normal
            </div>
          </template>
          <ElButton>Default</ElButton>
          <ElButton type="primary">
            Primary
          </ElButton>
          <ElButton type="success">
            Success
          </ElButton>
          <ElButton type="info">
            Info
          </ElButton>
          <ElButton type="warning">
            Warning
          </ElButton>
          <ElButton type="danger">
            Danger
          </ElButton>
          <ElButton>中文</ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              plain
            </div>
          </template>
          <ElButton plain>
            Default
          </ElButton>
          <ElButton type="primary" plain>
            Primary
          </ElButton>
          <ElButton type="success" plain>
            Success
          </ElButton>
          <ElButton type="info" plain>
            Info
          </ElButton>
          <ElButton type="warning" plain>
            Warning
          </ElButton>
          <ElButton type="danger" plain>
            Danger
          </ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              round
            </div>
          </template>

          <ElButton round>
            Default
          </ElButton>
          <ElButton type="primary" round>
            Primary
          </ElButton>
          <ElButton type="success" round>
            Success
          </ElButton>
          <ElButton type="info" round>
            Info
          </ElButton>
          <ElButton type="warning" round>
            Warning
          </ElButton>
          <ElButton type="danger" round>
            Danger
          </ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              text
            </div>
          </template>

          <ElButton text>
            Text ElButton
          </ElButton>
          <ElButton text disabled>
            Text ElButton
          </ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              icon
            </div>
          </template>

          <ElButton :icon="Search" circle />
          <ElButton type="primary" :icon="Edit" circle />
          <ElButton type="success" :icon="Check" circle />
          <ElButton type="info" :icon="Message" circle />
          <ElButton type="warning" :icon="Star" circle />
          <ElButton type="danger" :icon="Delete" circle />
          <ElButton type="primary" :icon="Search">
            Search
          </ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              group
            </div>
          </template>

          <ElButtonGroup>
            <ElButton type="primary" :icon="ArrowLeft">
              Previous Page
            </ElButton>
            <ElButton type="primary" class="direction-rtl" :icon="ArrowRight">
              Next Page
            </ElButton>
          </ElButtonGroup>

          <ElButtonGroup>
            <ElButton type="primary" :icon="Edit" />
            <ElButton type="primary" :icon="Share" />
            <ElButton type="primary" :icon="Delete" />
          </ElButtonGroup>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow :gutter="12">
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              disabled
            </div>
          </template>

          <ElButton disabled>
            Default
          </ElButton>
          <ElButton type="primary" disabled>
            Primary
          </ElButton>
          <ElButton type="success" disabled>
            Success
          </ElButton>
          <ElButton type="info" disabled>
            Info
          </ElButton>
          <ElButton type="warning" disabled>
            Warning
          </ElButton>
          <ElButton type="danger" disabled>
            Danger
          </ElButton>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              disabled plain
            </div>
          </template>

          <ElButton plain disabled>
            Default
          </ElButton>
          <ElButton type="primary" plain disabled>
            Primary
          </ElButton>
          <ElButton type="success" plain disabled>
            Success
          </ElButton>
          <ElButton type="info" plain disabled>
            Info
          </ElButton>
          <ElButton type="warning" plain disabled>
            Warning
          </ElButton>
          <ElButton type="danger" plain disabled>
            Danger
          </ElButton>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow :gutter="12">
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              loading
            </div>
          </template>

          <div class="flex">
            <ElButton type="primary" :loading="true">
              Loading
            </ElButton>
            <ElButton type="primary" :loading="loading" @click="onLoading">
              Click Me
            </ElButton>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              sizes
            </div>
          </template>

          <ElButton>Default</ElButton>
          <ElButton size="large">
            Large
          </ElButton>
          <ElButton size="small">
            Small
          </ElButton>
          <ElButton :icon="Search" circle />
          <ElButton :icon="Search" size="large" circle />
          <ElButton :icon="Search" size="small" circle />
        </ElCard>
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton, ElButtonGroup, ElCard, ElCol, ElRow } from 'element-plus'
import { ArrowLeft, ArrowRight, Check, Delete, Edit, Message, Search, Share, Star } from '@element-plus/icons-vue'

import { BasicButton } from '@/components/BasicButton'
import { BasicDivider } from '@/components/Basic'

export default defineComponent({
  components: { ElRow, ElCol, ElCard, ElButton, ElButtonGroup, BasicButton, BasicDivider },
  setup() {
    const loading = ref(false)

    function onLoading() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3e3)
    }
    return {
      Search,
      Edit,
      Check,
      Message,
      Star,
      Delete,
      ArrowLeft,
      ArrowRight,
      Share,
      loading,
      onLoading,
    }
  },
})
</script>

<style scoped>
.el-row > .el-col {
  margin-bottom: 30px;
}

.el-button-group {
  margin-right: 15px;
}
</style>
