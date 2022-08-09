<template>
  <div class="carousel">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <el-image
          src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          fit="cover"
          style="width: 100%; height: 100%"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "myCarousel",
};
</script>

<style lang="scss">
.carousel{
  margin-top: 1%;
  width: 100%;
}
</style>