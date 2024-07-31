<template>
  <div :class="prefixCls">
    <ElRow :class="`${prefixCls}-top`">
      <ElCol :span="9" :class="`${prefixCls}-col`">
        <ElRow>
          <ElCol :span="8">
            <div :class="`${prefixCls}-top__avatar`">
              <ElImage style="width: 70px" :src="avatar" />
              <span>Tony</span>
              <div>海纳百川，有容乃大</div>
            </div>
          </ElCol>
          <ElCol :span="16">
            <div :class="`${prefixCls}-top__detail`">
              <template v-for="detail in details" :key="detail.title">
                <p class="mb-3">
                  <SvgIcon :name="detail.icon" />
                  {{ detail.title }}
                </p>
              </template>
            </div>
          </ElCol>
        </ElRow>
      </ElCol>
      <ElCol :span="7" :class="`${prefixCls}-col`">
        <CollapseContainer title="标签" :can-expan="false">
          <template v-for="tag in tags" :key="tag">
            <ElTag class="mb-2 mr-2" size="small">
              {{ tag }}
            </ElTag>
          </template>
        </CollapseContainer>
      </ElCol>
      <ElCol :span="8" :class="`${prefixCls}-col`">
        <CollapseContainer :class="`${prefixCls}-top__team`" title="团队" :can-expan="false">
          <div v-for="(team, index) in teams" :key="index" :class="`${prefixCls}-top__team-item`">
            <SvgIcon :name="team.icon" :color="team.color" />
            <span>{{ team.title }}</span>
          </div>
        </CollapseContainer>
      </ElCol>
    </ElRow>
    <div :class="`${prefixCls}-bottom`">
      <ElTabs>
        <template v-for="item in achieveList" :key="item.key">
          <ElTabPane :label="item.name">
            <component :is="item.component" />
          </ElTabPane>
        </template>
      </ElTabs>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElCol, ElImage, ElRow, ElTabPane, ElTabs, ElTag } from 'element-plus'
import ArticleList from './ArticleList.vue'
import Application from './Application.vue'
import Project from './Project.vue'

import { achieveList, details, tags, teams } from './data'
import { SvgIcon } from '@/components/SvgIcon'
import { CollapseContainer } from '@/components/CollapseContainer'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElTabs,
    ElTabPane,
    ElTag,
    CollapseContainer,
    SvgIcon,
    ArticleList,
    Application,
    Project,
    ElImage,
  },
  setup() {
    const userStore = useUserStore()
    const avatar = computed(() => userStore.getUserInfo.avatar)
    return {
      prefixCls: 'account-center',
      avatar,
      tags,
      teams,
      details,
      achieveList,
    }
  },
})
</script>

<style lang="scss" scoped>
.account-center {
  &-col:not(:last-child) {
    padding: 0 10px;

    &:not(:last-child) {
      border-right: 1px dashed rgb(206 206 206 / 50%);
    }
  }

  &-top {
    padding: 10px;
    margin: 16px 16px 12px;
    background-color: var(--background-primary-color);
    border-radius: 3px;

    &__avatar {
      text-align: center;

      img {
        margin: auto;
        border-radius: 50%;
      }

      span {
        display: block;
        font-size: 20px;
        font-weight: 500;
      }

      div {
        margin-top: 3px;
        font-size: 12px;
      }
    }

    &__detail {
      padding-left: 20px;
      margin-top: 15px;
    }

    &__team {
      &-item {
        display: inline-block;
        padding: 4px 24px;
      }

      span {
        margin-left: 3px;
      }
    }
  }

  &-bottom {
    padding: 10px;
    margin: 0 16px 16px;
    background-color: var(--background-primary-color);
    border-radius: 3px;
  }
}
</style>
