<template>
  <PageWrapper>
    <template #extra><WorkbenchHeader v-loading="loading" :datainfo="datainfo.userInfo || null" v-if="datainfo" /></template>
    <el-row :gutter="21">
      <el-col :lg="{ span: 16 }">
        <ProjectCard
          v-loading="loading"
          class="mb-6"
          :datainfo="datainfo.projectInfo || []"
          v-if="datainfo" />
        <DynamicInfo v-loading="loading" :datainfo="datainfo.newsInfo || []" v-if="datainfo" />
      </el-col>
      <el-col :lg="{ span: 8 }">
        <QuickNav v-loading="loading" :datainfo="datainfo.navInfo || []" v-if="datainfo" />
        <ActivityTimeline
          v-loading="loading"
          class="my-6"
          :datainfo="datainfo.progressInfo || []"
          v-if="datainfo" />
        <TaskProportion v-loading="loading" :datainfo="datainfo.ratioInfo || []" v-if="datainfo" />
      </el-col>
    </el-row>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ElLoading, ElRow, ElCol } from 'element-plus';

import WorkbenchHeader from './components/WorkbenchHeader.vue';
import ProjectCard from './components/ProjectCard.vue';
import QuickNav from './components/QuickNav.vue';
import ActivityTimeline from './components/ActivityTimeline.vue';
import DynamicInfo from './components/DynamicInfo.vue';
import TaskProportion from './components/TaskProportion.vue';

import { ApiWorkbenchStat } from '@/api/dashboard';
import { ResponseDashboardWrokbench } from '@/api/types';

export default defineComponent({
  components: { ElRow, ElCol, WorkbenchHeader, ProjectCard, QuickNav, ActivityTimeline, DynamicInfo, TaskProportion },
  directives: {
    loading: ElLoading.directive,
  },
  setup() {
    const loading = ref(false);
    const datainfo = ref<ResponseDashboardWrokbench>();

    function initData() {
      loading.value = true;
      ApiWorkbenchStat({})
        .then((res) => {
          datainfo.value = res;
          setTimeout(() => {
            loading.value = false;
          }, 500);
        })
        .catch(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      initData();
    });

    return {
      loading,
      datainfo,
    };
  },
});
</script>
