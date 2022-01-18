<template>
  <BasicModal
    :title="t('layout.header.lockScreen')"
    @register="register"
    :width="600"
    :showCancelBtn="false"
    :showConfirmBtn="false"
    :footer="null"
    :custom-class="prefixCls">
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img
          :src="avatar"
          :class="`${prefixCls}__header-img`" />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>

      <BasicForm @register="registerForm" />

      <div :class="`${prefixCls}__footer`">
        <el-button
          type="primary"
          class="mt-2"
          @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </el-button>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'
import { BasicModal, useModalInner } from '@/components/Modal/index'
import { useUserStore } from '@/store/modules/user'
import { useLockStore } from '@/store/modules/lock'
import headerImg from '@/assets/images/header.jpg'
import { BasicForm, useForm } from '@/components/Form'

export default defineComponent({
  name: 'LockModal',
  components: { BasicModal, BasicForm },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useI18n()
    const { prefixCls } = useDesign('header-lock-modal')
    const userStore = useUserStore()
    const lockStore = useLockStore()

    const getRealName = computed(() => userStore.getUserInfo?.realName)
    const [register, { closeModal }] = useModalInner()

    const [registerForm, { validateField, resetFields, getFieldsValue }] = useForm({
      showActionButtonGroup: false,
      schemas: [
        {
          field: 'password',
          label: '',
          component: 'ElInput',
          componentProps: {
            type: 'password',
            placeholder: t('layout.header.lockScreenPassword'),
          },
          required: true,
        },
      ],
    })

    async function handleLock() {
      await validateField()
      const values = (getFieldsValue()) as any
      const password: string | undefined = values.password
      closeModal()

      lockStore.setLockInfo({
        isLock: true,
        pwd: password,
      })
      await resetFields()
    }

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo
      return avatar || headerImg
    })

    return {
      prefixCls,
      getRealName,
      register,
      registerForm,
      avatar,
      t,
      handleLock,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-header-lock-modal';

.#{$prefix-cls} {
  &__entry {
    position: relative;
    padding: 130px 30px 30px;
    border-radius: 10px;

    .el-form-item__label {
      display: none;
    }

    .el-input {
      width: 100%;
    }

    .el-button {
      width: 100%;
    }
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 45px);
    width: auto;
    text-align: center;

    &-img {
      width: 70px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
    }
  }
}
</style>
