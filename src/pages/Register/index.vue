<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">注册</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="tel">
            <el-input
              v-model="ruleForm2.tel"
              auto-complete="off"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="smscode" class="code">
            <el-input
              v-model="ruleForm2.smscode"
              placeholder="验证码"
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
              v-model="ruleForm2.pass"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm2')"
              style="width: 100%"
              >注册</el-button
            >
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "registerPage",
};
</script>

<style lang="scss">
</style>