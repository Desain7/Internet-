<template>
  <div>
    <categoryCard></categoryCard>
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
import categoryCard from "@/components/Category/index.vue";
export default {
  name: "shopPage",
  components: { goodsCard, categoryCard },
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