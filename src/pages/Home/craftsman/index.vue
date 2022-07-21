<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix title">
        <span class="title">匠人志</span>
      </div>
      <div class="content">
        <div class="text item">
          <div class="works" v-for="o in 6" :key="o">
            <div class="avatar">
                <el-avatar :size="120" :src="avatarUrl" class="craftsAvatar"></el-avatar>
            </div>
            <div class="describe">
              <div class="text">
                <span> 匠人名称: </span>
                <span> 代表作: </span>
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
  name: "craftsMan",
    data() {
        return {
            avatarUrl:''
        }
    },
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
        .avatar {
          width: 50%;
          height: 80%;
          margin: auto;
          display: flex;
          .craftsAvatar{
            margin: auto;
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