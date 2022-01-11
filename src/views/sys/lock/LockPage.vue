<template>
  <div :class="prefixCls">
    <div
      :class="`${prefixCls}__unlock`"
      @click="handleShowForm(false)"
      v-show="showDate">
      <Lock style="width: 1.5em;" />
      <span>{{ t('sys.lock.unlock') }}</span>
    </div>

    <div :class="`${prefixCls}__box`">
      <div :class="`${prefixCls}__hour`">
        <span>{{ hour }}</span>
        <span
          v-show="showDate"
          class="meridiem">
          {{ meridiem }}
        </span>
      </div>
      <div :class="`${prefixCls}__minute`">
        <span>{{ minute }}</span>
      </div>
    </div>

    <transition name="fade-slide">
      <div
        :class="`${prefixCls}-entry`"
        v-show="!showDate">
        <div :class="`${prefixCls}-entry-content`">
          <div :class="`${prefixCls}-entry__header`">
            <img :src="userinfo.avatar || headerImg" />
            <p>{{ userinfo.realName }}</p>
          </div>
          <div :class="`${prefixCls}-entry__input`">
            <el-input
              v-model="password"
              :placeholder="t('sys.lock.placeholder')"
              @keypress.enter="unLock()" />
          </div>
          <span
            :class="`${prefixCls}-entry__err-msg`"
            v-if="errMsg">
            {{ t('sys.lock.alert') }}
          </span>
          <div :class="`${prefixCls}-entry__footer`">
            <el-button
              type="text"
              size="small"
              :disabled="loading"
              @click="handleShowForm(true)">
              {{ t('common.back') }}
            </el-button>
            <el-button
              type="text"
              size="small"
              :disabled="loading"
              @click="goLogin">
              {{ t('sys.lock.backToLogin') }}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="unLock()"
              :loading="loading">
              {{ t('sys.lock.entry') }}
            </el-button>
          </div>
        </div>
      </div>
    </transition>

    <div :class="`${prefixCls}__date`">
      <div v-show="!showDate">
        {{ hour }}:{{ minute }}
        <span>{{ meridiem }}</span>
      </div>
      <div>{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useLockStore } from '@/store/modules/lock'
import { useI18n } from '@/hooks/web/useI18n'
import { useNow } from './useNow'
import { useDesign } from '@/hooks/web/useDesign'
import { Lock } from '@element-plus/icons'
import headerImg from '@/assets/images/header.jpg'

const password = ref('')
const loading = ref(false)
const errMsg = ref(false)
const showDate = ref(true)

const { prefixCls } = useDesign('lock-page')
const lockStore = useLockStore()
const userStore = useUserStore()

const { hour, month, minute, meridiem, year, day, week } = useNow(true)

const { t } = useI18n()

const userinfo = computed(() => {
  return userStore.getUserInfo || {}
})

/**
 * @description: unLock
 */
async function unLock() {
  if (!password.value) {
    return
  }
  const pwd = password.value
  try {
    loading.value = true
    const res = await lockStore.unLock(pwd)
    errMsg.value = !res
  } finally {
    loading.value = false
  }
}

function goLogin() {
  userStore.logout(true)
  lockStore.resetLockInfo()
}

function handleShowForm(show = false) {
  showDate.value = show
}
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-lock-page';

.#{$prefix-cls} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;

  &__unlock {
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    padding: 12px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s linear;
    flex-direction: column;
  }

  &__box {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  &__hour,
  &__minute {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48%;
    font-weight: 700;
    color: #bababa;
    background-color: #141313;
    border-radius: 30px;

    @media screen and (max-width: $screen-md) {
      span:not(.meridiem) {
        font-size: 160px;
      }
    }

    @media screen and (min-width: $screen-md) {
      span:not(.meridiem) {
        font-size: 160px;
      }
    }

    @media screen and (max-width: $screen-sm) {
      span:not(.meridiem) {
        font-size: 90px;
      }
    }
    @media screen and (min-width: $screen-lg) {
      span:not(.meridiem) {
        font-size: 220px;
      }
    }

    @media screen and (min-width: $screen-xl) {
      span:not(.meridiem) {
        font-size: 260px;
      }
    }
    @media screen and (min-width: $screen-2xl) {
      span:not(.meridiem) {
        font-size: 320px;
      }
    }

    .meridiem {
      position: absolute;
      top: 24px;
      left: 24px;
    }
  }

  &__date {
    position: absolute;
    bottom: 12px;
    font-size: 24px;
    color: #fff;
    text-align: center;

    > div:first-child {
      font-size: 36px;
    }
  }

  &-entry {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);

    &-content {
      width: 260px;
    }

    &__header {
      text-align: center;

      > img {
        width: 70px;
        margin: 0 auto;
        border-radius: 50%;
      }

      > p {
        margin-top: 5px;
        font-weight: 500;
        color: #bababa;
      }
    }

    &__input {
      margin: 12px 0;
    }

    &__err-msg {
      display: inline-block;
      margin-top: 10px;
      color: var(--error-color);
    }

    &__footer {
      display: flex;
      justify-content: space-between;

      > .el-button {
        margin: 0 6px;
      }
    }
  }
}
</style>
