<template>
  <div>
    <worksCategory></worksCategory>
    <workCard></workCard>
  </div>
</template>

<script>
import workCard from "@/components/WorkCard/workCard.vue";
import worksCategory from "@/components/Category/index.vue";
export default {
  name: "worksPage",

  components: {
    workCard,
    worksCategory,
  },
  mounted() {
    this.$store.dispatch('worksList')
  }
};
</script>

<style lang="scss">
</style>