<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix title">
        <span class="title">热门作品</span>
      </div>
      <div class="content">
        <div  class="text item">
          <div class="works" v-for="o in 6" :key="o">
            <div class="picture"></div>
            <div class="describe">
              <div class="text">
                <span> 作品名称: </span>
                <span> 作者: </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "hotWorks",

  components: {},
};
</script>

<style lang="scss">
.box-card {
  .title {
    span {
      float: left;
    }
  }
  .content {
    height: 20rem;
    .item {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 auto;
      .works {
        width: 30rem;
        height: 10rem;
        margin: auto;
        display: flex;
        flex-direction: row;
        .picture {
          width: 50%;
          height: 80%;
          margin: auto;
          background-color: rgb(250,250,250);
        }
        .describe {
          width: 50%;
          display: flex;
          .text {
            height: 5rem;
            display: flex;
            flex-direction: column;
            margin: auto 0;
            span {
              margin: auto 0;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>