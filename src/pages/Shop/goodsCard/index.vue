<template>
  <div>
    <div class="cardContainer">
      <el-card :body-style="{ padding: '0px' }">
        <div class="image">

        </div>
        <div class="content">
          <span>好吃的汉堡</span>
          <div class="bottom">
            <time class="time"></time>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsCard",
};
</script>

<style lang="scss">
.cardContainer{
    margin-top: 5%;
    width: 15rem;
    height: 18rem;
    .image{
        width: 15rem;
        height: 10rem;
        background-color: rgb(250,250,250);
        overflow: hidden;
    }
    .content{
        height: 8rem;
    }
}
</style>