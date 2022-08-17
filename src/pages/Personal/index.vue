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

          <img
            class="avatarImg"
            :src="userInfo.headPicture"
            alt=""
          />
        </div>
        <div class="userInfo">
          <div class="mainInfo">
            <div class="con1">
              <div class="name">{{ userInfo.name }}</div>
              <div class="age">{{ userInfo.age }}</div>
              <div class="sex">{{ userInfo.sex }}</div>
            </div>
            <div class="con2">
              <div class="email">{{ userInfo.email }}</div>
              <div class="address">{{ userInfo.address }}</div>
              <div class="phone">{{ userInfo.phone }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "myPage",
  data() {
    return {
      // userInfo: {
      //   id: 1,
      //   email: "2369303335@qq.com",
      //   name: "张三",
      //   age: 20,
      //   sex: "男",
      //   address: "南昌市江西农业大学东区",
      //   headPicture: "",
      //   phone: "15870720927",
      // },
    };
  },
  methods: {
    beforeAvatarUpload(file){
       const isLt2M = file.size / 1024 / 1024 < 2;
       if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
    },
    handleAvatarSuccess(res){
      let avatarChange = this.userInfo
      avatarChange.headPicture = res.data
      console.log(avatarChange)
      this.$store.dispatch('chageUserInfo', avatarChange)
    }
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
.userCard {
  width: 80%;
  height: 95vh;
  margin: auto;
  background-color: #bfc;
  .head {
    width: 100%;
    height: 20%;
    display: flex;
    background-color: #fff;
    .avatar {
      height: 80%;
      margin: auto 0;
      margin-left: 5%;
      display: flex;
      border-radius: 50%;
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
}
</style>