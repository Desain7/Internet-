<template>
  <div class="goodsCard">
    <div class="cardContainer">
      <el-card :body-style="{ padding: '0px' }">
        <div class="image">
          <el-image>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="content">
          <div class="text">
            <span>名称:</span>
            <span>价格:</span>
          </div>
          <div class="sell">
            <span>月销:</span>
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
.goodsCard {
  margin: 2%;
  .cardContainer {
    margin-top: 5%;
    width: 15rem;
    height: 18rem;

    .image {
      width: 15rem;
      height: 10rem;
      background-color: rgb(250, 250, 250);
      overflow: hidden;
    }
    .content {
      height: 8rem;
      position: relative;
      display: flex;
      .text {
        display: flex;
        margin: auto 2rem;
        flex-direction: column;
        span {
          text-align: left;
        }
      }
      .sell {
        position: absolute;
        bottom: 1rem;
        right: 3rem;
      }
    }
  }
}
</style>