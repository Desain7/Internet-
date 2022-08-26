<template>
  <div style="display:inline-block; width:100%">
    <div class="content">
      <el-empty
        :image-size="300"
        v-if="userFavor.length == 0"
        description="暂无点赞的内容"
      ></el-empty>
      <workCard
        v-for="item in userFavor.slice(
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
        :total="userFavor.length"
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
  name: "userFavor",
  data() {
    return {
      currentIndex: 1,
      pageSize: 8,
    };
  },
  computed: {
    ...mapState({
      userFavor: (state) => state.user.favor,
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
    },
    changePage(val) {
      this.currentIndex = val;
      console.log(val);
    },
  },
  mounted() {
    this.$store.dispatch("getUserFavor", {
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