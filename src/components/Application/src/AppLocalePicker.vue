<!--
 * @Author: Tony
 * @Description: Multi-language switching component
-->
<template>
  <el-dropdown @command="handleMenuEvent">
    <span class="locale-dropdown-select">
      <SvgIcon
        :size="size"
        name="language" /><span v-if="showText">{{ getLocaleText }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in localeList"
          :key="item"
          :command="item.event">
          {{ item.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import type { LocaleType } from '#/config'
import { ref, watchEffect, unref, computed } from 'vue'
import { SvgIcon } from '@/components/Icon'
import { useLocale } from '@/locales/useLocale'
import { localeList } from '@/settings/localeSetting'
import { EleDropdownItem } from '@/components/ElementPlus'

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  size: { type: [Number, String], default: 18 },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean },
})

const selectedKeys = ref<string[]>([])

const { changeLocale, getLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

function handleMenuEvent(command: EleDropdownItem['command']) {
  if (unref(getLocale) === command) {
    return
  }
  toggleLocale(command as string)
}
</script>

<style lang="scss">
.locale-dropdown-select {
  display: flex;
  align-items: center;
  color: inherit;
  cursor: pointer;

  > svg {
    margin-right: 4px;
  }
}
</style>
