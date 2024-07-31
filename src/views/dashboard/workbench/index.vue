<template>
  <PageWrapper>
    <template #extra>
      <WorkbenchHeader v-if="datainfo" v-loading="loading" :datainfo="datainfo.userInfo || null" />
    </template>
    <ElRow :gutter="21">
      <ElCol :lg="{ span: 16 }">
        <ProjectCard
          v-if="datainfo"
          v-loading="loading"
          class="mb-6"
          :datainfo="datainfo.projectInfo || []"
        />
        <DynamicInfo v-if="datainfo" v-loading="loading" :datainfo="datainfo.newsInfo || []" />
      </ElCol>
      <ElCol :lg="{ span: 8 }">
        <QuickNav v-if="datainfo" v-loading="loading" :datainfo="datainfo.navInfo || []" />
        <ActivityTimeline
          v-if="datainfo"
          v-loading="loading"
          class="my-6"
          :datainfo="datainfo.progressInfo || []"
        />
        <TaskProportion v-if="datainfo" v-loading="loading" :datainfo="datainfo.ratioInfo || []" />
      </ElCol>
    </ElRow>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ElCol, ElLoading, ElRow } from 'element-plus'

import WorkbenchHeader from './components/WorkbenchHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import QuickNav from './components/QuickNav.vue'
import ActivityTimeline from './components/ActivityTimeline.vue'
import DynamicInfo from './components/DynamicInfo.vue'
import TaskProportion from './components/TaskProportion.vue'

import { ApiWorkbenchStat } from '@/api/dashboard'
import type { ResponseDashboardWrokbench } from '@/api/types'

export default defineComponent({
  components: { ElRow, ElCol, WorkbenchHeader, ProjectCard, QuickNav, ActivityTimeline, DynamicInfo, TaskProportion },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const loading = ref(false)
    const datainfo = ref<ResponseDashboardWrokbench>()

    function initData() {
      loading.value = true
      ApiWorkbenchStat({})
        .then((res) => {
          datainfo.value = res
          setTimeout(() => {
            loading.value = false
          }, 500)
        })
        .catch(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      initData()
    })

    return {
      loading,
      datainfo,
    }
  },
})
</script>
