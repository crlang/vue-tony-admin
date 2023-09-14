<template>
  <el-row class="ana-product" :gutter="32" v-if="datainfo">
    <el-col :span="8">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">转化率</div>
        </template>
        <Basic1 :datainfo="datainfo.productLine || []" />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">访问来源</div>
        </template>
        <Basic2 :datainfo="datainfo.productBar || []" />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <template #header>
          <div class="dashboard-analysis__title">成交占比</div>
        </template>
        <Basic3 :datainfo="datainfo.productPie || []" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElLoading, ElRow, ElCol, ElCard } from 'element-plus';

import Basic1 from './Basic1.vue';
import Basic2 from './Basic2.vue';
import Basic3 from './Basic3.vue';

export default defineComponent({
  components: { ElRow, ElCol, ElCard, Basic1, Basic2, Basic3 },
  directives: {
    loading: ElLoading.directive,
  },
  props: {
    loading: {
      type: Boolean,
    },
    datainfo: {
      type: Object as PropType<Recordable>,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>
