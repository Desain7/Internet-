<template>
  <div class="sideNav">
    <el-menu
      default-active="work"
      class="navBar"
      background-color="rgb(14,23,49)"
      text-color="#fff"
      active-text-color="rgb(27,129,168)"
      router
    >
      <el-submenu
        v-for="(item, index) in navIndex"
        :key="index"
        :index="item.navRouter"
      >
        <!-- 一级菜单模板 -->
        <template slot="title">
          <!-- 图标 -->
          <!-- <i :class="iconsObj[item.id]"></i> -->
          <!-- 文本 -->
          <span>{{ item.navName }}</span>
        </template>
        <!-- 二级菜单模板 -->
        <el-menu-item :index="item.navRouter">
          <span>{{ item.navName }}</span>
        </el-menu-item>
      </el-submenu>

      <div class="backHome" @click="backHome">
        <span>返回首页</span>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "tabList",
  data() {
    return {
      activeIndex: "work",
      navIndex: [
        { navName: "作品管理", navRouter: "work" },
        { navName: "评论管理", navRouter: "comments" },
        { navName: "作者管理", navRouter: "worker" },
        { navName: "视频管理", navRouter: "video" },
      ],
    };
  },
  methods: {
    backHome() {
      this.$router.push("/Home");
    },
  },
};
</script>

<style lang="scss">
.el-menu {
  border-right: solid 0;
}
.sideNav {
  width: 10%;
  height: 100%;
  position: absolute;
  left: 0;
  overflow: hidden;
  .navBar {
    height: 100%;
    text-align: left;
    .el-menu-item {
      span {
        display: inline-block;
        padding: 0 12%;
      }
    }

    .backHome {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      span {
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>