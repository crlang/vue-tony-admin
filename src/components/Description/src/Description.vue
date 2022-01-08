<script lang="tsx">
import type { DescriptionProps, DescInstance, DescItem } from './typing'
import type { CSSProperties } from 'vue'
import type { CollapseContainerOptions } from '@/components/Container/index'
import { defineComponent, computed, ref, unref } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { CollapseContainer } from '@/components/Container/index'
import { useDesign } from '@/hooks/web/useDesign'
import { getSlot } from '@/utils/helper/tsxHelper'
import { useAttrs } from '@/hooks/core/useAttrs'
import { DescSizes } from './typing'
import { get } from 'lodash-es'
import { isFunction } from '@/utils/is'

const props = {
  useCollapse: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: false,
  },
  column: {
    type: Number,
    default: 3,
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  size: {
    type: String as PropType<DescSizes>,
  },
  extra: {
    type: String,
    default: '',
  },
  collapseOptions: {
    type: Object as PropType<CollapseContainerOptions>,
    default: null,
  },
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  data: { type: Object },
}

export default defineComponent({
  name: 'Description',
  props,
  emits: ['register'],
  setup(props, { slots, emit }) {
    const propsRef = ref<Partial<DescriptionProps> | null>(null)

    const { prefixCls } = useDesign('description')
    const attrs = useAttrs()

    // Custom title component: get title
    const getMergeProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as DescriptionProps
    })

    // Hide the header of the Descriptions component
    const getProps = computed(() => {
      const opt = {
        ...unref(getMergeProps),
        title: '',
      }
      return opt as DescriptionProps
    })

    /**
       * @description: Whether to setting title
       */
    const useWrapper = computed(() => !!unref(getMergeProps).title)

    /**
       * @description: Get configuration Collapse
       */
    const getCollapseOptions = computed((): CollapseContainerOptions => {
      return {
        // Cannot be expanded by default
        canExpand: false,
        ...unref(getProps).collapseOptions,
      }
    })

    const getDescriptionsProps = computed(() => {
      return { ...unref(attrs), ...unref(getProps) } as DescriptionProps
    })

    /**
       * @description:设置desc
       */
    function setDescProps(descProps: Partial<DescriptionProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable
    }

    function renderItem() {
      const { schema, data } = unref(getProps)
      return unref(schema)
        .map((item) => {
          const { minWidth } = item
          const { field, show } = item

          if (show && isFunction(show) && !show(data)) {
            return null
          }

          const getContent = () => {
            const _data = unref(getProps)?.data
            if (!_data) {
              return null
            }
            const getField = get(_data, field)
            return getField ?? ''
          }
          return (
            <ElDescriptionsItem {...(unref(item) as any)}>
              {() => {
                if (!minWidth) {
                  return getContent()
                }
                const style: CSSProperties = {
                  minWidth: `${minWidth}px`,
                }
                return <div style={style}>{getContent()}</div>
              }}
            </ElDescriptionsItem>
          )
        })
        .filter((item) => !!item)
    }

    const renderDesc = () => {
      return (
        <ElDescriptions class={`${prefixCls}`} {...(unref(getDescriptionsProps) as any)}>
          {renderItem()}
        </ElDescriptions>
      )
    }

    const renderContainer = () => {
      const content = props.useCollapse ? renderDesc() : <div>{renderDesc()}</div>
      // Reduce the dom level
      if (!props.useCollapse) {
        return content
      }

      const { canExpand, helpMessage } = unref(getCollapseOptions)
      const { title } = unref(getMergeProps)

      return (
        <CollapseContainer title={title} canExpan={canExpand} helpMessage={helpMessage}>
          {{
            default: () => content,
            action: () => getSlot(slots, 'action'),
          }}
        </CollapseContainer>
      )
    }

    const methods: DescInstance = {
      setDescProps,
    }

    emit('register', methods)
    return () => (unref(useWrapper) ? renderContainer() : renderDesc())
  },
})
</script>
