<script lang="tsx">
import type { DescProps, DescInstance } from './typing'
import type { CSSProperties } from 'vue'
import type { CollapseContainerOptions } from '@/components/Container/index'

import { defineComponent, computed, ref, unref } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { CollapseContainer } from '@/components/Container/index'
import { useDesign } from '@/hooks/web/useDesign'
import { getSlot } from '@/utils/helper/tsxHelper'
import { useAttrs } from '@/hooks/core/useAttrs'
import { get } from 'lodash-es'
import { isFunction } from '@/utils/is'
import { basicProps } from './props'

export default defineComponent({
  name: 'Description',
  props: basicProps,
  emits: ['register'],
  setup(props, { slots, emit }) {
    const propsRef = ref<Partial<DescProps> | null>(null)

    const { prefixCls } = useDesign('basic-description')
    const attrs = useAttrs()

    /**
     * Custom title component: get title
     */
    const getMergeProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as DescProps
    })

    /**
     * Hide the header of the Descriptions component
     */
    const getProps = computed(() => {
      const opt = {
        ...unref(getMergeProps),
        title: '',
      }
      return opt as DescProps
    })

    /**
     * Whether to setting title
     */
    const useWrapper = computed(() => !!unref(getMergeProps).title)

    /**
     * Get configuration Collapse
     */
    const getCollapseOptions = computed((): CollapseContainerOptions => {
      return {
        // Cannot be expanded by default
        canExpand: false,
        ...unref(getProps).collapseOptions,
      }
    })

    const getDescriptionsProps = computed(() => {
      return { ...unref(attrs), ...unref(getProps) } as DescProps
    })

    /**
       * Set desc
       */
    function setDescProps(descProps: Partial<DescProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable
    }

    function renderItem() {
      const { schema, data } = unref(getProps)
      return unref(schema)
        .map((item) => {
          const { field, show, render, minWidth } = item

          if (show && isFunction(show) && !show(data)) {
            return null
          }

          const getContent = () => {
            const _data = unref(getProps)?.data
            if (!_data) {
              return null
            }
            const getField = get(_data, field)
            return isFunction(render) ? render(getField, _data) : getField ?? ''
          }

          return (
            <ElDescriptionsItem {...(unref(item))}>
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
        <ElDescriptions class={`${prefixCls}`} {...(unref(getDescriptionsProps))}>
          {renderItem()}
        </ElDescriptions>
      )
    }

    const renderContainer = () => {
      // Reduce the dom level
      if (!props.useCollapse) {
        return renderDesc()
      }

      const { canExpand, helpMessage } = unref(getCollapseOptions)
      const { title } = unref(getMergeProps)

      return (
        <CollapseContainer title={title} canExpan={canExpand} helpMessage={helpMessage}>
          {{
            default: () => renderDesc(),
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
