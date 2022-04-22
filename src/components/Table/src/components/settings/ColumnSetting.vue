<template>
  <ElPopover
    trigger="hover"
    :width="250"
    @show="handleVisibleChange(true)"
    @hide="handleVisibleChange(false)"
    :popper-class="`${prefixCls}__cloumn-list`">
    <div :class="`${prefixCls}__popover-title`">
      <ElCheckbox
        :indeterminate="indeterminate"
        v-model="checkAll"
        @change="onCheckAllChange">
        列展示
      </ElCheckbox>

      <ElButton
        size="small"
        type="text"
        @click="reset">
        重置
      </ElButton>
    </div>
    <ScrollContainer>
      <ElCheckboxGroup
        v-model="checkedList"
        @change="handleChange"
        ref="columnListRef">
        <template
          v-for="item in plainOptions"
          :key="item.value">
          <div :class="`${prefixCls}__check-item`">
            <ElCheckbox :label="item.prop">{{ item.label }}</ElCheckbox>
            <ElTooltip
              placement="bottom-start"
              content="固定到左侧">
              <span @click="handleColumnFixed(item, 'left')">
                <Icon
                  icon="line-md:arrow-align-left"
                  :class="[
                    `${prefixCls}__fixed-left`,
                    {
                      active: item.fixed === 'left',
                      disabled: !checkedList.includes(item.prop as string),
                    },
                  ]" />
              </span>
            </ElTooltip>
            <ElTooltip
              placement="bottom-start"
              content="固定到右侧">
              <span @click="handleColumnFixed(item, 'right')">
                <Icon
                  icon="line-md:arrow-align-left"
                  :class="[
                    `${prefixCls}__fixed-right`,
                    {
                      active: item.fixed === 'right',
                      disabled: !checkedList.includes(item.prop as string),
                    },
                  ]" />
              </span>
            </ElTooltip>
          </div>
        </template>
      </ElCheckboxGroup>
    </ScrollContainer>
    <template #reference>
      <span>
        <ElTooltip
          placement="top"
          content="列设置">
          <span><Setting /></span>
        </ElTooltip>
      </span>
    </template>
  </ElPopover>
</template>

<script lang="ts">
import type { BasicColumn } from '../../types/table'

import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  watchEffect,
  nextTick,
  unref,
  computed,
} from 'vue'
import {
  ElPopover,
  ElCheckbox,
  ElCheckboxGroup,
  ElButton,
  ElTooltip,
} from 'element-plus'
import { Icon } from '@/components/Icon'
import { ScrollContainer } from '@/components/Container'
import { useTableContext } from '../../hooks/useTableContext'
import { useDesign } from '@/hooks/web/useDesign'
import { Setting } from '@element-plus/icons'
import { usePermission } from '@/hooks/web/usePermission'

interface State {
  checkAll: boolean
  checkedList: string[]
  defaultCheckList: string[]
}

