<template>
  <div :class="prefixCls">
    <div
      v-show="!isEdit"
      :class="{ [`${prefixCls}__normal`]: true, 'ellipsis-cell': true }"
      @click="handleEdit">
      <div
        class="cell-content"
        :title="getValues ?? ''">
        {{ getValues ? getValues : '&nbsp;' }}
      </div>
      <Edit
        :class="`${prefixCls}__normal-icon`"
        v-if="!column.editRow" />
    </div>

    <template v-if="isEdit">
      <div
        :class="`${prefixCls}__wrapper`"
        v-loading="spinning"
        v-click-outside="onClickOutside">
        <CellComponent
          v-bind="getComponentProps"
          :component="getComponent"
          :style="getWrapperStyle"
          :popoverVisible="getRuleVisible"
          :rule="getRule"
          :ruleMessage="ruleMessage"
          :class="getWrapperClass"
          ref="elRef" />
        <div
          :class="`${prefixCls}__action`"
          v-if="!getRowEditable">
          <Check
            :class="[`${prefixCls}__icon`]"
            @click="handleSubmitClick" />
          <Close
            :class="`${prefixCls}__icon `"
            @click="handleCancel" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue'
import { computed, defineComponent, nextTick, ref, toRaw, unref, watchEffect } from 'vue'
import type { BasicColumn } from '../../types/table'
import type { EditRecordRow } from './index'
import { CellComponent } from './CellComponent'

import { useDesign } from '@/hooks/web/useDesign'
import { useTableContext } from '../../hooks/useTableContext'

import clickOutside from '@/directives/clickOutside'

