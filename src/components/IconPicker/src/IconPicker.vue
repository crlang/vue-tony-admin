<template>
  <ElInput
    :style="{ width }"
    placeholder="点击选择图标"
    :class="prefixCls"
    v-model="currentSelect">
    <template #append>
      <ElPopover
        :width="560"
        trigger="click"
        placement="bottom">
        <div :class="`${prefixCls}__search`">
          <ElInput
            v-model="searckKeyword"
            placeholder="搜索图标"
            @input="debounceHandleSearchChange"
            clearable />
        </div>
        <div
          :class="`${prefixCls}__list`"
          v-if="currentList.length">
          <ScrollContainer>
            <ul>
              <li
                v-for="icon in currentList"
                :key="icon"
                :class="{'is-actived': currentSelect === icon}"
                @click="handleClick(icon)"
                :title="icon">
                <SvgIcon
                  v-if="isSvgMode"
                  :name="icon" />
                <Icon
                  :icon="icon"
                  size="36"
                  v-else />
                <div>{{ icon }}</div>
              </li>
            </ul>
          </ScrollContainer>
        </div>
        <template v-else>
          <div class="p-5"><ElEmpty /></div>
        </template>

        <template #reference>
          <span
            :class="`${prefixCls}__icon`"
            v-if="isSvgMode && currentSelect">
            <SvgIcon :name="currentSelect" />
          </span>
          <span
            :class="`${prefixCls}__search`"
            v-else><Icon :icon="currentSelect || 'ion:apps-outline'" /></span>
        </template>

      </ElPopover>
    </template>
  </ElInput>
</template>

<script lang="ts">
import { ref, watchEffect, watch, unref, defineComponent } from 'vue'
import { ElInput, ElPopover, ElEmpty } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollContainer } from '@/components/Container'
import Icon from '@/components/Icon/src/Icon.vue'
import SvgIcon from '@/components/Icon/src/SvgIcon.vue'
import iconsData from './data'
import { useDebounceFn } from '@vueuse/core'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { useMessage } from '@/hooks/web/useMessage'
import svgIcons from 'virtual:svg-icons-names'

export default defineComponent({
  name: 'IconPicker',
  components: { ElInput, ElPopover, ElEmpty, ScrollContainer, Icon, SvgIcon },
  inheritAttrs: false,
  props: {
    /**
     * Default icon value
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * Input width
     */
    width: {
      type: String,
      default: '300px',
    },
    /**
     * Popover placement
     */
    // placement: {
    //   type: String,
    //   default: 'bottom',
    // },
    /**
     * Whether to copy when clicked
     */
    copy: { type: Boolean },
    /**
     * Icon mode
     */
    mode: {
      type: String as PropType<'svg' | 'iconify'>,
      default: 'iconify',
    },
  },
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const isSvgMode = props.mode === 'svg'
    const icons = isSvgMode ? getSvgIcons() : getIcons()

    const currentSelect = ref('')
    const currentList = ref(icons)
    const searckKeyword = ref('')

    const { prefixCls } = useDesign('icon-picker')

    const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100)
    const { clipboardRef, isSuccessRef } = useCopyToClipboard(props.value)
    const { createMessage } = useMessage()

    watchEffect(() => {
      currentSelect.value = props.value
    })

    watch(
      () => currentSelect.value,
      (v) => {
        emit('update:value', v)
        return emit('change', v)
      }
    )

    function getIcons() {
      const data = iconsData as any
      const prefix: string = data?.prefix ?? ''
      let result: string[] = []
      if (prefix) {
        result = (data?.icons ?? []).map((item) => `${prefix}:${item}`)
      } else if (Array.isArray(iconsData)) {
        result = iconsData as string[]
      }
      return result
    }

    function getSvgIcons() {
      return svgIcons.map((icon) => icon.replace('icon-', ''))
    }

    function handleClick(icon: string) {
      currentSelect.value = icon
      if (props.copy) {
        clipboardRef.value = icon
        if (unref(isSuccessRef)) {
          createMessage.success('复制图标成功!')
        }
      }
    }

    function handleSearchChange(value: any) {
      if (!value) {
        currentList.value = icons
        return
      }
      currentList.value = icons.filter((item) => item.includes(value))
    }

    return {
      prefixCls,
      currentSelect,
      currentList,
      isSvgMode,
      searckKeyword,
      handleClick,
      debounceHandleSearchChange,
    }
  },
})

</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-icon-picker';

.#{$prefix-cls} {
  &__list{
    display: block;
    margin: 24px 0;

    .scrollbar {
      height: 300px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      > li {
        width: calc(20% - 24px);
        margin: 12px;
        text-align: center;

        > div {
          font-size: 12px;
        }

        > svg {
          width: 36px;
          height: 36px;
        }
      }
    }

    .eleicon {
      padding: 12px;
      cursor: pointer;
      border: 1px solid #eee;

      &:hover {
        background: #f4f7f9;
      }
    }
  }

  &__icon,
  &__search {
    svg {
      width: 16px;
      height: 16px;
    }
  }
}

html[data-theme='dark'] {
  .#{$prefix-cls} {
    &__list{
      .eleicon {
        border: 1px solid #44566c;

        &:hover {
          background: #44566c;
        }
      }
    }
  }
}
</style>
