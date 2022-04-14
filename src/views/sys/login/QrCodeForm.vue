<template>
  <div
    v-if="getShow"
    class="text-center">
    <QrCode
      :value="qrCodeUrl"
      :width="200" />
    <el-divider>{{ t('sys.login.scanSign') }}</el-divider>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { ElDivider } from 'element-plus'
import { QrCode } from '@/components/QrCode'
import { useI18n } from '@/hooks/web/useI18n'
import { useLoginState, LoginStateEnum } from './useLogin'

const qrCodeUrl = "Hi I'm Tony!"

const { t } = useI18n()
const { getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
</script>
