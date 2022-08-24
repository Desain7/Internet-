<template>
  <div class="works">
    <el-card class="works-card" shadow="hover">
      <div slot="header" class="clearfix title">
        <span class="title">热门作品</span>
      </div>
      <div class="content">
        <div class="text item">
          <div
            class="works"
            v-for="item in hotWorks.slice(0, 3)"
            :key="item.id + '$'"
          >
            <div class="picture" @click="goInform(item)">
              <div class="img">
                <el-image :src="item.photos[1]?.url" fit="cover"> </el-image>
                <div class="title">{{ item.opusTitle }}</div>
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
import { mapState } from "vuex";
export default {
  name: "hotWorks",
  computed: {
    ...mapState({
      hotWorks: (state) => state.works.hotWorks,
    }),
  },
  methods: {
    goInform(item) {
      let params = {
        pageSize: 1,
        pageNo: 1,
        opusId: item.id,
        email: this.$store.state.login.userdata?.email || "",
      };
      this.$store.dispatch("workInform", params);
      let location = { name: "WorkInform", params: params };
      this.$router.push(location);
    },
  },
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
          &:hover {
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
              text-shadow: #fff -1px -1px;
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