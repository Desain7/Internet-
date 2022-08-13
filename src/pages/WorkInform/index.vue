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
        <div class="workImage">
          <el-image
            style="width: 100%; height: 100%"
            :src="workInform.photo"
            fit="cover"
          ></el-image>
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
        <el-button type="primary" round>发布评论</el-button>
      </div>
      <div class="commentsContent">
        <div
          class="reply-wrap"
          v-for="(item, index) in commentsInform"
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
                    <i class="iconfont icon-good-fill" v-if="item.userSupport"></i>
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
import { mapState } from 'vuex';
export default {
  name: "WorkInform",
  data() {
    return {
      commentInput: "",
      workInform: {
        //当前作品信息
        id: 1,
        author: "罗聪",
        opusName: "擂茶",
        opusIntroduce:
          "瑞金擂茶是将适量的大米加进芝麻、花生、绿豆、黄豆、茶叶、桔皮等擂制后，熬煮而成。擂茶风味独特，清香、微苦，呈灰绿色，稀糊浑浊，喝时加些香油，十分可口。瑞金人辛勤劳作后，喝上一碗擂茶顿时心清气爽，开胃解乏，擂茶有部分中草药，能起到解毒通气清凉的功效。做成的擂茶清香、味苦，呈灰绿色，稀糊浑浊。 \r\n中国人自古好茶，有言“茶余饭后”、“茶饭不思”、“柴米油盐酱醋茶”，多次将茶与粮食放在等同的地位上，可见茶的地位在国人眼中不容小觑。而瑞金擂茶却不同与茶，虽有“茶”的字样，却是地地道道的一道风味美食，可解馋养生。\r\n",
        opusType: "食品",
        opusTitle: "赣南擂茶",
        photo:
          "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/bf9d7f1d876d416e8075a6d7a2130901.jpg",
        video: null,
        createTime: "2022-07-01",
        make: "将大米、芝麻、花生、绿豆、黄豆、茶叶、桔子分别擂成碎末（可根据自己的喜好决定分量，也可以添加其他食材），切少许葱花备用切少许葱花备用，放入水中煮沸，香飘满座的时候撒上葱花即可。 擂成的谷物碎末也可分成一小份一小份存储起来，嘴馋的时候再用开水冲泡，营养满分。",
        history:
          "擂茶的历史可谓源远流长。湘有“诸葛亮麾下进军湘中遭遇瘟疫，一老妪制擂茶祛疾”的故事。有关的文学记载也散见在一些古籍中，如黄升《玉林诗话》所载《肝胎族舍》一诗曰：”道旁草屋两三家，见客擂麻旋足茶。渐近中原语音好，不知淮水是天涯”。足证研麻，泡茶款客，是当时江南的一种风俗。此外，汪增棋先生引《都城纪胜，茶坊》”冬天兼卖擂茶”、”冬月添卖七宝擂茶”；又引”杭州人一天吃三十文木头”这一古语，说明历史上南宋偏安，人口众多，擂茶相当普及，甚至日耗大量木质枣擂杵。",
        origin:
          "擂茶源自北宋，至今已有千年历史。从选料、制作、冲泡，都别具特色。关于擂茶的起源，相传三国时刘备率领军队过洞庭湖，军中将士染上一种怪病，一路上病倒数千人。队伍扶病行军勉强支撑到了桃花江，再也无力前进，刘备只得下令就地驻扎，并派人四处寻医问药。医方找来不少，但均不见效。一日，一位老翁路过刘备军营，见军中将士纪律严明，很受感动，便主动献出祖传秘方“三生汤”（即生米、生姜、生茶叶）。当地老百姓找一来陶钵和木棒，并按照老翁的配料和制作方法，把生米、生姜、生茶叶捣碎，冲上开水让将士们饮用。其效果果然十分灵验，有病的迅速康复，无病的不再感染。",
      },
      commentsInform: [
        {
          id: 4,
          comments: "垃圾，什么狗屎东西",
          email: "2369303335@qq.com",
          opusId: 2,
          support: 5,
          createTime: "2022-07-13 17:31:55",
        },
        {
          id: 2,
          comments: "看起来真不错",
          email: "1902317191@qq.com",
          opusId: 2,
          support: 1,
          createTime: "2022-07-13 17:12:28",
        },
        {
          id: 3,
          comments: "垃圾，什么狗屎东西",
          email: "2369303335@qq.com",
          opusId: 2,
          support: 0,
          createTime: "2022-07-13 17:31:52",
        },
      ],
    };
  },
  computed:{
    ...mapState({
      inform: (state) => state.login.workInform
    })
  },
  methods: {
    supportComment(item) {
      if (!item.userSupport) {
        item.userSupport = true;
        item.support++
      } else {
        console.log(123);
        this.$message("您已经点过赞了！");
      }
    },
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
    .workImage {
      margin: auto;
      margin-top: 5%;
      width: 700px;
      height: 400px;
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