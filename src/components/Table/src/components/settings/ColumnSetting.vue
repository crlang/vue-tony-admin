<template>

  <el-popover
    trigger="click"
    :width="330"
    @show="handleVisibleChange(true)"
    @hide="handleVisibleChange(false)"
    :popper-class="`${prefixCls}__cloumn-list`">
    <div :class="`${prefixCls}__popover-title`">
      <el-checkbox
        :indeterminate="indeterminate"
        v-model="checkAll"
        @change="onCheckAllChange">
        {{ t('component.table.settingColumnShow') }}
      </el-checkbox>

      <!-- <el-checkbox
        v-model:modelValue="checkIndex"
        @change="handleIndexCheckChange">
        {{ t('component.table.settingIndexColumnShow') }}
      </el-checkbox>

      <el-checkbox
        v-model:modelValue="checkSelect"
        @change="handleSelectCheckChange">
        {{ t('component.table.settingSelectColumnShow') }}
      </el-checkbox> -->

      <el-button
        size="small"
        type="text"
        @click="reset">
        {{ t('common.resetText') }}
      </el-button>
    </div>
    <ScrollContainer>
      <el-checkbox-group
        v-model="checkedList"
        @change="handleChange"
        ref="columnListRef">
        <template
          v-for="item in plainOptions"
          :key="item.value">
          <div :class="`${prefixCls}__check-item`">
            <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
            <el-tooltip
              placement="bottom-start"
              :content="t('component.table.settingFixedLeft')">
              <Icon
                icon="line-md:arrow-align-left"
                :class="[
                  `${prefixCls}__fixed-left`,
                  {
                    active: item.fixed === 'left',
                    disabled: !checkedList.includes(item.prop as string),
                  },
                ]"
                @click="handleColumnFixed(item, 'left')"
              />
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip
              placement="bottom-start"
              :content="t('component.table.settingFixedRight')">
              <Icon
                icon="line-md:arrow-align-left"
                :class="[
                  `${prefixCls}__fixed-right`,
                  {
                    active: item.fixed === 'right',
                    disabled: !checkedList.includes(item.prop as string),
                  },
                ]"
                @click="handleColumnFixed(item, 'right')"
              />
            </el-tooltip>
          </div>
        </template>
      </el-checkbox-group>
    </ScrollContainer>
    <template #reference>
      <Setting :title="t('component.table.settingColumn')" />
    </template>
  </el-popover>
</template>

<script lang="ts">
import type { BasicColumn } from '../../types/table'
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  watchEffect,
  // nextTick,
  unref,
  computed
} from 'vue'
import { Icon } from '@/components/Icon'
import { ScrollContainer } from '@/components/Container'
import { useI18n } from '@/hooks/web/useI18n'
import { useTableContext } from '../../hooks/useTableContext'
import { useDesign } from '@/hooks/web/useDesign'
// import { useSortable } from '@/hooks/web/useSortable'
// import { isNullAndUnDef } from '@/utils/is'
// import { omit } from 'lodash-es'
import { Setting } from '@element-plus/icons'

interface State {
  checkAll: boolean
  checkedList: string[]
  defaultCheckList: string[]
}
// type fixedType = boolean | 'left' | 'right'

// interface Options {
//   label: string
//   prop: string
//   fixed?: fixedType
// }

