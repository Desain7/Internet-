<template>
  <div>
    <categoryCard></categoryCard>
    <goodsCard></goodsCard>
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
</style>