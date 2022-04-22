<template>
  <div>
    <RedoSetting v-if="getSetting.redo" />
    <SizeSetting v-if="getSetting.size" />
    <ColumnSetting
      v-if="getSetting.setting"
      @columns-change="handleColumnChange" />
    <FullScreenSetting v-if="getSetting.fullScreen" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { TableSetting, ColumnChangeParam } from '../../types/table'
import { defineComponent, computed, unref } from 'vue'
import ColumnSetting from './ColumnSetting.vue'
import SizeSetting from './SizeSetting.vue'
import RedoSetting from './RedoSetting.vue'
import FullScreenSetting from './FullScreenSetting.vue'
import { useTableContext } from '../../hooks/useTableContext'

export default defineComponent({
  name: 'TableSetting',
  components: {
    ColumnSetting,
    SizeSetting,
    RedoSetting,
    FullScreenSetting,
  },
  props: {
    setting: {
      type: Object as PropType<TableSetting>,
      default: () => ({}),
    },
  },
  emits: ['columns-change'],
  setup(props, { emit }) {
    const table = useTableContext()

    const getSetting = computed((): TableSetting => {
      return {
        redo: true,
        size: true,
        setting: true,
        fullScreen: true,
        ...props.setting,
      }
    })

    function handleColumnChange(data: ColumnChangeParam[]) {
      emit('columns-change', data)
    }

    function getTableContainer() {
      return table ? unref(table.wrapRef) : document.body
    }

    return { getSetting, handleColumnChange, getTableContainer }
  },
})
</script>
