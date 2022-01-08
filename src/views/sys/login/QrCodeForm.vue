<template>
  <div
    v-if="getShow"
    class="text-center">
    <QrCode
      :value="qrCodeUrl"
      :width="280" />
    <el-divider>{{ t('sys.login.scanSign') }}</el-divider>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { QrCode } from '@/components/Qrcode/index'
import { useI18n } from '@/hooks/web/useI18n'
import { useLoginState, LoginStateEnum } from './useLogin'

const qrCodeUrl = 'http://tony.crlang.com'

const { t } = useI18n()
const { getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
</script>
