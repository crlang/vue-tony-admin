<template>
  <div>
    <div>
      <span>
        <Icon icon="ant-design:enter-outlined" />
      </span>
      <span>{{ t('component.app.toSearch') }}</span>
    </div>
    <div>
      <span>
        <Icon icon="ion:arrow-up-outline" />
      </span>
      <span>
        <Icon icon="ion:arrow-down-outline" />
      </span>
      <span>{{ t('component.app.toNavigate') }}</span>
    </div>
    <div>
      <span>
        <Icon icon="mdi:keyboard-esc" />
      </span>
      <span>{{ t('common.closeText') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()
</script>
