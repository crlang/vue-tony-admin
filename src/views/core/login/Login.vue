<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-box`">
      <div :class="`${prefixCls}-mode`">
        <AppDarkModeToggle />
      </div>

      <div :class="`${prefixCls}-logo`">
        <AppLogo />
        <p>Element Plus/Vue3/Typescript 最佳的选择</p>
      </div>

      <div :class="`${prefixCls}-form`">
        <!-- 注册 -->
        <RegisterForm v-if="getShowRegister" :prefixCls="`${prefixCls}-form`" />

        <!-- 忘记密码 -->
        <ForgetPasswordForm v-else-if="getShowForget" :prefixCls="`${prefixCls}-form`" />

        <el-tabs v-else v-model:model-value="activeName">
          <el-tab-pane label="账号登录" name="account">
            <LoginForm :prefixCls="`${prefixCls}-form`" v-if="activeName === 'account'" />
          </el-tab-pane>

          <el-tab-pane label="手机号登录" name="mobile">
            <MobileForm :prefixCls="`${prefixCls}-form`" v-if="activeName === 'mobile'" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

import { AppLogo, AppDarkModeToggle } from '@/components/Application';
import { useDesign } from '@/hooks/web/useDesign';
import { useGlobSetting } from '@/hooks/setting';

import LoginForm from './LoginForm.vue';
import ForgetPasswordForm from './ForgetPasswordForm.vue';
import RegisterForm from './RegisterForm.vue';
import MobileForm from './MobileForm.vue';
import { useLoginState, LoginStateEnum } from './data';

export default defineComponent({
  components: {
    ElTabs,
    ElTabPane,
    LoginForm,
    ForgetPasswordForm,
    RegisterForm,
    MobileForm,
    AppLogo,
    AppDarkModeToggle,
  },
  setup() {
    const { prefixCls } = useDesign('login');
    const { setLoginState, getLoginState } = useLoginState();
    const { title } = useGlobSetting();
    const activeName = ref('account');

    const getShowRegister = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
    const getShowForget = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

    return {
      prefixCls,
      title,
      getShowRegister,
      getShowForget,
      setLoginState,
      LoginStateEnum,
      activeName,
    };
  },
});
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-login';

.#{$prefix-cls} {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  // background-color: #e5edf4;
  background-image: url('@/assets/svg/login_bg.svg');
  background-repeat: repeat;
  background-position: center center;
  background-size: auto;

  &-box {
    position: relative;
    min-width: 440px;
    padding: 46px 30px;
    background-color: var(--background-primary-color);
    border-radius: 24px;
  }

  &-mode {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    font-size: 26px;
    opacity: 0.8;
  }

  &-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 2px;
    white-space: nowrap;

    > p {
      margin: 2.5rem 0;
      font-size: 14px;
      font-weight: normal;
    }
  }

  .el-form-item__label {
    display: none;
  }

  .el-input__inner {
    width: 100%;
    height: 44px;
    line-height: 44px;
  }

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

  .el-checkbox {
    height: 26px;
  }

  &-form {
    max-width: 440px;
    margin: auto;

    &--line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      > span {
        font-size: 14px;
        cursor: pointer;
      }
    }

    &--verifyimg {
      .el-input-group__append {
        padding: 0;
      }
    }

    &--submit {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 44px;
      padding: 0;
      margin: 0;
      line-height: 44px;
    }

    &--back.el-button {
      width: 100%;
      height: 44px;
      padding: 0;
      margin: 0;
      margin-top: 10px;
      line-height: 42px;
      opacity: 0.4;
    }

    &--reg {
      display: flex;
      align-items: center;

      > span {
        color: var(--primary-color);
        cursor: pointer;
      }
    }
  }
}
</style>
