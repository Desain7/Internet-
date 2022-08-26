<template>
  <transition name="slide">
    <div class="cover" v-if="this.$store.state.login.showLogin" @click="hide">
      <transition name="slide">
        <div class="login-wrapper" ref="login" v-show="page == 0">
          <div id="login">
            <p class="title">登录</p>
            <el-form
              status-icon
              ref="ruleForm"
              label-width="0"
              class="demo-ruleForm"
              :model="loginForm"
            >
              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input
                  auto-complete="off"
                  placeholder="请输入邮箱"
                  v-model="loginForm.email"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="{
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur',
                }"
              >
                <el-input
                  type="password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  v-model="loginForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="code"
                :rules="{
                  required: true,
                  message: '请输入验证码',
                  trigger: 'blur',
                }"
              >
                <el-input
                  auto-complete="off"
                  placeholder="请输入验证码"
                  class="identifyInput"
                  v-model="loginForm.code"
                ></el-input>
                <div class="coderight" @click="refreshCode">
                  <SIdentify
                    :identifyCode="this.$store.state.login.identifyCode"
                  ></SIdentify>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="submitLogin('loginForm')"
                  >登录</el-button
                >
                <p class="login" @click="goRegister">没有账号？立即注册</p>
                <p class="login" @click="goforgetPass">忘记密码</p>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </transition>
      <transition name="slide">
        <div class="register-wrapper" v-show="page == 1" ref="register">
          <div id="register">
            <p class="title">注册</p>
            <el-form
              :model="registerForm"
              status-icon
              ref="registerForm"
              label-width="0"
              class="demo-ruleForm"
              :rules="registerRules"
            >
              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input
                  v-model="registerForm.email"
                  auto-complete="off"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="code"
                class="code"
                :rules="{
                  required: true,
                  message: '请输入验证码',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="registerForm.code"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  type="primary"
                  :disabled="isDisabled"
                  @click="sendCode"
                  >{{ buttonText }}</el-button
                >
              </el-form-item>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="registerForm.pass"
                  auto-complete="off"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input
                  type="password"
                  v-model="registerForm.checkPass"
                  auto-complete="off"
                  placeholder="确认密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitRegister('registerForm')"
                  style="width: 100%"
                  >注册</el-button
                >
                <p class="login" @click="goLogin">已有账号？立即登录</p>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </transition>
      <transition name="slide">
        <div class="register-wrapper" v-show="page == 2" ref="forgetPass">
          <div id="register">
            <p class="title">重置密码</p>
            <el-form
              :model="forgetPassForm"
              status-icon
              ref="forgetPassForm"
              label-width="0"
              class="demo-ruleForm"
              :rules="registerRules"
            >
              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input
                  v-model="forgetPassForm.email"
                  auto-complete="off"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="code"
                class="code"
                :rules="{
                  required: true,
                  message: '请输入验证码',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="forgetPassForm.code"
                  placeholder="请输入验证码"
                ></el-input>
                <el-button
                  type="primary"
                  :disabled="isDisabled"
                  @click="sendCode"
                  >{{ buttonText }}</el-button
                >
              </el-form-item>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="forgetPassForm.pass"
                  auto-complete="off"
                  placeholder="请输入新的密码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input
                  type="password"
                  v-model="forgetPassForm.checkPass"
                  auto-complete="off"
                  placeholder="确认密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitChange()"
                  style="width: 100%"
                  >重置</el-button
                >
                <p class="login" @click="goLogin">已有账号？立即登录</p>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import SIdentify from "../SIdentify";
