<template>
  <ElPopover
    trigger="hover"
    :width="250"
    popper-class="table-column-setting__list">
    <div class="table-column-setting__title">
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
        @change="handleChange">
        <template
          v-for="item in plainOptions"
          :key="item.value">
          <div class="table-column-setting__check-item">
            <ElCheckbox :label="item.prop">{{ item.label }}</ElCheckbox>
            <span @click="handleColumnFixed(item, 'left')">
              <SvgIcon
                name="align-right"
                rotate="-180deg"
                :class="[
                  'table-column-setting__fixed-left',
                  {
                    active: item.fixed === 'left',
                    disabled: !checkedList.includes(item.prop as string),
                  },
                ]" />
            </span>
            <span @click="handleColumnFixed(item, 'right')">
              <SvgIcon
                name="align-right"
                :class="[
                  'table-column-setting__fixed-right',
                  {
                    active: item.fixed === 'right',
                    disabled: !checkedList.includes(item.prop as string),
                  },
                ]" />
            </span>
          </div>
        </template>
      </ElCheckboxGroup>
    </ScrollContainer>
    <template #reference>
      <span>
        <ElTooltip
          placement="top"
          content="列设置">
          <SvgIcon name="cog" />
        </ElTooltip>
      </span>
    </template>
  </ElPopover>
</template>

<script lang="ts">
import type { BasicColumn } from '../types/table'

import { defineComponent, ref, watchEffect, unref, computed } from 'vue'
import { ElPopover, ElCheckbox, ElCheckboxGroup, ElButton, ElTooltip } from 'element-plus'

import { SvgIcon } from '@/components/SvgIcon'
import { usePermission } from '@/hooks/web/usePermission'
import { ScrollContainer } from '@/components/ScrollContainer'

import { useTableContext } from '../hooks/useTableContext'

export default defineComponent({
  name: 'TableColumnSetting',
  components: {
    ElPopover,
    ElCheckbox,
    ElCheckboxGroup,
    ElButton,
    ElTooltip,
    ScrollContainer,
    SvgIcon,
  },
  emits: ['columns-change'],

  setup(_, { emit }) {
    const table = useTableContext()

    const plainOptions = ref<BasicColumn[]>([])
    const checkAll = ref(true)
    const checkedList = ref<string[]>([])
    const defaultCheckList = ref<string[]>([])

    /**
     * 检查是否全选
     *
     * Check if all is selected
     */
    const indeterminate = computed(() => {
      const len = plainOptions.value.length
      const checkdedLen = checkedList.value.length
      return checkdedLen > 0 && checkdedLen < len
    })
    /**
     * 获取当前合法的列
     *
     * Get columns
     */
    function getColumns() {
      const ret: BasicColumn[] = []
      const { hasPermission } = usePermission()
      table.getColumns({
        ignoreIndex: true,
        ignoreAction: true,
        ignoreCheckbox: true,
        ignoreExpand: true,
      }).forEach((item) => {
        ret.push(item)
      })
      // 过滤权限的列
      return ret.filter((column) => {
        return hasPermission(column.auth)
      })
    }
    /**
     * 初始化可操作列
     *
     * Initialize actionable columns
     */
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
        defaultCheckList.value = checkList
      }
      checkedList.value = checkList
    }

    /**
     * 切换全选
     *
     * Toggle select all
     * @param v
     */
    function onCheckAllChange(v:boolean) {
      if (v) {
        const checkList:BasicColumn[] = [...plainOptions.value]
        checkedList.value = checkList.map(k => (k.prop as string))
        setColumns(checkList)
      } else {
        checkedList.value = []
        setColumns([])
      }
    }

    /**
     * 切换显示选中列
     *
     * Trigger when check/uncheck a column
     */
    function handleChange() {
      const checkList:BasicColumn[] = unref(plainOptions)
        .filter((col) => col.prop && checkedList.value.indexOf(col.prop) !== -1)
      const len = plainOptions.value.length
      checkAll.value = checkList.length === 0 ? false : checkList.length === len
      setColumns(checkList)
    }

    /**
     * 重置为初始化
     *
     * Reset columns
     */
    function reset() {
      checkedList.value = [...unref(defaultCheckList)]
      checkAll.value = true
      setColumns(table.getCacheColumns())
    }

    /**
     * 设置选中列是否固定在左/右侧
     *
     * Set whether the selected column is fixed to the left/right
     * @param item BasicColumn
     * @param fixed
     */
    function handleColumnFixed(item: BasicColumn, fixed?: 'left' | 'right') {
      if (!checkedList.value.includes(item.prop as string)) return

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

    /**
     * 更新列
     *
     * Set columns
     * @param columns BasicColumn[]
     */
    function setColumns(columns: BasicColumn[] | string[]) {
      table.setColumns(columns)

      emit('columns-change', JSON.parse(JSON.stringify(columns)))
    }

    watchEffect(() => {
      const columns = table.getColumns()
      if (columns.length) {
        init()
      }
    })

    return {
      checkAll,
      checkedList,
      defaultCheckList,
      indeterminate,
      plainOptions,
      onCheckAllChange,
      handleChange,
      reset,
      handleColumnFixed,
    }
  },
})
</script>

<style lang="scss">
.table-column-setting {
  &__title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    .scrollbar {
      height: 220px;
    }
  }

  &__check-item {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: var(--font-base-size);

    .el-checkbox {
      flex: 1;
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
}
</style>
