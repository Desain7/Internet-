<template>
  <div id="app">
    <myNavigation></myNavigation>
    <router-view></router-view>
    <!-- <worksCard></worksCard> -->
  </div>
</template>

<script>
import myNavigation from '@/components/Header/index.vue'
// import worksCard from '@/components/WorkCard/workCard.vue'

export default {
  name: 'App',
  components: {
    myNavigation,
    // worksCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
