<template>
  <div id="app">
    <myNavigation></myNavigation>
    <router-view></router-view>
    <loginRegister v-if="this.$store.state.login.showLogin"></loginRegister>
  </div>
</template>

<script>
import myNavigation from "@/components/Header/index.vue";
import loginRegister from "@/components/Login/index.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    myNavigation,
    loginRegister,
  },
};
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-image: url("@/assets/background.jpg");
}
</style>
