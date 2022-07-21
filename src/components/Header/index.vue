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
          <el-menu-item index="Home">首页</el-menu-item>
          <el-menu-item index="Works" >作品</el-menu-item>
          <el-menu-item index="Shop" >商城</el-menu-item>
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
          <el-avatar :size="50" :src="avatarUrl"></el-avatar>
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
      activeIndex: "1",
      searchInput:'',
      avatarUrl:''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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
    .block{
        margin-top: 5%;
    }
  }
  .line{
    border-bottom: 1px solid rgb(230,230,230);
    margin-top: 60px;
    }
}
</style>