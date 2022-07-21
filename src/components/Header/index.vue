<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="2">
        <div class="title">
          <span class="text"> 赣州非遗 </span>
        </div>
      </el-col>
      <el-col :span="14">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
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
        >
        </el-input
      ></el-col>
      <el-col :span="2">
        <div class="block">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="50" :src="avatarUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的主页</el-dropdown-item>
              <el-dropdown-item divided>登录/注册</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <div class="line"></div>
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
    // activeChange(index) {
    //   this.activeIndex = index;
    //   console.log(this.$router)
    // },
  },
};
</script>

<style lang="scss">
.el-row {
  height: 3.5rem;
  .el-col {
    height: 100%;
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
        margin: auto;
      }
    }
    .block {
      margin-top: 5%;
    }
  }
  .line {
    border-bottom: 1px solid rgb(230, 230, 230);
    margin-top: 60px;
  }
}
</style>