<template>
  <div class="content">
    <div class="userInfo">
      <div class="text">
        姓名:
        <div class="describe">
          <el-input v-model="editInfo.name"></el-input>
        </div>
      </div>
      <div class="text">
        性别:
        <div class="describe">
          <el-select v-model="editInfo.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text">
        年龄:
        <div class="describe">
          <el-input v-model="editInfo.age"></el-input>
        </div>
      </div>
      <div class="text">
        邮箱:
        <div class="describe">
          <el-input v-model="editInfo.email"></el-input>
        </div>
      </div>
      <div class="text">
        地址:
        <div class="describe">
          <el-input v-model="editInfo.address"></el-input>
        </div>
      </div>
      <div class="text">
        手机:
        <div class="describe">
          <el-input v-model="editInfo.phone"></el-input>
        </div>
      </div>
    </div>
    <div class="commit">
      <el-button type="primary" plain @click="commitChange">保存更改</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userInfo",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userData,
      editInfo: (state) => state.user.userData,
    }),
  },
  methods: {
    commitChange() {
      this.$store.dispatch("chageUserInfo", this.editInfo);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.content {
  display: inline-block;
  height: 75%;
  width: 71%;
  background-color: #fff;
  position: absolute;
  box-sizing: border-box;
  .userInfo {
    .text {
      font-size: 1.2rem;
      font-weight: 200;
      line-height: 3rem;
      margin-top: 2%;
      margin-left: 5%;
      margin-bottom: 2%;
      .describe {
        display: inline-block;
      }
    }
  }
  .commit {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
}
</style>