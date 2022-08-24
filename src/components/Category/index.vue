<template>
  <div>
    <div class="category">
      <div class="category-card">
        <el-tag closable type="info" @close='closeTag' v-if="currentCategory"> {{currentCategory}} </el-tag>
        <el-divider direction="vertical"></el-divider>
        <span class="li" v-for="(item, index) in categoryList" :key="index">
          <span class="text" @click="goSearch(item)"> {{ item }} </span>
          <el-divider direction="vertical"></el-divider>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myCategory",
  data() {
    return {
      currentCategory:'',
      categoryList: ["手工艺", "戏曲文化", "民间文化", "其他"],
    };
  },
  methods: {
    goSearch(item) {
      this.currentCategory = item
      this.$store.dispatch("worksList", {
        opusType: item,
        opusName: "",
      });
    },
    closeTag(){
      this.currentCategory = ''
      this.$store.dispatch("worksList", {
        opusType: '',
        opusName: "",
      });
    }
  },
};
</script>

<style lang="scss">
.category {
  background-color: rgba(243, 240, 232,.5);
  text-align: center;
  display: flex;
  flex-direction: row;
  height: 3rem;
  .category-card {
    margin: auto;
    width: 100%;
    height: 50%;
    .text {
      font-weight: 200;
      cursor: pointer;
    }
  }
}
</style>