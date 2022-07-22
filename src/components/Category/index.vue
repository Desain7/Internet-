<template>
  <div>
    <div class="category">
      <el-card class="category-card" shadow="never">
        <span class="title"> 分类 </span>
        <span class="text"> 民间文学 </span>
        <el-divider direction="vertical"></el-divider>
        <span class="text"> 传统音乐 </span>
        <el-divider direction="vertical"></el-divider>
        <span class="text"> 传统舞蹈 </span>
        <el-divider direction="vertical"></el-divider>
        <span class="text"> 传统戏剧 </span>
        <el-divider direction="vertical"></el-divider>
        <span class="text"> 曲艺 </span>
        <el-divider direction="vertical"></el-divider>
        <span class="text"> 传统美术 </span>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "myCategory",
};
</script>

<style lang="scss">
.category {
  display: flex;
  flex-direction: row;
  .category-card {
    width: 100%;
    .title {
      float: left;
    }
    .text {
      cursor: pointer;
    }
  }
}
</style>