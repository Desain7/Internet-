<template>
  <div class="work">
    <div class="workContent">
      <div class="work-box-card">
        <div class="left">
          <el-image
            style="width: 80%; height: 100%; border-radius: 0.5rem"
            :src="work.photo"
            fit="cover"
          ></el-image>
        </div>
        <div class="right">
          <div class="text">
            <div class="title">{{ work.opusTitle }}</div>
            <div v-if="false">作者:{{ work.author }}</div>
            <div>{{ work.opusIntroduce }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "workCard",
  data() {
    return {};
  },
  props: ["work"],
};
</script>

<style lang="scss" scoped>
.work {
  display: inline-block;
  margin-left: 1%;
  .workContent {
    margin: 5%;
    display: inline-block;
    .work-box-card {
      width: 25rem;
      height: 15rem;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      height: 90%;
      .left {
        width: 10rem;
        margin-right: 5%;
        display: flex;
        .el-image {
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
      }
    }
  }
}
</style>