import { propTypes } from '@/utils/propTypes'
import { isArray, isBoolean, isFunction, isNumber, isString } from '@/utils/is'
import { omit, pick, set } from 'lodash-es'
import { Edit, Close, Check } from '@element-plus/icons'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'EditableCell',
  components: { Edit, Close, Check, CellComponent },
  directives: {
    clickOutside,
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object] as PropType<string | number | boolean | Recordable>,
      default: '',
    },
    record: {
      type: Object as PropType<EditRecordRow>,
    },
    column: {
      type: Object as PropType<BasicColumn>,
      default: () => ({}),
    },
    index: propTypes.number,
  },
  setup(props) {
    const table = useTableContext()
    const isEdit = ref(false)
    const elRef = ref()
    const ruleVisible = ref(false)
    const ruleMessage = ref('')
    const optionsRef = ref<LabelValueOptions>([])
    const currentValueRef = ref<any>(props.value)
    const defaultValueRef = ref<any>(props.value)
    const spinning = ref<boolean>(false)
    const { t } = useI18n()

    const { prefixCls } = useDesign('editable-cell')

    const getComponent = computed(() => props.column?.editComponent || 'ElInput')
    const getRule = computed(() => props.column?.editRule)

    const getRuleVisible = computed(() => {
      return unref(ruleMessage) && unref(ruleVisible)
    })

    const getIsCheckComp = computed(() => {
      const component = unref(getComponent)
      return ['ElCheckbox', 'ElSwitch'].includes(component)
    })

    const getComponentProps = computed(() => {
      const compProps = props.column?.editComponentProps ?? {}
      const component = unref(getComponent)
      const apiSelectProps: Recordable = {}
      if (component === 'ApiSelect') {
        apiSelectProps.cache = true
      }

      const on = {
        [`oninput`]: (...args: Nullable<Recordable>[]) => {
          const [e] = args
          const target = e ? e.target : null
          const value = target?.value ?? (target ?? e)
          currentValueRef.value = value
        },
      }
      const isNum = component && ['ElInputNumber'].includes(component)

      const val = isNum ? Number(unref(currentValueRef)) : unref(currentValueRef)
      return {
        size: 'small',
        placeholder: t('common.inputText'),
        ...apiSelectProps,
        ...on,
        ...omit(compProps, 'onChange'),
        modelValue: val,
      }
    })

    const getValues = computed(() => {
      const { record, column } = props
      try {
        if (column.prop && record && record[column.prop]) {
          return record[column.prop]
        }
      } catch (error) {
        // ...
      }
      return ''
    })

    const getWrapperStyle = computed((): CSSProperties => {
      if (unref(getIsCheckComp) || unref(getRowEditable)) {
        return {}
      }
      return {
        width: 'calc(100% - 48px)',
      }
    })

    const getWrapperClass = computed(() => {
      const { align = 'center' } = props.column
      return `edit-cell-align-${align}`
    })

    const getRowEditable = computed(() => {
      const { editable } = props.record || {}
      return !!editable
    })

    watchEffect(() => {
      defaultValueRef.value = props.value || unref(getValues)
      currentValueRef.value = props.value || unref(getValues)
    })

    watchEffect(() => {
      const { editable } = props.column
      if (isBoolean(editable) || isBoolean(unref(getRowEditable))) {
        isEdit.value = !!editable || unref(getRowEditable)
      }
    })

    function handleEdit() {
      if (unref(getRowEditable) || unref(props.column?.editRow)) return
      ruleMessage.value = ''
      isEdit.value = true
      nextTick(() => {
        const el = unref(elRef)
        el?.focus?.()
      })
    }

    async function handleChange(e: any) {
      const component = unref(getComponent)
      if (!e) {
        currentValueRef.value = e
      } else if (e?.target && Reflect.has(e.target, 'value')) {
        currentValueRef.value = (e as ChangeEvent).target.value
      } else if (component === 'ElCheckbox') {
        currentValueRef.value = (e as ChangeEvent).target.checked
      } else if (isString(e) || isBoolean(e) || isNumber(e)) {
        currentValueRef.value = e
      }
      const onChange = props.column?.editComponentProps?.onChange
      if (onChange && isFunction(onChange)) onChange(...arguments)

      table.emit?.('edit-change', {
        column: props.column,
        value: unref(currentValueRef),
        record: toRaw(props.record),
      })
      handleSubmiRule()
    }

    async function handleSubmiRule() {
      const { column, record } = props
      const { editRule } = column
      const currentValue = unref(currentValueRef)

      if (editRule) {
        if (isBoolean(editRule) && !currentValue && !isNumber(currentValue)) {
          ruleVisible.value = true
          ruleMessage.value = t('common.inputText')
          return false
        }
        if (isFunction(editRule)) {
          const res = await editRule(currentValue, record as Recordable)
          if (res) {
            ruleMessage.value = res
            ruleVisible.value = true
            return false
          } else {
            ruleMessage.value = ''
            return true
          }
        }
      }
      ruleMessage.value = ''
      return true
    }

    async function handleSubmit(valid = true) {
      if (valid) {
        const isPass = await handleSubmiRule()
        if (!isPass) return false
      }

      const { column, index, record } = props
      if (!record) return false
      const { label, prop } = column
      const value = unref(currentValueRef)
      if (!label || !prop) return

      const dataKey = (prop || label) as string

      if (!record.editable) {
        const { getBindValues } = table

        const { beforeEditSubmit, columns } = unref(getBindValues)

        if (beforeEditSubmit && isFunction(beforeEditSubmit)) {
          spinning.value = true
          const keys: string[] = columns
            .map((_column) => _column.prop)
            .filter((field) => !!field) as string[]
          let result: any = true
          try {
            result = await beforeEditSubmit({
              record: pick(record, keys),
              index,
              key: prop,
              value,
            })
          } catch (e) {
            result = false
          } finally {
            spinning.value = false
          }
          if (result === false) {
            return
          }
        }
      }
      set(record, dataKey, value)
      isEdit.value = false
    }

    async function handleEnter() {
      if (props.column?.editRow) {
        return
      }
      handleSubmit()
    }

    function handleSubmitClick() {
      handleSubmit()
    }

    function handleCancel() {
      isEdit.value = false
      currentValueRef.value = defaultValueRef.value
      const { column, index, record } = props
      const { label, prop } = column
      table.emit?.('edit-cancel', {
        record,
        index,
        key: prop || label,
        value: unref(currentValueRef),
      })
    }

    function onClickOutside() {
      if (props.column?.editable || unref(getRowEditable)) {
        return
      }
      const component = unref(getComponent)

      if (component.includes('Input')) {
        handleCancel()
      }
    }

    // only ApiSelect or TreeSelect
    function handleOptionsChange(options: LabelValueOptions) {
      optionsRef.value = options
    }

    function initCbs(cbs: 'submitCbs' | 'validCbs' | 'cancelCbs', handle: Fn) {
      if (props.record) {
        /* eslint-disable  */
          isArray(props.record[cbs])
            ? props.record[cbs]?.push(handle)
            : (props.record[cbs] = [handle]);
        }
      }

      if (props.record) {
        initCbs('submitCbs', handleSubmit);
        initCbs('validCbs', handleSubmiRule);
        initCbs('cancelCbs', handleCancel);

        if (props.column.prop) {
          if (!props.record.editValueRefs) props.record.editValueRefs = {};
          props.record.editValueRefs[props.column.prop] = currentValueRef;
        }
        /* eslint-disable  */
        props.record.onCancelEdit = () => {
          isArray(props.record?.cancelCbs) && props.record?.cancelCbs.forEach((fn) => fn());
        };
        /* eslint-disable */
        props.record.onSubmitEdit = async () => {
          if (isArray(props.record?.submitCbs)) {
            if (!props.record?.onValid?.()) return;
            const submitFns = props.record?.submitCbs || [];
            submitFns.forEach((fn) => fn(false, false));
            table.emit?.('edit-row-end');
            return true;
          }
        };
      }

      return {
        isEdit,
        prefixCls,
        handleEdit,
        currentValueRef,
        handleSubmit,
        handleChange,
        handleCancel,
        elRef,
        getComponent,
        getRule,
        onClickOutside,
        ruleMessage,
        getRuleVisible,
        getComponentProps,
        handleOptionsChange,
        getWrapperStyle,
        getWrapperClass,
        getRowEditable,
        getValues,
        handleEnter,
        handleSubmitClick,
        spinning,
      };
    },
  });
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-editable-cell';

.edit-cell-align-left {
  text-align: left;

}

.edit-cell-align-center {
  text-align: center;

}

.edit-cell-align-right {
  text-align: right;

}

.#{$prefix-cls} {
  position: relative;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    width: 1.5em;
    height: 1.5em;

    &:hover {
      transform: scale(1.2);

      svg {
        color: var(--primary-color);
      }
    }
  }

  .ellipsis-cell {
    .cell-content {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      white-space: nowrap;
      overflow-wrap: break-word;
    }
  }

  &__normal {
    &-icon {
      position: absolute;
      top: 4px;
      right: 0;
      display: none;
      width: 20px;
      cursor: pointer;
    }
  }

  &:hover {
    .#{$prefix-cls}__normal-icon {
      display: inline-block;
    }
  }
}
</style>
