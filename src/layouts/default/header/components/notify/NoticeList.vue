<template>
  <List :class="prefixCls">
    <template
      v-for="item in list"
      :key="item.title">
      <ListItem
        style="display: block;"
        :class="[prefixCls+'__item',{'is-read':item.titleDelete}]"
        @click="handleTitleClick(item)">
        <template
          #thumb
          v-if="item.avatar">
          <ElAvatar
            style="--el-avatar-bg-color: #fff"
            class="avatar"
            :src="item.avatar" />
        </template>

        <template #title>
          <div class="title">
            <span>{{ item.title }}</span>
            <div
              class="extra"
              v-if="item.extra">
              <ElTag
                class="tag"
                size="small"
                :type="item.color">
                {{ item.extra }}
              </ElTag>
            </div>
          </div>
        </template>

        <template #description>
          <div>
            <div
              class="description"
              v-if="item.description">
              {{ item.description }}
            </div>
            <div class="datetime">
              {{ item.datetime }}
            </div>
          </div>
        </template>
      </ListItem>
    </template>
  </List>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { ElAvatar, ElTag } from 'element-plus'
import { ListItem as ListItemType } from './data'
import { useDesign } from '@/hooks/web/useDesign'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: {
    ElAvatar,
    ElTag,
    List,
    ListItem,
  },
  props: {
    list: {
      type: Array as PropType<ListItemType[]>,
      default: () => [],
    },
    pageSize: {
      type: [Boolean, Number] as PropType<Boolean | Number>,
      default: 5,
    },
    page: {
      type: Number,
      default: 1,
    },
    titleRows: {
      type: Number,
      default: 1,
    },
    descRows: {
      type: Number,
      default: 2,
    },
    onTitleClick: {
      type: Function as PropType<(Recordable) => void>,
    },
  },
  emits: ['update:page'],
  setup(props) {
    const { prefixCls } = useDesign('header-notify-list')
    const current = ref(props.page || 1)
    watch(
      () => props.page,
      (v) => {
        current.value = v
      }
    )
    const isTitleClickable = computed(() => !!props.onTitleClick)

    function handleTitleClick(item: ListItemType) {
      props.onTitleClick && props.onTitleClick(item)
    }

    return { prefixCls, handleTitleClick, isTitleClickable }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-notify-list';

.#{$prefix-cls} {
  max-height: 320px;
  overflow-y: auto;

  &__item {
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
