<template>
  <div>
    <div class="goodsCardContainer">
      <goodsCard></goodsCard>
      <goodsCard></goodsCard>
      <goodsCard></goodsCard>
      <goodsCard></goodsCard>
      <goodsCard></goodsCard>
      <goodsCard></goodsCard>
      <goodsCard></goodsCard>
    </div>
  </div>
</template>

<script>
import goodsCard from "./goodsCard/index.vue";
export default {
  name: "shopPage",
  components: { goodsCard},
};
</script>

<style lang="scss">
.goodsCardContainer {
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>