<template>
  <el-input
    :style="{ width }"
    :placeholder="t('component.icon.placeholder')"
    :class="prefixCls"
    v-model="currentSelect">
    <template #append>
      <el-popover
        :width="560"
        trigger="click"
        :placement="placement">
        <div :class="`${prefixCls}__search`">
          <el-input
            v-model="searckKeyword"
            :placeholder="t('component.icon.search')"
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
                  v-else />
                <div>{{ icon }}</div>
              </li>
            </ul>
          </ScrollContainer>
        </div>
        <template v-else>
          <div class="p-5"><el-empty /></div>
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

      </el-popover>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref, watchEffect, watch, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollContainer } from '@/components/Container'
import Icon from './Icon.vue'
import SvgIcon from './SvgIcon.vue'

import iconsData from '../data/icons.data'
import { propTypes } from '@/utils/propTypes'
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from '@/hooks/web/useI18n'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { useMessage } from '@/hooks/web/useMessage'
import svgIcons from 'virtual:svg-icons-names'

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

const props = defineProps({
  value: propTypes.string,
  width: propTypes.string.def('300px'),
  placement: propTypes.string.def('bottom'),
  copy: propTypes.bool.def(false),
  mode: propTypes.oneOf<('svg' | 'iconify')[]>(['svg', 'iconify']).def('iconify'),
})

const emit = defineEmits(['change', 'update:value'])

const isSvgMode = props.mode === 'svg'
const icons = isSvgMode ? getSvgIcons() : getIcons()

const currentSelect = ref('')
const currentList = ref(icons)
const searckKeyword = ref('')

const { t } = useI18n()
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

function handleClick(icon: string) {
  currentSelect.value = icon
  if (props.copy) {
    clipboardRef.value = icon
    console.log('isSuccessRef', isSuccessRef.value)
    if (unref(isSuccessRef)) {
      createMessage.success(t('component.icon.copy'))
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
          width: 36px !important;
          height: 36px !important;
        }
      }
    }

    .eleicon {
      padding: 12px;
      font-size: 36px !important;
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
</style>
