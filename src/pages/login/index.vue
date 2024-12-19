<template>
  <div class="login">
    <div class="login__card">
      <div class="login__card__main">
        <!-- 账号密码登录 -->
        <div class="login__card__main__form">
          <div
            :model="userForm"
            :rules="userRules"
            ref="userFormRef"
            @keyup.enter="userNameLogin"
            @submit.prevent
          >
            <div prop="loginName" class="login__card__main__form__item">
              <div class="login__card__main__form__item__label">用户名</div>
              <input
                class="login__card__main__form__item__input"
                placeholder="请输入手机号"
                v-model="userForm.loginName"
              />
            </div>
            <div prop="password" class="login__card__main__form__item">
              <div class="login__card__main__form__item__label">密码</div>
              <input
                type="password"
                class="login__card__main__form__item__input"
                placeholder="请输入密码"
                v-model="userForm.password"
              />
            </div>
            <div class="login__card__main__form__item">
              <checkbox v-model="userForm.expire" :true-label="7"
                >7天内免登录</checkbox
              >
              <checkbox v-model="remember">记住用户名</checkbox>
            </div>
            <div class="login__card__main__form__item">
              <button
                class="login__card__main__form__item__btn"
                @click="userNameLogin"
                :loading="userLoginLoading"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login__copyright">
      Copyright (c) 2023 上海锐嘉科智能科技有限公司 沪ICP备18035365号-1
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { apiLoginByLoginName } from "@/http/api/login";

// 企业选择 oid
const oid = ref<number>();
const route = useRoute();

// 账号密码登录
const remember = ref(localStorage.getItem("loginName") ? true : false);
// 表单实例
const userFormRef = ref();
// 用户登录表单
const userForm = reactive({
  loginName: localStorage.getItem("loginName") || "",
  password: "",
  expire: localStorage.getItem("userExpire") ? 7 : undefined,
});
// 用户登录校验
const userRules = reactive({
  loginName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const userLoginLoading = ref(false);

const userNameLogin = () => {
  userLoginLoading.value = true;
  apiLoginByLoginName({
    loginName: userForm.loginName,
    password: userForm.password,
    expire: userForm.expire,
    oid: oid.value!,
  })
    .then((res) => {
      if (remember.value) {
        localStorage.setItem("loginName", userForm.loginName);
      } else {
        localStorage.removeItem("loginName");
      }
      if (userForm.expire) {
        localStorage.setItem("userExpire", "7");
      } else {
        localStorage.removeItem("userExpire");
      }
      // localStorage.setItem("oid", oid.value!.toString());
      localStorage.setItem("sessionId", res.sessionId);
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("oldToken", res.oldToken);
      localStorage.setItem("oldEmpId", res.oldEmpId);
      const redirect = route.query.redirect as string;
      uni.redirectTo({
        url: redirect || "/pages/home/index",
      });
    })
    .finally(() => {
      userLoginLoading.value = false;
    });
};
</script>

<style scoped lang="scss">
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    box-shadow: 0px 36px 48px 16px rgba(0, 129, 194, 0.04),
      0px 40px 56px -8px rgba(25, 144, 204, 0.04),
      0px 32px 40px -32px rgba(26, 151, 214, 0.12);
    border-radius: 8px;
    overflow: hidden;
    &__logo {
      width: 500px;
      height: 560px;
      background-size: 100% 100%;
      position: relative;
      &__img {
        width: 218px;
        height: 32px;
        position: absolute;
        top: 32px;
        left: 32px;
      }
    }
    &__main {
      width: 500px;
      height: 560px;
      background-color: #fff;
      padding: 80px 90px 0;
      box-sizing: border-box;
      position: relative;
      &__tabs {
        display: flex;
        &__pane {
          padding-bottom: 8px;
          cursor: pointer;
          transition: all 0.3s;
          border-bottom: 2px solid transparent;
          &:first-child {
            margin-right: 48px;
          }
          &__text {
            font-size: 20px;
            color: #000000;
            line-height: 28px;
          }
          &--active {
            border-bottom: 2px solid #009ceb;
            &__text {
              color: #009ceb;
            }
          }
        }
      }
      &__form {
        margin-top: 40px;
        &__item {
          margin-bottom: 24px !important;
          width: auto !important;
          &__label {
            color: #000000;
            line-height: 22px;
            margin-bottom: 8px;
          }
          &__input {
            height: 40px;
          }
          &__code {
            display: flex;
            width: 100%;
            &__input {
              flex: 1;
            }
            &__btn {
              width: 120px;
              height: 40px;
              border-radius: 2px;
              border: 1px solid #009ceb;
              text-align: center;
              line-height: 38px;
              font-size: 16px;
              color: #009ceb;
              box-sizing: border-box;
              margin-left: 8px;
              cursor: pointer;
              &--disabled {
                cursor: not-allowed;
                color: rgba(0, 156, 235, 0.45);
                border-color: rgba(0, 156, 235, 0.45);
              }
            }
          }
          &__btn {
            width: 100%;
            height: 40px;
            font-size: 16px;
            color: #ffffff;
            background: #009ceb;
            border-radius: 2px;
          }
        }
      }
      &__register {
        display: flex;
        font-size: 14px;
        color: #666666;
        &__forget {
          // color: #009ceb;
          cursor: pointer;
        }
        &__text {
          margin-left: auto;
        }
        &__link {
          // color: #009ceb;
          cursor: pointer;
        }
      }
      &__company {
        font-size: 14px;
        color: #999999;
        line-height: 22px;
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  &__copyright {
    position: absolute;
    bottom: 38px;
    left: 50%;
    color: #ffffff;
    line-height: 22px;
    transform: translateX(-50%);
  }
}
</style>
