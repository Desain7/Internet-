<template>
  <div>
    <el-card class="work-box-card">
      <div class="left">
        <el-image>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div class="right">
        <div class="text">
          <div>作品名:{{ name }}</div>
          <div v-if="false">作者:{{ author }}</div>
          <div>作品分类:{{ type }}</div>
          <div>创建时间:{{ time }}</div>
          <div>介绍:{{ describe }}</div>
        </div>
        <div class="handle">
          <div class="icons">
            <el-button type="text">
              <i class="iconfont icon-good"></i
            ></el-button>
            <el-button type="text">
              <i class="iconfont icon-favorites"></i
            ></el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: 123,
      author: 123,
      type: 123,
      time: 123,
      describe: 123,
    };
  },
};
</script>

<style lang="scss" >
.work-box-card {
  margin-top: 5%;
  width: 25rem;
  min-height: 15rem;
  .el-card__body {
    display: flex;
    flex-direction: row;
    height: 90%;
    .left {
      width: 10rem;
      background-color: rgb(250, 250, 250);
      margin-right: 10%;
    }
    .right {
      height: 90%;
      width: 10rem;
      .text {
        div {
          text-align: left;
          margin-top: 10%;
        }
      }
      .handle {
        .icons {
          float: right;
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