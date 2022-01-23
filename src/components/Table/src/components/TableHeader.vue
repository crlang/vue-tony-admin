<template>
  <div :class="prefixCls">
    <div
      v-if="$slots.headerTop"
      :class="`${prefixCls}__top`">
      <slot name="headerTop"></slot>
    </div>
    <div :class="`${prefixCls}__inner`">
      <div :class="`${prefixCls}__title`">
        <slot
          v-if="$slots.tableTitle"
          name="tableTitle"></slot>
        <TableTitle
          :helpMessage="titleHelpMessage"
          :title="title"
          v-else-if="title"
        />
      </div>
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar"></slot>
        <el-divider
          direction="vertical"
          v-if="$slots.toolbar && showTableSetting" />
        <TableSetting
          :setting="tableSetting"
          v-if="showTableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { TableSetting, ColumnChangeParam } from '../types/table'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import TableSettingComponent from './settings/index.vue'
import TableTitle from './TableTitle.vue'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'BasicTableHeader',
  components: {
    TableTitle,
    TableSetting: TableSettingComponent,
  },
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
    },
    tableSetting: {
      type: Object as PropType<TableSetting>,
    },
    showTableSetting: {
      type: Boolean,
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  },
  emits: ['columns-change'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('basic-table-header')
    function handleColumnChange(data: ColumnChangeParam[]) {
      emit('columns-change', data)
    }
    return { prefixCls, handleColumnChange }
  },
})
</script>
<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table-header';

.#{$prefix-cls} {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    > * {
      margin-right: 8px;
    }
  }
}
</style>
