<template>
  <div>
    <div class="category">
      <div class="category-card">
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
      </div>
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
  height: 3rem;
  .category-card {
    width: 100%;
    height: 100%;
    .text {
      cursor: pointer;
    }
  }
}
</style>