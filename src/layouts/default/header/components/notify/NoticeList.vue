<template>
  <BasicList :class="prefixCls" :data-source="list">
    <template #renderItem="{ item }">
      <BasicListItem :class="[`${prefixCls}-item`, { 'is-read': item.titleDelete }]" @click="handleTitleClick(item)">
        <template v-if="vkey === '1'" #thumb>
          <ElAvatar
            style="

          --el-avatar-bg-color: #fff;

          " class="avatar" :src="item.avatar"
          />
        </template>
        <template #title>
          <div class="title">
            <span>{{ item.title }}</span>
            <div v-if="vkey === '3'" class="extra">
              <ElTag class="tag" size="small" :type="item.color">
                {{ item.extra }}
              </ElTag>
            </div>
          </div>
        </template>
        <template #description>
          <div :class="`${prefixCls}--desc`">
            <div v-if="vkey === '2'" class="description">
              {{ item.description }}
            </div>
            <div class="datetime">
              {{ item.datetime }}
            </div>
          </div>
        </template>
      </BasicListItem>
    </template>
  </BasicList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAvatar, ElTag } from 'element-plus'

import type { ListItem } from './data'
import { useDesign } from '@/hooks/web/useDesign'
import { BasicList, BasicListItem } from '@/components/BasicList'

export default defineComponent({
  components: {
    ElAvatar,
    ElTag,
    BasicList,
    BasicListItem,
  },
  props: {
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    vkey: {
      type: String,
      default: '',
    },
    onTitleClick: {
      type: Function,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('header-notify-list')

    function handleTitleClick(item) {
      if (props.onTitleClick) {
        props.onTitleClick(item)
      }
    }

    return { prefixCls, handleTitleClick }
  },
})
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-header-notify-list';

.#{$prefix-cls} {
  max-height: 320px;
  overflow-y: auto;

  &-item {
    display: block;
    padding: 12px 24px;
    cursor: pointer;

    &:hover {
      background: var(--background-main-color);
    }

    &.is-read {
      opacity: 0.5;
    }

    .avatar {
      width: 32px;
      height: 32px;
    }

    .title {
      display: flex;
      margin-bottom: 4px;
      color: var(--text-primary-color);

      > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .extra {
      margin-left: 4px;
    }

    .description {
      max-height: 32px;
      overflow: hidden;
      font-size: 12px;
      line-height: 16px;
      color: var(--text-secondary-color);
    }

    .datetime {
      margin-top: 4px;
      font-size: 12px;
      color: var(--text-secondary-color);
    }
  }
}
</style>
