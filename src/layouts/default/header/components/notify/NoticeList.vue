<template>
  <List :class="prefixCls">
    <template
      v-for="item in list"
      :key="item.title">
      <ListItem
        style="display: block;"
        :class="[prefixCls+'__item',{'is-read':item.titleDelete}]"
        @click="handleTitleClick(item)">
        <ListItemMeta>

          <template #avatar>
            <el-avatar
              v-if="item.avatar"
              style="--el-avatar-bg-color: #fff"
              class="avatar"
              :src="item.avatar" />
            <span v-else>{{ item.avatar }}</span>
          </template>

          <template #title>
            <div class="title">
              <span>{{ item.title }}</span>
              <div
                class="extra"
                v-if="item.extra">
                <el-tag
                  class="tag"
                  size="mini"
                  :type="item.color">
                  {{ item.extra }}
                </el-tag>
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
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch, unref } from 'vue'
import { ListItem as ListItemType } from './data'
import { useDesign } from '@/hooks/web/useDesign'
import { List, ListItem, ListItemMeta } from '@/components/List'

export default defineComponent({
  components: {
    List,
    ListItem,
    ListItemMeta,
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
  setup(props, { emit }) {
    const { prefixCls } = useDesign('header-notify-list')
    const current = ref(props.page || 1)
    watch(
      () => props.page,
      (v) => {
        current.value = v
      }
    )
    const isTitleClickable = computed(() => !!props.onTitleClick)
    const getPagination = computed(() => {
      const { list, pageSize } = props
      if (pageSize > 0 && list && list.length > pageSize) {
        return {
          total: list.length,
          pageSize,
          // size: 'small',
          current: unref(current),
          onChange(page) {
            current.value = page
            emit('update:page', page)
          },
        }
      } else {
        return false
      }
    })

    function handleTitleClick(item: ListItem) {
      props.onTitleClick && props.onTitleClick(item)
    }

    return { prefixCls, getPagination, handleTitleClick, isTitleClickable }
  },
})
</script>
<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-header-notify-list';

.#{$prefix-cls} {
  max-height: 400px;
  overflow-y: auto;

  // &::-webkit-scrollbar {
  //   display: none;
  // }

  &__item {
    padding: 12px 24px;
    cursor: pointer;

    &:hover {
      background: #f4f7f9;
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
    }

    .datetime {
      margin-top: 4px;
      font-size: 12px;
    }
  }
}
</style>
