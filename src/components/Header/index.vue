<template>
  <div v-if="$route.meta.showNav" class="mainIndex">
    <el-row :gutter="8">
      <el-col :span="2">
        <div class="title">
          <el-image
            :src="require('../../assets/title.png')"
            fit="contain"
          ></el-image>
        </div>
      </el-col>
      <el-col :span="14">
        <el-menu
          :default-active="activeIndex"
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
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchInput"
          @blur="goSearch"
        >
        </el-input
      ></el-col>
      <el-col :span="2">
        <div class="block">
          <el-dropdown>
            <span class="el-dropdown-link avatarLink">
              <el-avatar :size="50" :src="avatarUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的主页</el-dropdown-item>
              <el-dropdown-item @click.native="goBackStage"
                >管理后台</el-dropdown-item
              >
              <el-dropdown-item divided @click.native="goLogin">
                登录/注册
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "myNavigation",
  data() {
    return {
      activeIndex: "Home",
      navIndex: [
        { navName: "首页", navRouter: "Home" },
        { navName: "作品", navRouter: "Works" },
        { navName: "商城", navRouter: "Shop" },
      ],
      searchInput: "",
      avatarUrl: "",
    };
  },
  methods: {
    checkLogin() {
      if (this.getLocalData("user")) {
        this.$message({
          type: "success",
          message: this.$store.login.userData.webName,
        });
      } else {
        this.pleaseLogin()
      }
    },
    getLocalData(key) {
      let storageTimestamp = localStorage.getItem(`${key}Timestamp`);
      let expires = 1000 * 3600 * 24 * 5; // 有效时间
      let timestamp = Date.now(); // 当前时间
      if (storageTimestamp && timestamp - storageTimestamp < expires) {
        let inform = localStorage.getItem(`feiyi${key}`); // 从缓存中拿到数据给程序使用
        this.$store.state.login[`${key}data`] = JSON.parse(inform);
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
      this.checkLogin()
      
    },
    goLogin() {
      this.$store.dispatch("showLogin");
    },
    goBackStage() {
      this.$router.push("/BackStage");
    },
    goSearch() {
      this.activeIndex = "Works";
      let location = {
        name: "Works",
        params: { key: this.searchInput || undefined },
      };
      this.$router.push(location);
    },
  },
  mounted() {
    this.activeIndex = this.$router.currentRoute.name;
    this.checkLogin()
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
      }
      .block {
        margin-top: 5%;
        .avatarLink {
          cursor: pointer;
        }
      }
    }
  }
}
</style>