<template>
  <li :class="getClass" :style="getCollapse ? {} : getItemStyle" @click.stop="handleClickItem">
    <ElTooltip v-if="showTooptip" placement="right">
      <div :class="`${prefixCls}--tooltip`">
        <slot></slot>
      </div>
      <template #content>
        <slot name="title"></slot>
      </template>
    </ElTooltip>

    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, unref, watch } from 'vue'
import { ElTooltip } from 'element-plus'

import { useMenuItem } from './useMenu'
import { useSimpleRootMenuContext } from './useSimpleMenuContext'
import { useDesign } from '@/hooks/web/useDesign'

export default defineComponent({
  name: 'MenuItem',
  components: { ElTooltip },
  props: {
    name: {
      type: String,
      required: true,
    },
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()

    const active = ref(false)

    const { getItemStyle, getParentList, getParentMenu, getParentRootMenu } = useMenuItem(instance)

    const { prefixCls } = useDesign('simple-menu-item')

    const { rootMenuEmitter, activeName } = useSimpleRootMenuContext()

    const getClass = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}--active`]: unref(active),
          [`${prefixCls}--selected`]: unref(active),
          [`${prefixCls}--disabled`]: !!props.disabled,
        },
      ]
    })

    const getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse)

    const showTooptip = computed(() => {
      return unref(getParentMenu)?.type.name === 'MenuList' && unref(getCollapse) && slots.title
    })

    function handleClickItem() {
      const { disabled } = props
      if (disabled)
        return

      rootMenuEmitter.emit('on-menu-item-select', props.name)
      if (unref(getCollapse))
        return

      const { uidList } = getParentList()

      rootMenuEmitter.emit('on-update-opened', {
        opend: false,
        parent: instance?.parent,
        uidList,
      })
    }
    watch(
      () => unref(activeName),
      (name: string) => {
        if (name === props.name) {
          const { list, uidList } = getParentList()
          active.value = true
          list?.forEach((item) => {
            if (item.proxy) {
              (item.proxy as any).active = true
            }
          })

          rootMenuEmitter.emit('on-update-active-name:submenu', uidList)
        }
        else {
          active.value = false
        }
      },
      { immediate: true },
    )

    return { getClass, prefixCls, getItemStyle, getCollapse, handleClickItem, showTooptip }
  },
})
</script>
