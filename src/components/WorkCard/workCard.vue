<template>
  <div class="work-card">
    <el-card class="work-box-card">
      <div class="left">
        <el-image
          style="width: 80%; height: 80%;  border-radius: 0.5rem;"
          :src="work.photo"
          fit="cover"
        ></el-image>
      </div>
      <div class="right">
        <div class="text">
          <div class="title">{{ work.opusTitle }}</div>
          <div v-if="false">作者:{{ work.author }}</div>
          <div>{{ work.opusType }}</div>
          <div>{{ work.opusIntroduce }}</div>
        </div>
        <!-- <div class="handle">
          <div class="icons">
            <el-button type="text">
              <i class="iconfont icon-good"></i
            ></el-button>
            <el-button type="text">
              <i class="iconfont icon-favorites"></i
            ></el-button>
          </div>
        </div> -->
      </div>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  props: ["work"],
  methods: {

  },
};
</script>

<style lang="scss" >
.work-card {
  display: inline-block;
  margin: 22px;
  .work-box-card {
    margin-top: 5%;
    width: 25rem;
    height: 15rem;
    background-color: rgb(243, 240, 232);
    background-image: url("@/assets/边框1.png");
    background-size: 25rem 15rem;
    background-repeat: no-repeat;
    cursor: pointer;
    .el-card__body {
      display: flex;
      flex-direction: row;
      height: 90%;
      .left {
        width: 10rem;
        margin-right: 10%;
        display: flex;
        .el-image{
          margin: auto;
        }
      }
      .right {
        position: relative;
        height: 90%;
        width: 10rem;
        .text {
          div {
            text-align: left;
            margin-top: 5%;
            font: 16px "微软雅黑";
            color: #000;
            text-shadow: #fff 0px 2px;
            font-weight: 100;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
          .title {
            font: 30px "微软雅黑";
            color: #000;
            text-shadow: #fff 0px 2px;
            font-weight: 100;
          }
        }
        .handle {
          position: absolute;
          bottom: 0;
          right: 0;
          .icons {
            text-align: right;
          }
        }
      }
    }
  }
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>