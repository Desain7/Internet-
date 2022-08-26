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
            <div class="author" style="cursor: pointer">
              {{ workInform.author?.name }}
              <div class="authorCard">
                <div class="avatar">
                  <img :src="workInform.author?.photos" alt="" />
                </div>
                <!-- <div class="describeContent">
                  <div class="text">
                    {{ workInform.author?.name }}
                  </div>
                  <div class="text">
                    {{ workInform.author?.age }}
                  </div>
                  <div class="text">
                    {{ workInform.author?.sex }}
                  </div>
                </div> -->
              </div>
            </div>
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
              :preview-src-list="[item]"
              fit="cover"
            ></el-image>
          </div>
        </div>

        <el-divider>{{ workInform.opusName }}</el-divider>
        <div class="workDescribe">
          {{ workInform.opusIntroduce }}
        </div>
        <div class="workVideo" v-if="workInform.video">
          <div class="content">
            <video controls>
              <source :src="workInform.video" type="video/mp4" />
            </video>
          </div>
        </div>
        <el-divider v-if="workInform.video">视频介绍</el-divider>
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
        <el-button round v-if="!workInform.isSupport" @click="supportWork"
          >点赞<i class="iconfont icon-good"></i
          >{{ workInform.support }}</el-button
        >
        <el-button
          type="success"
          round
          v-if="workInform.isSupport"
          @click="supportWork"
          >点赞<i class="iconfont icon-good-fill"></i
          >{{ workInform.support }}</el-button
        >
        <el-button round v-if="!workInform.isCollection" @click="collectWork"
          >收藏<i class="iconfont icon-favorites"></i
          >{{ workInform.collection }}</el-button
        >
        <el-button
          type="warning"
          round
          v-if="workInform.isCollection"
          @click="collectWork"
          >收藏<i class="iconfont icon-favorites-fill"></i
          >{{ workInform.collection }}</el-button
        >
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
        <div class="reply-wrap" v-for="(item, index) in comment" :key="index">
          <div class="user-face">
            <a href="javascript:;">
              <div class="avatar" style="transform: translate(10px, -5px)">
                <el-avatar :size="50" :src="item.headPhoto"></el-avatar>
              </div>
            </a>
          </div>
          <div class="con">
            <div class="user">
              <a
                href="javascript:;"
                class="name"
                style="text-decoration: none"
              >
                {{ item.WebName }}
              </a>
            </div>
            <p class="text">
              {{ item.comment.comments }}
            </p>
            <div class="info">
              <span class="time-location">
                <span class="reply-time">
                  {{ item.comment.createTime }}
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
                      v-if="item.comment.support"
                      style="display: inline-block"
                    >
                      {{ item.comment.support }}
                    </div>
                  </el-button>
                  <el-button
                    v-if="$store.state.login.userdata?.role == 'admin'"
                    type="text"
                    @click="deleteComment(item.comment.id)"
                    >删除</el-button
                  >
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
      deleteSuccess: (state) => state.comments.deleteSuccess,
      comment: (state) => state.works.workInform.comments?.records,
      supportWorkSuccess: (state) => state.worksConfig.supportSuccess,
      collectWorkSuccess: (state) => state.worksConfig.collectSuccess,
    }),
  },
  watch: {
    commentSuccess(newValue) {
      if (newValue) {
        let params = {
          pageSize: "",
          pageNo: "",
          opusId: this.workInform.id,
          email: this.$store.state.login.userdata.email,
        };
        this.$store.dispatch("workInform", params);
        this.$store.dispatch("successChange");
        this.$message({
          type: "success",
          message: "评论成功！",
        });
      }
    },
    deleteSuccess(newValue) {
      if (newValue) {
        let params = {
          pageSize: "",
          pageNo: "",
          opusId: this.workInform.id,
          email: this.$store.state.login.userdata.email,
        };
        this.$store.dispatch("workInform", params);
        this.$store.dispatch("deleteChange");
        this.$message({
          type: "success",
          message: "删除评论成功！",
        });
      }
    },
    supportWorkSuccess(newValue) {
      if (newValue) {
        let params = {
          pageSize: "",
          pageNo: "",
          opusId: this.workInform.id,
          email:this.$store.state.login.userdata.email,
        };
        this.$store.dispatch("workInform", params);
        this.$store.dispatch("supportChange");
      }
    },
    collectWorkSuccess(newValue) {
      if (newValue) {
        let params = {
          pageSize: "",
          pageNo: "",
          opusId: this.workInform.id,
          email: this.$store.state.login.userdata.email,
        };
        this.$store.dispatch("workInform", params);
        this.$store.dispatch("collectChange");
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
          type: "error",
          message: "请先登录再执行操作!",
        });
      }
    },
    supportComment(item) {
      if (!item.userSupport) {
        item.userSupport = true;
        item.comment.support++;
      } else {
        console.log(123);
        this.$message("您已经点过赞了！");
      }
    },
    async deleteComment(id) {
      const result = await this.$confirm("确定删除该评论吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result !== "confirm") {
        return this.$message.info("已取消删除操作！");
      } else {
        this.$store.dispatch("deleteComment", id);
      }
    },
    supportWork() {
        let supportData = {
          id: this.workInform.id,
          email: this.$store.state.login.userdata.email,
        };
        this.$store.dispatch("supportWork", supportData);
    },
    collectWork() {
        let collectData = {
          id: this.workInform.id,
          email: this.$store.state.login.userdata.email,
        };
        this.$store.dispatch("collectWork", collectData);
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
        height: 80%;
        position: relative;
        .authorCard {
          opacity: 0;
          position: absolute;
          background-color: #fff;
          width: 20rem;
          height: 12rem;
          border-radius: 5%;
          left: 20%;
          top: 150%;
          z-index: 99;
          transition: 0.5s;
          visibility: hidden;
          .avatar {
            margin-left: 5%;
            margin-top: 5%;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border: 1px solid #000;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        .title {
          font-weight: bold;
        }
        .author {
          display: inline-block;
          &:hover {
            .authorCard {
              opacity: 1;
              visibility: visible;
            }
          }
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
    .workVideo {
      display: flex;
      .content {
        display: flex;
        margin: auto;
        video {
          margin: auto;
          width: 50%;
          width: 60vh;
        }
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