export default defineComponent({
  name: 'ColumnSetting',
  components: {
    ElPopover,
    ElCheckbox,
    ElCheckboxGroup,
    ElButton,
    ElTooltip,
    Setting,
    ScrollContainer,
    Icon,
  },
  emits: ['columns-change'],

  setup(_, { emit }) {
    const table = useTableContext()

    let inited = false

    const cachePlainOptions = ref<BasicColumn[]>([])
    const plainOptions = ref<BasicColumn[]>([])

    const plainSortOptions = ref<BasicColumn[]>([])

    const columnListRef = ref<ComponentRef>(null)

    const state = reactive<State>({
      checkAll: true,
      checkedList: [],
      defaultCheckList: [],
    })

    const { prefixCls } = useDesign('basic-column-setting')

    watchEffect(() => {
      const columns = table.getColumns()
      if (columns.length) {
        init()
      }
    })

    function getColumns() {
      const ret: any[] = []
      const { hasPermission } = usePermission()
      table.getColumns({
        ignoreIndex: true,
        ignoreAction: true,
        ignoreCheckbox: true,
        ignoreExpand: true,
      }).forEach((item) => {
        ret.push(item)
      })
      return ret.filter((column) => {
        return hasPermission(column.auth)
      })
    }

    function init() {
      const columns = getColumns()

      const checkList = table
        .getColumns({ ignoreAction: true })
        .map((item) => {
          if (item.defaultHidden) {
            return ''
          }
          return item.prop
        })
        .filter(Boolean) as string[]

      if (!plainOptions.value.length) {
        plainOptions.value = columns
        cachePlainOptions.value = columns
        state.defaultCheckList = checkList
      }
      state.checkedList = checkList
    }

    // checkAll change
    function onCheckAllChange(v:boolean) {
      if (v) {
        const checkList:BasicColumn[] = [...plainOptions.value]
        state.checkedList = checkList.map(k => (k.prop as string))
        setColumns(checkList)
      } else {
        state.checkedList = []
        setColumns([])
      }
    }

    const indeterminate = computed(() => {
      const len = plainOptions.value.length
      const checkdedLen = state.checkedList.length
      return checkdedLen > 0 && checkdedLen < len
    })

    // Trigger when check/uncheck a column
    function handleChange() {
      const checkList:BasicColumn[] = unref(plainOptions)
        .filter((col) => col.prop && state.checkedList.indexOf(col.prop) !== -1)
      const len = plainOptions.value.length
      state.checkAll = checkList.length === 0 ? false : checkList.length === len
      setColumns(checkList)
    }

    // reset columns
    function reset() {
      state.checkedList = [...state.defaultCheckList]
      state.checkAll = true
      plainOptions.value = unref(cachePlainOptions)
      plainSortOptions.value = unref(cachePlainOptions)
      setColumns(table.getCacheColumns())
    }

    // Open the pop-up window for drag and drop initialization
    function handleVisibleChange(v:boolean) {
      if (v === false) return

      if (inited) return

      nextTick(() => {
        inited = true
      })
    }

    // Control whether the serial number column is displayed
    function handleIndexCheckChange(v: boolean) {
      table.setProps({
        showIndexColumn: v,
      })
      const columns = getColumns() as BasicColumn[]
      emit('columns-change', columns)
    }

    // Control whether the check box is displayed
    function handleSelectCheckChange(v: boolean) {
      table.setProps({
        showCheckboxColumn: v,
      })
      const columns = getColumns() as BasicColumn[]
      emit('columns-change', columns)
    }

    function handleColumnFixed(item: BasicColumn, fixed?: 'left' | 'right') {
      if (!state.checkedList.includes(item.prop as string)) return

      const columns = getColumns() as BasicColumn[]
      const isFixed = item.fixed === fixed ? false : fixed
      const index = columns.findIndex((col) => col.prop === item.prop)
      if (index !== -1) {
        columns[index].fixed = isFixed
      }
      item.fixed = isFixed

      if (isFixed && !item.width) {
        item.width = 100
      }
      setColumns(columns)
    }

    function setColumns(columns: BasicColumn[] | string[]) {
      table.setColumns(columns)

      emit('columns-change', JSON.parse(JSON.stringify(columns)))
    }

    return {
      ...toRefs(state),
      indeterminate,
      onCheckAllChange,
      handleChange,
      plainOptions,
      reset,
      prefixCls,
      columnListRef,
      handleVisibleChange,
      handleIndexCheckChange,
      handleSelectCheckChange,
      handleColumnFixed,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-column-setting';

.#{$prefix-cls} {
  &__popover-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-checkbox {
      margin-right: 0;
    }

    .el-button {
      margin-left: 20px;
    }
  }

  &__check-item {
    display: flex;
    align-items: center;
    min-width: 100%;
    padding: 4px 16px 8px 0;
    font-size: var(--font-base-size);

    .el-checkbox {
      width: 100%;
    }

    &-icon {
      width: 1em;
      height: 1em;
    }
  }

  &__fixed-left,
  &__fixed-right {
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;

    &.active,
    &:hover {
      color: var(--primary-color);
    }

    &.disabled {
      color: rgba(0, 0, 0, 0.1);
      cursor: not-allowed;
    }
  }

  &__fixed-right {
    transform: rotate(180deg);
  }

  &__cloumn-list {
    svg {
      width: 1em !important;
      height: 1em !important;
    }

    .scrollbar {
      height: 220px;
    }
  }
}
</style>
