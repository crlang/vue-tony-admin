<template>
  <BasicModal
    :modelValue="visibleRef"
    :title="t('layout.header.lockScreen')"
    :width="600"
    @close="visibleRef=false"
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
      <el-input
        v-model="lockPassword"
        type="password"
        ref="lockInputRef"
        :placeholder="t('layout.header.lockScreenPassword')" />
      <el-button
        type="primary"
        class="mt-2"
        @click="handleLock">
        {{ t('layout.header.lockScreenBtn') }}
      </el-button>
    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect, watch, unref, nextTick } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'
import { BasicModal } from '@/components/Modal/index'
import { useUserStore } from '@/store/modules/user'
import { useLockStore } from '@/store/modules/lock'
import headerImg from '@/assets/images/header.jpg'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'LockModal',
  components: { BasicModal },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const { prefixCls } = useDesign('header-lock-modal')
    const lockInputRef = ref<Nullable<HTMLElement>>(null)
    const userStore = useUserStore()
    const lockStore = useLockStore()
    const lockPassword = ref('')
    const visibleRef = ref(false)
    const { createMessage } = useMessage()

    const getRealName = computed(() => userStore.getUserInfo?.realName)

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo
      return avatar || headerImg
    })

    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    watch(
      () => unref(visibleRef),
      (v) => {
        emit('update:visible', v)
      },
      {
        immediate: false,
      }
    )

    function handleLock() {
      if (!lockPassword.value) {
        nextTick(() => {
          unref(lockInputRef)?.focus()
        })
        return createMessage.warning('请输入锁屏密码')
      }

      lockStore.setLockInfo({
        isLock: true,
        pwd: lockPassword.value,
      })
      lockPassword.value = ''
      visibleRef.value = false
    }

    return {
      prefixCls,
      lockInputRef,
      lockPassword,
      visibleRef,
      getRealName,
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

    > .el-input {
      width: 100%;
    }

    > .el-button {
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
