<template>
  <div class="carousel">
    <el-carousel :interval="5000" >
      <el-carousel-item v-for="item in hotWorks.slice(0, 4)" :key="item.id">
        <el-tooltip
          class="item"
          effect="light"
          :content="item.opusTitle"
          placement="bottom-end"
        >
          <el-image
            :src="item.photo"
            fit="cover"
            style="width: 100%; height: 100%"
            @click="goInform(item)"
          ></el-image>
        </el-tooltip>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "myCarousel",
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
  mounted() {
    this.$store.dispatch("hotWorks");
  },
};
</script>

<style lang="scss">
.carousel {
  cursor: pointer;
  margin-top: 1%;
  width: 100%;
  .el-carousel__container{
    height: 400px;
  }
}
</style>