export default defineComponent({
  name: 'ColumnSetting',
  components: {
    Setting,
    ScrollContainer,
    Icon,
  },
  emits: ['columns-change'],

  setup(_) {
    const { t } = useI18n()
    const table = useTableContext()

    // const defaultRowSelection = omit(table.getRowSelection(), 'selectedRowKeys')
    // const inited = false

    const cachePlainOptions = ref<BasicColumn[]>([])
    const plainOptions = ref<BasicColumn[]>([])

    // const plainSortOptions = ref<BasicColumn[]>([])

    const columnListRef = ref<ComponentRef>(null)

    const state = reactive<State>({
      checkAll: true,
      checkedList: [],
      defaultCheckList: [],
    })

    const checkIndex = ref(false)
    const checkSelect = ref(false)

    const { prefixCls } = useDesign('basic-column-setting')

    const getValues = computed(() => {
      return unref(table?.getBindValues) || {}
    })

    watchEffect(() => {
      const columns = table.getColumns()
      if (columns.length) {
        init()
      }
    })

    watchEffect(() => {
      const values = unref(getValues)
      checkIndex.value = !!values.showIndexColumn
      checkSelect.value = !!values.showCheckboxColumn
    })

    function getColumns() {
      const ret: any[] = []
      table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
        ret.push(item)
      })
      return ret
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
        // .map(k => (k.prop || ''))
      // const checkList:string[] = state.checkedList
      const len = plainOptions.value.length
      state.checkAll = checkList.length === 0 ? false : checkList.length === len

      // const sortList = unref(plainSortOptions).map((item) => item.value)
      // checkedList.sort((prev, next) => {
      //   return sortList.indexOf(prev) - sortList.indexOf(next)
      // })
      // const data: ColumnChangeParam[] =
      // const checkColList:BasicColumn[] = unref(plainOptions)
      //   .filter((col) => col.prop && state.checkedList.indexOf(col.prop) !== -1)

      setColumns(checkList)
    }

    // reset columns
    function reset() {
      state.checkedList = [...state.defaultCheckList]
      state.checkAll = true
      plainOptions.value = unref(cachePlainOptions)
      // plainSortOptions.value = unref(cachePlainOptions)
      setColumns(table.getCacheColumns())
    }

    // Open the pop-up window for drag and drop initialization
    function handleVisibleChange(v:boolean) {
      if (v === false) return
      // if (inited) return
      // nextTick(() => {
      //   const columnListEl = unref(columnListRef)
      //   if (!columnListEl) return
      //   const el = columnListEl.$el as any
      //   if (!el) return
      //   // Drag and drop sort
      //   const { initSortable } = useSortable(el, {
      //     handle: '.move-column-icon',
      //     onEnd: (evt) => {
      //       const { oldIndex, newIndex } = evt
      //       if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
      //         return
      //       }
      //       // Sort column
      //       const columns = getColumns()

      //       if (oldIndex > newIndex) {
      //         columns.splice(newIndex, 0, columns[oldIndex])
      //         columns.splice(oldIndex + 1, 1)
      //       } else {
      //         columns.splice(newIndex + 1, 0, columns[oldIndex])
      //         columns.splice(oldIndex, 1)
      //       }

      //       plainSortOptions.value = columns
      //       plainOptions.value = columns
      //       setColumns(columns)
      //     }
      //   })
      //   initSortable()
      //   inited = true
      // })
    }

    // Control whether the serial number column is displayed
    function handleIndexCheckChange(v: boolean) {
      table.setProps({
        showIndexColumn: v,
      })
    }

    // Control whether the check box is displayed
    function handleSelectCheckChange(v: boolean) {
      table.setProps({
        showCheckboxColumn: v,
      })
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
      // table.setCacheColumnsByField?.(item.prop, { fixed: isFixed })
      setColumns(columns)
    }

    function setColumns(columns: BasicColumn[] | string[]) {
      // const data: ColumnChangeParam[] = unref(plainOptions).filter((col) => {

      // if(state.checkedList.indexOf(col.value) !== -1) {
      //   return
      // }
      // })
      table.setColumns(columns)

      // emit('columns-change', data)
    }

    return {
      t,
      ...toRefs(state),
      indeterminate,
      onCheckAllChange,
      handleChange,
      plainOptions,
      reset,
      prefixCls,
      columnListRef,
      handleVisibleChange,
      checkIndex,
      checkSelect,
      handleIndexCheckChange,
      handleSelectCheckChange,
      // defaultRowSelection,
      handleColumnFixed,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-basic-column-setting';

.table-coulmn-drag-icon {
  margin: 0 5px;
  cursor: move;
}

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
      color: var(--disabled-color);
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
