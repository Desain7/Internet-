<template>
  <div v-if="$route.meta.showNav" class="mainIndex">
    <el-row :gutter="8">
      <el-col :span="2">
        <div class="title">
          <span class="text"></span>
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
      activeIndex: this.$router.currentRoute.name,
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
};
</script>

<style lang="scss">
.mainIndex {
  background-color: rgb(243, 240, 232);
  border-radius: 1rem;
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
        .text {
          width: 100%;
          height: 80%;
          margin: auto;
          background-image: url("@/assets/title.png");
          background-size: cover;
        }
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