export default {
  name: "loginPage",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      page: 0,
      loginForm: {
        email: "",
        password: "",
        code: "",
      },
      registerForm: {
        email: "",
        pass: "",
        checkPass: "",
        code: "",
      },
      forgetPassForm: {
        email: "",
        pass: "",
        checkPass: "",
        code: "",
      },
      registerRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      buttonText: "发送",
      timeCount: 60,
      timer: null,
      isDisabled: false,
    };
  },
  computed: {
    ...mapState({
      errMsg: (state) => state.login.errorMessage,
    }),
  },
  watch: {
    errMsg(n) {
      if (n != "") {
        this.$message({
          type: "error",
          message: `[登陆失败] ${n}`,
        });
        this.$store.state.login.errorMessage = "";
      }
    }, //监测返回的登录失败信息
  },
  methods: {
    //点击遮罩层关闭窗口
    hide(e) {
      let login = this.$refs.login;
      let register = this.$refs.register;
      let forgetPass = this.$refs.forgetPass;
      if (
        !login.contains(e.target) &&
        !register.contains(e.target) &&
        !forgetPass.contains(e.target)
      ) {
        this.$store.dispatch("showLogin");
      }
    },
    login() {},
    refreshCode() {
      this.identifyCode = "";
      this.getCode();
    },
    getCode() {
      this.$store.dispatch("getCode"); //获取验证码
    },
    submitLogin() {
      this.$store.dispatch("login", this.loginForm);
    },
    //点击注册按钮提交
    submitRegister() {
      if (this.registerForm.pass == this.registerForm.pass) {
        let register = {
          email: this.registerForm.email,
          password: this.registerForm.pass,
          yzm: this.registerForm.code,
        };
        this.$store.dispatch("register", register);
      } else {
        this.$message({
          type: "error",
          message: "两次密码输入不一致!",
        });
      }
    },
    submiChange() {
      if (this.forgetPassForm.pass == this.forgetPassForm.pass) {
        let forgetPass = {
          email: this.forgetPassForm.email,
          password: this.forgetPassForm.pass,
          yzm: this.forgetPassForm.code,
        };
        this.$store.dispatch("forgetPass", forgetPass);
      } else {
        this.$message({
          type: "error",
          message: "两次密码输入不一致!",
        });
      }
    },
    goRegister() {
      this.page = 1;
    },
    goforgetPass() {
      this.page = 2;
    },
    goLogin() {
      this.getCode();
      this.page = 0;
    },
    sendCode() {
      if (!this.timer) {
        this.$message("发送成功!");
        this.$store.dispatch("getEmailCode", {
          email: this.registerForm.email,
        });
        this.timer = setInterval(() => {
          if (this.timeCount > 0) {
            this.timeCount--;
            this.isDisabled = true;
            this.buttonText = "重新发送" + this.timeCount + "s";
          } else {
            this.buttonText = "获取验证码";
            clearInterval(this.timer);
            this.timer = null;
            this.isDisabled = false;
            this.timeCount = 60;
          }
        }, 1000);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getCode");
  },
  components: { SIdentify },
};
</script>

<style lang="scss">
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  .loading-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-wrapper,
  .register-wrapper {
    img {
      position: absolute;
      z-index: 1;
    }
    width: 40%;
    margin: auto;
    #login,
    #register {
      max-width: 340px;
      margin: 60px auto;
      background: #fff;
      padding: 20px 40px;
      border-radius: 10px;
      position: relative;
      z-index: 9;

      .title {
        font-size: 26px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px;
        text-align: center;
      }
    }
  }

  .el-form-item {
    text-align: center;
    .identifyInput {
      width: 50%;
      float: left;
    }
    .coderight {
      cursor: pointer;
    }
  }

  .login,
  .register {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;

    &:hover {
      color: #2c2fd6;
    }
  }

  .code {
    .el-form-item__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    button {
      margin-left: 20px;
      width: 140px;
      text-align: center;
    }
  }

  .el-button--primary:focus {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
@keyframes slideIn {
  0% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(90deg);
    transform: translateZ(-160px) rotateY(90deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
  }
}

@keyframes slideOut {
  0% {
    -webkit-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
    opacity: 1;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(90deg);
    transform: translateZ(-160px) rotateY(90deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
}

.slide-enter-active {
  animation: slideIn 1s;
}

.slide-leave-active {
  animation: slideOut 0.5s;
}
</style>