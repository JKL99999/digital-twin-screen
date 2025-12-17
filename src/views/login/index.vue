<template>
  <div class="login-container">
    <div class="background-layer" />

    <header class="header-section">
      <div class="logo-area">
        <img src="@/assets/img/logo.png" alt="" />
        <h1 class="main-title">
          浦东机场T3航站区港湾机坪工程可视化辅助管理系统
        </h1>
      </div>
    </header>

    <main class="login-box">
      <h2 class="login-title">账号登录</h2>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="input-group">
          <span class="icon-slot">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="用户名"
            autocomplete="off"
          />
        </div>

        <div class="input-group">
          <span class="icon-slot">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            v-model="loginForm.password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="密码"
            autocomplete="off"
          />
          <span class="toggle-slot" @click="passwordVisible = !passwordVisible">
            <svg
              v-if="passwordVisible"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </span>
        </div>

        <button type="submit" class="submit-btn">登录</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 修改点 3: 增加控制密码显示的状态
      passwordVisible: false,
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      if (
        this.loginForm.username === "admin" &&
        this.loginForm.password === "ABC123456"
      ) {
        this.$router.push("/zhuang");
        this.$notify({
          title: "登录成功",
          message: "欢迎回来！",
          type: "success",
        });
      } else {
        this.$message({
          message: "用户名密码不正确",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 变量定义 */
$primary-color: #0091ff;
$text-light: #fff;
$text-placeholder: #8daac7;
$border-color: rgba(75, 169, 255, 0.3);
$input-bg: rgba(30, 41, 59, 0.6);

/* 全局重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei",
    Arial, sans-serif;

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    /* 请替换为你的背景图路径 */
    background-image: url("~@/assets/img/bg.jpg");
    background-size: cover;
    background-position: center;
    filter: brightness(0.6) contrast(1.1);
  }
}

.header-section {
  position: absolute;
  top: 15%;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 2;

  .logo-area {
    display: flex;
    align-items: center;
    gap: 15px;

    .header-icon {
      width: 40px;
      height: 40px;
      filter: drop-shadow(0 0 5px rgba(64, 158, 255, 0.8));
    }

    .main-title {
      font-size: 32px;
      font-weight: 700;
      color: $text-light;
      letter-spacing: 2px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      background: linear-gradient(180deg, #ffffff 0%, #bde0ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.login-box {
  width: 600px;
  height: 436px;
  background: rgba(13, 33, 60, 0.65);
  backdrop-filter: blur(10px);
  border: 2px solid $border-color;
  box-shadow: 0px 4px 20px 0px rgba(23, 159, 222, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 50px;
  margin-top: 50px;

  .login-title {
    color: #a6cce8;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 60px;
    letter-spacing: 1px;
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    .input-group {
      position: relative;
      width: 384px;
      height: 44px;
      background: $input-bg;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;

      &:focus-within {
        border-color: #409eff;
        background: rgba(30, 41, 59, 0.8);
        box-shadow: 0 0 8px rgba(64, 158, 255, 0.2);
      }

      .icon-slot {
        width: 44px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c0c4cc;
      }

      // 修改点 4: 增加右侧图标的样式
      .toggle-slot {
        width: 44px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #c0c4cc;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: $primary-color;
        }
      }

      input {
        flex: 1;
        background: transparent;
        border: none;
        height: 100%;
        color: $text-light;
        font-size: 14px;
        outline: none;
        padding-right: 5px; // 修改右边距，避免文字太靠右

        &::placeholder {
          color: $text-placeholder;
        }
      }
    }

    .submit-btn {
      width: 384px;
      height: 44px;
      margin-top: 58px;
      background-color: $primary-color;
      border: none;
      border-radius: 4px;
      color: $text-light;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: lighten($primary-color, 5%);
      }

      &:active {
        background-color: darken($primary-color, 10%);
      }
    }
  }
}
</style>
