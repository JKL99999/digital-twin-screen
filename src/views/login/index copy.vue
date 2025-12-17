<template>
  <div class="login-container">
    <!-- 背景图容器 -->
    <div class="bg-layer"></div>
    <!-- 系统标题 -->
    <div class="title-container">
      <img src="~@/assets/img/logo.png" alt="" />
      <h3 class="title">浦东机场T3航站区港湾机坪工程可视化辅助管理系统</h3>
    </div>
    <div class="login-form-container">
      <span>
        账号登录
      </span>
       <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 用户名输入框 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>

      <!-- 测试账号提示 -->
      <div class="tips">
        <span style="margin-right: 20px">用户名：admin</span>
        <span>密码：任意6位以上字符</span>
      </div>
    </el-form>
    </div>
   
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    // 用户名验证规则
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    // 密码验证规则
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 显示/隐藏密码
    showPwd() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录处理（预留接口调用位置）
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 登录接口预留 - 实际项目中替换为真实接口请求
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
              // 接口请求失败处理（可添加提示等）
            });
        } else {
          console.log("表单验证失败！");
          return false;
        }
      });
    },
  },
};
</script>

<!-- 局部样式（scoped） -->
<style lang="scss" scoped>
// 局部变量定义
$bg: #2d3a4b;
$dark-gray: #889aa4;
$light-gray: #eee;
$title-color: #fff;
$btn-bg: #1890ff;
$btn-hover-bg: #096dd9;

.login-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  flex-direction: column; // 主轴方向改为垂直（默认是 row 水平）
  justify-content: center; // 主轴（垂直）方向居中
  align-items: center; // 交叉轴（水平）方向居中


  // 背景图层（可替换为实际背景图路径）
  .bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("~@/assets/img/bg.jpg"); // 替换为实际图片路径
    background-size: cover;
    // opacity: 0.2; // 背景图透明度调整
    z-index: 0;
  }

  // 登录表单容器
  .login-form {
    position: relative;
    z-index: 1;
    width: 520px;
    max-width: 90%;
    padding: 120px 35px 50px;
    margin: 0 auto;
    overflow: hidden;
  }

  // 提示文字
  .tips {
    font-size: 14px;
    color: $light-gray;
    margin-bottom: 10px;
    text-align: center;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  // 图标容器
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark-gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  // 标题容器
  .title-container {
    
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-bottom: 83px;  

    .title {
      margin-left: 20px;
      width: 837px;
      height: 44px;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 800;
      font-size: 36px;
      line-height: 44px;
      text-shadow: 0px 3px 4px rgba(23, 159, 222, 0.4),
        0px 2px 4px rgba(14, 26, 42, 0.4);
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        #c0ebff 35%,
        #179fde 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
  }
  .login-form-container {
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 436px;
    z-index: 1;
    background: linear-gradient(
        180deg,
        rgba(23, 159, 222, 0) 0%,
        rgba(23, 159, 222, 0.1) 100%
      ),
      rgba(14, 26, 42, 0.94);
    box-shadow: 0px 4px 20px 0px rgba(23, 159, 222, 0.2);
    border-radius: 20px 20px 20px 20px;
    border: 2px solid;
    border-image: linear-gradient(
        180deg,
        rgba(192, 235, 255, 1),
        rgba(23, 159, 222, 1)
      )
      2 2;
  }

  // 显示密码图标
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark-gray;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: $light-gray; //  hover效果
    }
  }

  // 登录按钮样式重写
  .el-button--primary {
    background-color: $btn-bg;
    border-color: $btn-bg;
    height: 47px;
    font-size: 16px;
    &:hover {
      background-color: $btn-hover-bg;
      border-color: $btn-hover-bg;
    }
    &:focus {
      background-color: $btn-hover-bg;
      border-color: $btn-hover-bg;
    }
  }
}
</style>
