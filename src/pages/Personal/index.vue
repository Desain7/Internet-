<template>
  <div>
    <div class="userCard">
      <div class="head">
        <div class="avatar">
          <div class="avatarCover">
            <el-upload
              action="/api/user/uploadHead"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <span> 更换头像 </span>
            </el-upload>
          </div>

          <img class="avatarImg" :src="userInfo.headPicture" alt="" />
        </div>
        <div class="userInfo">
          <div class="mainInfo">
            <div class="con1">
              <div class="name">{{ userInfo.name }}</div>
              <div class="age">{{ userInfo.age }}</div>
              <div class="sex">{{ userInfo.sex }}</div>
            </div>
            <div class="con2">
              <div class="address">{{ userInfo.address }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="userContent">
        <div class="leftContent">
          <el-menu
            default-active="/User/info"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item  v-for="(item, index) in navIndex" :key="index" :index="item.navRouter">
              <i :class="item.navIcon"></i>
              <span slot="title">{{item.navName}}</span>
            </el-menu-item>
          </el-menu>
        </div>
          <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "myPage",
  data() {
    return {
      navIndex: [
        { navName: "个人资料", navIcon:'el-icon-user-solid', navRouter: "/User/info" },
        { navName: "喜欢", navIcon:'el-icon-s-grid', navRouter: "/User/favor" },
        { navName: "收藏", navIcon:'el-icon-star-on', navRouter: "/User/collect" },
      ],
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
       const isJPG = file.type === 'image/jpeg';
       const isPNG = file.type === 'image/png';
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
      return isLt2M && (isJPG || isPNG);
    },
    handleAvatarSuccess(res) {
      let avatarChange = this.userInfo;
      avatarChange.headPicture = res.data;
      console.log(123,avatarChange);
      console.log(456,res.data);
      this.$store.dispatch("chageUserInfo", avatarChange);
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userData,
    }),
  },
  mounted() {
    this.$store.dispatch("getUserData", {
      email: this.$store.state.login.userdata.email,
    });
  },
};
</script>

<style lang="scss" scoped>
$border-color:rgb(241,243,244);
.userCard {
  width: 80%;
  height: 95vh;
  margin: auto;
  background-color: #fff;
  .head {
    width: 100%;
    height: 20%;
    display: flex;
    background-color: #fff;
    border-bottom: $border-color 1px solid;
    .avatar {
      height: 8rem;
      width: 8rem;
      margin: auto 0;
      margin-left: 5%;
      display: flex;
      border-radius: 50%;
      border: 1px rgba(0, 0, 0, 0.3) solid;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      .avatarCover {
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        text-align: center;
        opacity: 0;
        transition: 0.5s;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          color: #fff;
          font-size: 1rem;
          transform: translate(-50%, -50%);
        }
      }

      &:hover {
        .avatarCover {
          opacity: 1;
        }
      }
      .avatarImg {
        margin: auto;
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .userInfo {
      padding-left: 5%;
      width: 70%;
      display: flex;
      flex-direction: row;
      .mainInfo {
        width: 100%;
        display: flex;
        margin: 2%;
        padding: 1%;
        .con1 {
          width: 20%;
          .name {
            font-size: 2rem;
            font-weight: 100;
          }
        }
        .con2 {
          width: 40%;
          div {
            padding: 1%;
            font-size: 1.2rem;
            font-weight: 100;
          }
        }
      }
    }
  }
  .userContent{
    height: 80%;
    .leftContent{
      height: 100%;
      width: 10%;
      background-color: #fff;
      overflow: hidden;
      display: inline-block;
      border-right: $border-color solid 1px;
    }
  }
}
</style>