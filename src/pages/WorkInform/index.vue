<template>
  <div>
    <div class="workInform">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Works' }">作品</el-breadcrumb-item>
        <el-breadcrumb-item>{{ workInform.opusTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="workTitle">
        <span class="text">{{ workInform.opusTitle }}</span>
      </div>
      <div class="workContent">
        <div class="workIntroduce">
          <div class="type">
            <span class="title">作品id：</span>
            <span class="content">{{ workInform.id }}</span>
          </div>
          <div class="type">
            <span class="title">类别：</span>
            <span class="content">{{ workInform.opusType }}</span>
          </div>
          <div class="type">
            <span class="title">作者：</span>
            <span class="content" style="cursor: pointer">{{
              workInform.author
            }}</span>
          </div>
          <div class="type">
            <span class="title">创建时间：</span>
            <span class="content">{{ workInform.createTime }}</span>
          </div>
        </div>
        <div class="imageCon">
          <div
            class="workImage"
            v-for="(item, index) in workInform.photoList"
            :key="index"
          >
            <el-image
              style="width: 100%; height: 100%"
              :src="item"
              fit="cover"
            ></el-image>
          </div>
        </div>

        <el-divider>{{ workInform.opusName }}</el-divider>
        <div class="workDescribe">
          {{ workInform.opusIntroduce }}
        </div>
        <div v-if="workInform.make" class="workDescribe">
          {{ workInform.make }}
        </div>

        <div class="workDescribe">
          {{ workInform.history }}
        </div>
        <div class="workDescribe">
          {{ workInform.origin }}
        </div>
      </div>
      <div class="workOperate">
        <el-button round>点赞<i class="iconfont icon-good"></i></el-button>
        <el-button round>收藏<i class="iconfont icon-favorites"></i></el-button>
      </div>
    </div>
    <div class="workComments">
      <div class="title">︳评论</div>
      <div class="commentInput">
        <el-input
          type="textarea"
          :rows="3"
          clearable
          placeholder="留下你的评论吧!"
          show-word-limit
          maxlength="200"
          v-model="commentInput"
        >
        </el-input>
        <el-button type="primary" round @click="subComment">发布评论</el-button>
      </div>
      <div class="commentsContent">
        <div
          class="reply-wrap"
          v-for="(item, index) in workInform.comments?.records"
          :key="index"
        >
          <div class="user-face">
            <a target="_blank">
              <div class="avatar" style="transform: translate(0, -15px)">
                <el-avatar
                  :size="50"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </div>
            </a>
          </div>
          <div class="con">
            <div class="user">
              <a
                href=""
                target="_black"
                class="name"
                style="text-decoration: none"
              >
                {{ item.email }}
              </a>
            </div>
            <p class="text">
              {{ item.comments }}
            </p>
            <div class="info">
              <span class="time-location">
                <span class="reply-time">
                  {{ item.createTime }}
                </span>
              </span>
              <div class="operation more-operation">
                <div class="spot">
                  <el-button type="text" @click="supportComment(item)">
                    <i class="iconfont icon-good" v-if="!item.userSupport"></i>
                    <i
                      class="iconfont icon-good-fill"
                      v-if="item.userSupport"
                    ></i>
                    <div
                      class="support"
                      v-if="item.support"
                      style="display: inline-block"
                    >
                      {{ item.support }}
                    </div>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WorkInform",
  data() {
    return {
      commentInput: "",
    };
  },
  computed: {
    ...mapState({
      workInform: (state) => state.works.workInform,
      commentSuccess: (state) => state.comments.subSuccess,
    }),
  },
  watch: {
    commentSuccess(newValue) {
      if (newValue) {
        let params = {
          pageSize: "",
          pageNo: "",
          opusId: this.workInform.id,
          email: "",
        };
        this.$store.dispatch("workInform", params);
        this.$store.dispatch("flagChange");
        this.$message({
          type: "success",
          message: "评论成功！",
        });
      }
    },
  },
  methods: {
    subComment() {
      if (this.$store.state.login.userdata) {
        let commentData = {
          id: this.workInform.id,
          email: this.$store.state.login.userdata.email,
          comment: this.commentInput,
        };
        this.$store.dispatch("subComment", commentData);
        this.commentInput = "";
      } else {
        this.$message({
          type:'error',
          message:'请先登录再执行操作!'
        })
      }
    },
    supportComment(item) {
      if (!item.userSupport) {
        item.userSupport = true;
        item.support++;
      } else {
        console.log(123);
        this.$message("您已经点过赞了！");
      }
    },
  },
  mounted() {
    this.$store.dispatch("getInform");
  },
};
</script>

<style lang="scss">
.workInform {
  padding: 2%;
  width: 70%;
  min-height: 100vh;
  background-color: #fff;
  margin: auto;
  .workTitle {
    text-align: center;
    .text {
      line-height: 44px;
      font-size: 2rem;
      &:before,
      &:after {
        content: "";
        display: inline-block;
        width: 22px;
        height: 44px;
        vertical-align: top;
        background-image: url("@/assets/titleBg.png");
      }
      &:after {
        background-position: right;
        margin-left: 18px;
      }
      &:before {
        background-position: left;
        margin-right: 18px;
      }
    }
  }
  .workContent {
    .workIntroduce {
      margin-top: 5%;
      padding: 2%;
      background-color: rgb(243, 240, 232);
      display: flex;
      align-items: center;
      justify-content: center;
      .type {
        width: 20%;
        height: 50%;
        .title {
          font-weight: bold;
        }
      }
    }
    .imageCon {
      display: flex;
      margin: 0 auto;
      .workImage {
        display: inline-block;
        margin: auto;
        margin-top: 5%;
        width: 20rem;
        height: 20rem;
      }
    }

    .workDescribe {
      text-indent: 2em !important;
      font-size: 18px !important;
      margin: 2% 0;
      line-height: 200%;
    }
  }
  .workOperate {
    width: 20%;
    margin: 0 auto;
  }
}
.workComments {
  padding: 2%;
  width: 70%;
  min-height: 20vh;
  background-color: rgb(250, 250, 250);
  margin: auto;
  .commentInput {
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    width: 80%;
    .el-button {
      margin-top: 2%;
      float: right;
    }
  }
  .title {
    font-size: 1.5rem;
    font-weight: 200;
  }
  .commentsContent {
    width: 90%;
    margin: auto;
    margin-top: 10%;
    .reply-wrap {
      .user-face {
        display: inline-block;
        position: absolute;
      }
      .con {
        margin-left: 6%;
        width: 94%;
        display: inline-block;
        .text {
          min-height: 2rem;
        }
        .user {
          a {
            outline: none;
            color: #6d757a;
            text-decoration: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            line-height: 1rem;
            word-wrap: break-word;
          }
        }
        .info {
          color: #99a2aa;
          line-height: 14px;
          margin-top: 6px;
          font-size: 12px;
          .operation {
            display: inline-block;
            margin-left: 2%;
            .spot {
              .el-button {
                padding: 0;
                span {
                  display: flex;
                  i {
                    font-size: 1.5rem;
                  }
                  .support {
                    margin: auto 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>