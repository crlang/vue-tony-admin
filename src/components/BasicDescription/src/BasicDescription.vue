<script lang="tsx">
import type { BasicProps, DescInstance } from './typing'
import type { CSSProperties } from 'vue'
import type { BasicProps as CollapseBasicProps } from '@/components/CollapseContainer'

import { defineComponent, computed, ref, unref } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { get, omit } from 'lodash-es'

import { CollapseContainer } from '@/components/CollapseContainer'
import { useDesign } from '@/hooks/web/useDesign'
import { getSlot } from '@/utils/helper/tsxHelper'

import { basicProps } from './props'

export default defineComponent({
  name: 'BasicDescription',
  props: basicProps,
  emits: ['register'],
  setup(props, { attrs, slots, emit, expose }) {
    const propsRef = ref<Partial<BasicProps> | null>(null)

    const { prefixCls } = useDesign('basic-description')

    /**
     * 获取更新 Props
     *
     * Merge Props
     */
    const getProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as Recordable),
      } as BasicProps
    })

    /**
     * 通过标题判断是否应该使用折叠组件
     *
     * Use the title to determine whether the collapsible component should be used
     */
    const useWrapper = computed(() => !!unref(getProps).title)

    /**
     * 获取折叠组件配置
     *
     * Get Collapse configuration
     */
    const getCollapseOptions = computed((): CollapseBasicProps => {
      const { collapseOptions = {} } = unref(getProps)
      return {
        // Cannot be expanded by default
        canExpand: false,
        ...collapseOptions,
      }
    })

    /**
     * 绑定描述Props
     *
     * Bind description props
     */
    const getBindValues = computed(() => {
      const opts = { ...unref(attrs), ...unref(getProps) }
      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customProps = ['schema', 'data', 'useCollapse', 'collapseOptions', 'title']

      return omit(opts, customProps) as BasicProps
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param descProps Description Props
     */
    function setDescProps(descProps: Partial<BasicProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...descProps } as Recordable
    }

    /**
     * 渲染描述项
     *
     * Render Description item
     */
    function renderItem() {
      const { schema, data } = unref(getProps)
      return unref(schema)
        .map((item) => {
          const { field, show, isSlot, render, minWidth } = item

          if (show && typeof show === 'function' && !show(data)) {
            return null
          }

          const getContent = () => {
            if (!data) return null

            const getField = get(data, field)
            // 是否自定义插槽，插槽名称为 field 值
            // Custom Slot, slot name is field value
            if (isSlot) {
              return getSlot(slots, field, getField)
            }
            // 是否自定义渲染函数
            return typeof render === 'function' ? render(getField, item) : getField ?? ''
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
              }
              }
            </ElDescriptionsItem>
          )
        })
        .filter((item) => !!item)
    }

    /**
     * 渲染描述
     *
     * Render description
     */
    const renderDesc = () => {
      return (
        <ElDescriptions class={`${prefixCls}`} {...(unref(getBindValues))}>
          {renderItem()}
        </ElDescriptions>
      )
    }

    /**
     * 渲染折叠容器
     *
     * Render collapse container
     */
    const renderContainer = () => {
      // 如果 useCollapse 为 false， 不渲染折叠容器
      // If useCollapse is false, do not render the collapsed container
      if (!props.useCollapse) {
        return renderDesc()
      }

      const { canExpand, helpMessage } = unref(getCollapseOptions)
      const { title } = unref(getProps)

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
    expose(methods)

    return () => (unref(useWrapper) ? renderContainer() : renderDesc())
  },
})
</script>
