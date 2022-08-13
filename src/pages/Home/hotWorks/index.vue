<template>
  <div class="works">
    <el-card class="works-card" shadow="hover">
      <div slot="header" class="clearfix title">
        <span class="title">热门作品</span>
      </div>
      <div class="content">
        <div class="text item">
          <div class="works" v-for="o in 3" :key="o">
            <div class="picture">
              <div class="img">
                <el-image
                  style="width: 100%; height: 100%"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180516%2F190e80b9241f4971818904afc539ccaf.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662798531&t=264ed6ef9c93b0113c88b6d2eb75d962"
                  fit="cover"
                >
                </el-image>
                <div class="title">我是标题{{ name }}</div>
              </div>
            </div>
            <!-- <div class="describe">
              <div class="text">
                <span> 作品名称: </span>
                <span> 作者: </span>
              </div>
            </div> -->
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

<style lang="scss" scoped>
.works-card {
  background-color: rgb(243, 240, 232);
  width: 90%;
  border-radius: 1rem;
  margin: 1rem auto;
  &:hover {
    .title {
      span {
        transform: rotate3d(0, 1, 0, 360deg);
      }
    }
  }
  .title {
    span {
      transition: 0.5s;
      float: left;
      font-size: 1.5rem;
      font-weight: 100;
    }
  }
  .content {
    height: 20rem;
    .item {
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 auto;
      .works {
        width: 30rem;
        height: 80%;
        margin: 2% auto 15% auto;
        display: flex;
        flex-direction: row;
        .picture {
          border-radius: 0.5rem;
          height: 100%;
          overflow: hidden;
          margin: auto;
          background-color: #fff;
          position: relative;
          transition: 1s;
          &:hover{
            border: 1px #000 solid;
          }
          .img {
            border-radius: 0.5rem;
            height: 100%;
            transition: 1s;
            cursor: pointer;
            &:hover {
              transform: scale(1.5);
              
              .title {
                opacity: 1;
                display: block;
                transform: translate(-50%, -50%);
              }
            }
            .title {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-250%, -50%);
              font-size: 25px;
              text-shadow: #fff 1px 1px;
              opacity: 0;
              transition: 1s;
            }
          }
        }
        .describe {
          width: 50%;
          display: flex;
          .text {
            height: 5rem;
            display: flex;
            flex-direction: column;
            margin: auto 0;
            font-weight: 100;
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