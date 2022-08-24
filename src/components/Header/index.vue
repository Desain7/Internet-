<template>
  <div v-if="$route.meta.showNav" class="mainIndex">
    <el-row :gutter="8">
      <el-col :span="2">
        <div class="title" @click="goHomePage">
          <el-image
            :src="require('../../assets/title.png')"
            fit="contain"
          ></el-image>
        </div>
      </el-col>
      <el-col :span="14">
        <el-menu
          :default-active="currentRoute"
          mode="horizontal"
          background-color="rgb(243,240,232)"
          @select="handleSelect"
          router
        >
          <el-menu-item
            v-for="(item, index) in navIndex"
            :key="index"
            :index="item.navRouter"
            >{{ item.navName }}</el-menu-item
          >
        </el-menu></el-col
      >
      <el-col :span="6"
        ><el-input
          v-if="this.$router.currentRoute.name == 'Works'"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          clearable
          v-model="searchInput"
          @keyup.enter.native="goSearch"
        >
        </el-input
      ></el-col>
      <el-col :span="2">
        <div class="block">
          <el-dropdown>
            <span class="el-dropdown-link avatarLink">
              <el-avatar :size="50" :src="avatarUrl" @click.native="goUserPage">
                <span v-if="!avatarUrl">登录</span></el-avatar
              >
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="goUserPage"
                v-if="this.$store.state.login.userdata"
                >我的主页</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="goBackStage"
                v-if="this.$store.state.login.userdata?.role == 'admin'"
                >管理后台</el-dropdown-item
              >
              <el-dropdown-item
                divided
                @click.native="goLogin"
                v-if="!this.$store.state.login.userdata"
              >
                登录/注册
              </el-dropdown-item>
              <el-dropdown-item
                divided
                @click.native="exitLogin"
                v-if="this.$store.state.login.userdata"
              >
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-backtop>
      <div class="up">↾</div>
    </el-backtop>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "myNavigation",
  data() {
    return {
      currentRoute: this.$router.currentRoute.name,
      navIndex: [
        { navName: "首页", navRouter: "/Home" },
        { navName: "作品", navRouter: "/Works" },
        { navName: "商城", navRouter: "/Shop" },
      ],
      searchInput: "",
    };
  },
  computed: {
    ...mapState({
      avatarUrl: (state) => state.user.userData.headPicture || "",
      isLogin: (state) => state.login.isLogin,
    }),
  },
  watch: {
    isLogin(n) {
      if (n == 1) {
        this.$message({
          type: "success",
          message: `[登陆成功] ${this.$store.state.login.userdata.webName}`,
        });
        this.$store.dispatch("getUserData", {
          email: this.$store.state.login.userdata.email,
        });
      }
    },
    currentRoute(n) {
      return n;
    },
  },
  methods: {
    goHomePage() {
      this.$router.push({ name: "Home" });
    },
    checkLogin() {
      if (this.getLocalData("user")) {
        this.$store.dispatch("getUserData", {
          email: this.$store.state.login.userdata.email,
        });
      }
    },
    getLocalData(key) {
      let storageTimestamp = localStorage.getItem(`${key}Timestamp`);
      let expires = 1000 * 3600 * 24 * 5; // 有效时间
      let timestamp = Date.now(); // 当前时间
      if (storageTimestamp && timestamp - storageTimestamp < expires) {
        let inform = localStorage.getItem(`feiyi${key}`); // 从缓存中拿到数据给程序使用
        this.$store.state.login[`${key}data`] = JSON.parse(inform);
        this.$store.state.login.isLogin = 1;
        return true;
      }
      return false;
    },
    pleaseLogin() {
      this.$message.error("请先登录再进行操作！");
      this.$store.dispatch("showLogin");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goLogin() {
      this.$store.dispatch("showLogin");
    },
    goBackStage() {
      this.$router.push("/BackStage");
    },
    goUserPage() {
      if (this.$store.state.login.userdata) {
        this.$router.push("/User");
      } else {
        this.pleaseLogin();
      }
    },
    goSearch() {
      this.$store.dispatch("worksList", {
        opusType: "",
        opusName: this.searchInput,
      });
    },
    exitLogin() {
      localStorage.removeItem("feiyiuser");
      localStorage.removeItem("userTimestamp");
      this.$store.state.login.userdata = {};
      this.$store.state.login.isLogin = 0;
      this.$router.push("/Home");
      location.reload();
      this.$message({
        message: "退出登录成功！",
      });
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

<style lang="scss">
.mainIndex {
  background-color: rgb(243, 240, 232);
  border-radius: 1rem 1rem;
  .el-row {
    height: 3.5rem;
    .el-col {
      height: 100%;
      .el-menu-item {
        height: 3.5rem;
      }
      div {
        height: 100%;
      }
      .el-input {
        margin-top: 2.5%;
        .el-input__icon {
          height: 70%;
          text-align: center;
          transition: all 0.3s;
        }
      }
      .title {
        display: flex;
        cursor: pointer;
      }
      .block {
        margin-top: 4%;
        .el-dropdown {
          margin-left: 50%;
        }
        .avatarLink {
          cursor: pointer;
        }
      }
    }
  }
}
.up {
  text-align: center;
  line-height: 40px;
  color: rgb(197,183,173);
}
</style>