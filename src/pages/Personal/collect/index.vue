<template>
  <div style="display:inline-block; width:100%">
    <div class="content">
      <el-empty
        :image-size="300"
        v-if="userCollection.length == 0"
        description="暂无收藏的内容"
      ></el-empty>
      <workCard
        v-for="item in userCollection.slice(
          (this.currentIndex - 1) * pageSize,
          this.currentIndex * pageSize
        )"
        :key="item.id"
        :work="item"
        @click.native="goInform(item)"
      ></workCard>
    </div>
    <div class="page">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="userCollection.length"
        background
        :current-page="currentIndex"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import workCard from "../workCard/index.vue";
export default {
  name: "userCollect",
  data() {
    return {
      currentIndex: 1,
      pageSize: 8,
    };
  },
  computed: {
    ...mapState({
      userCollection: (state) => state.user.collection,
    }),
  },
  methods: {
    goInform(item) {
      let params = {
        pageSize: this.pageSize,
        pageNo: this.currentIndex,
        opusId: item.id,
        email: this.$store.state.login.userdata?.email || "",
      };
      this.$store.dispatch("workInform", params);
      let location = { name: "WorkInform", params: params };
      this.$router.push(location);
    }, //点击跳转作品详情页
    changePage(val) {
      this.currentIndex = val;
      console.log(val);
    },
  },
  mounted() {
    this.$store.dispatch("getUserCollection", {
      email: this.$store.state.login.userdata.email,
    });
  },
  components: {
    workCard,
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 2%;
  box-sizing: border-box;
  display: inline-block;
  height: 90%;
  width: 100%;
  background-color: #fff;
}
.page {
  margin: 0 auto;

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>