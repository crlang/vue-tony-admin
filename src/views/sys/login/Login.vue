<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__bg`">
      <img
        src="@/assets/images/login_bg_light.jpg"
        :class="`${prefixCls}__bg--light`" />
      <img
        src="@/assets/images/login_bg_dark.jpg"
        :class="`${prefixCls}__bg--dark`" />
    </div>

    <el-row :class="`${prefixCls}__inner`">
      <el-col :span="14">
        <div :class="`${prefixCls}__left`">
          <h1>{{ t('sys.login.welcome') }} <span>{{ title }}</span></h1>
          <p>{{ title }} {{ t('sys.login.sloganTitle') }}</p>
          <p>{{ t('sys.login.sloganDesc') }}</p>
        </div>
      </el-col>
      <el-col :span="10">
        <div :class="`${prefixCls}__right`">
          <div :class="`${prefixCls}__mode`">
            <AppLocalePicker
              class="mr-2"
              size="24"
              :showText="false"
              v-if="!sessionTimeout && showLocale" />
            <AppDarkModeToggle v-if="!sessionTimeout" />
          </div>

          <div :class="`${prefixCls}__logo`">
            <AppLogo />
            <p>{{ t('sys.login.slogan') }}</p>
          </div>
          <div :class="`${prefixCls}__form`">
            <el-tabs
              v-if="getShow"
              v-model="activeName">
              <el-tab-pane
                :label="t('sys.login.signInFormTitle')"
                name="account" />
              <el-tab-pane
                :label="t('sys.login.mobileSignInFormTitle')"
                name="mobile" />
            </el-tabs>
            <LoginForm />
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
          </div>

          <div
            :class="`${prefixCls}__regnew`"
            v-if="getShow">
            {{ t('sys.login.noAccount') }} <span @click="setLoginState(LoginStateEnum.REGISTER)"> {{ t('sys.login.registerButton') }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import { AppLogo } from '@/components/Application'
import { AppLocalePicker, AppDarkModeToggle } from '@/components/Application'
import LoginForm from './LoginForm.vue'
import ForgetPasswordForm from './ForgetPasswordForm.vue'
import RegisterForm from './RegisterForm.vue'
import MobileForm from './MobileForm.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useLocaleStore } from '@/store/modules/locale'
import { useLoginState, LoginStateEnum } from './useLogin'
import { useI18n } from '@/hooks/web/useI18n'
import { useGlobSetting } from '@/hooks/setting'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElTabs,
    ElTabPane,
    LoginForm,
    ForgetPasswordForm,
    RegisterForm,
    MobileForm,
    AppLogo,
    AppLocalePicker,
    AppDarkModeToggle,
  },
  props: {
    sessionTimeout: {
      type: Boolean,
    },
  },
  setup() {
    const { prefixCls } = useDesign('login')
    const localeStore = useLocaleStore()
    const showLocale = localeStore.getShowPicker
    const { setLoginState, getLoginState } = useLoginState()
    const { title } = useGlobSetting()
    const { t } = useI18n()
    const activeName = ref('account')
    const activeNameExt = {
      'account': LoginStateEnum.LOGIN,
      'mobile': LoginStateEnum.MOBILE,
    }

    const getShow = computed(() => {
      return unref(getLoginState) === LoginStateEnum.LOGIN ||
      unref(getLoginState) === LoginStateEnum.MOBILE ||
      unref(getLoginState) === LoginStateEnum.QR_CODE
    })

    watch(() => unref(activeName), (v) => {
      v && setLoginState((activeNameExt[v]))
    })

    return {
      prefixCls,
      t,
      title,
      showLocale,
      setLoginState,
      getShow,
      LoginStateEnum,
      activeName,
    }
  },
})

</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-login';

.#{$prefix-cls} {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  &__inner {
    width: 100%;
    height: 100%;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    pointer-events: none;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
      content: '';
    }

    > img {
      display: none;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(5px) opacity(0.8);
    }
  }

  &__left {
    position: relative;
    display: flex;
    justify-content: flex-end;
    height: 100vh;
    max-width: 80%;
    padding: 0 2.5rem 6rem;
    flex-direction: column;
    color: var(--text-primary-color);

    > h1 {
      margin-bottom: 2rem;
      font-size: 3rem;
      font-weight: bold;
      letter-spacing: 2px;

      > span {
        font-family: var(--font-family-logo);
        color: var(--primary-color);
      }
    }

    > p {
      margin-bottom: 1rem;
      font-size: 16px;
    }
  }

  &__right {
    position: relative;
    height: 100vh;
    min-height: 580px;
    padding: 4rem;
    overflow: auto;
    background-color: var(--background-primary-color);
  }

  &__mode {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 2px;
    white-space: nowrap;
    flex-direction: column;

    > p {
      margin: 2.5rem 0;
      font-size: 14px;
      font-weight: normal;
    }
  }

  &__form {
    max-width: 440px;
    margin: auto;

    .el-tabs__header {
      margin-bottom: 24px;
    }

    .el-tabs__nav {
      width: 100%;

      .el-tabs__item {
        width: 50%;
        text-align: center;
      }
    }

    .el-form-item {
      margin-bottom: 24px;
    }

    .el-input__inner {
      width: 100%;
      height: 44px;
      line-height: 44px;
    }
  }

  &__regnew {
    position: absolute;
    bottom: 30px;

    > span {
      color: var(--primary-color);
      cursor: pointer;
    }
  }

  .login--submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    padding: 0;
    margin: 1.5rem 0;
    line-height: 44px;
    color: var(--white-color);
    background-color: var(--primary-color);
    border-color: var(--primary-color);

    &:hover {
      color: var(--white-color);
      background-color: var(--blue-color-control-1);
      border-color: var(--blue-color-control-1);
    }

    &:active {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }

    &.is-disabled {
      background-color: var(--el-button-disabled-bg-color);
      border-color: var(--el-button-disabled-border-color);
    }
  }

  .login--back {
    width: 100%;
    height: 44px;
    padding: 0;
    margin: 0;
    line-height: 42px;
  }
}

[data-theme='light'] {
  .#{$prefix-cls}__bg--light {
    display: block;
  }
}

[data-theme='dark'] {
  .#{$prefix-cls}__bg--dark {
    display: block;
  }
}

</style>
