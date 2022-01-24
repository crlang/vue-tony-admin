<template>
  <List :class="prefixCls">
    <el-row :gutter="16">
      <template
        v-for="item in list"
        :key="item.title">
        <el-col :span="6">
          <ListItem type="card">
            <div
              :class="`${prefixCls}__card-img`"
              :style="{'background-image': 'url('+demoImg+')'}"></div>

            <div :class="`${prefixCls}__card-title`">
              {{ item.title }}
            </div>
            <div :class="`${prefixCls}__card-content`">
              {{ item.content }}
            </div>
          </ListItem>
        </el-col>
      </template>
    </el-row>
  </List>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import demoImg from '@/assets/images/demo.png'
import { projectList } from './data'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    List,
    ListItem,
  },
  setup() {
    return {
      prefixCls: 'account-center-project',
      list: projectList,
      demoImg,
    }
  },
})
</script>

<style lang="scss">
.account-center-project {
  &__card {
    width: 100%;

    .el-card__body {
      padding: 0 0 24px;
    }

    &-img {
      width: 100%;
      padding-bottom: 50%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &-title {
      margin: 5px 10px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }

    &-content {
      margin: 5px 10px;
    }
  }
}
</style>
