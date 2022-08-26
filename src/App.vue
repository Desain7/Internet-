<template>
  <div id="app">
    <myNavigation></myNavigation>
    <router-view></router-view>
    <myFooter></myFooter>
    <loginRegister v-if="this.$store.state.login.showLogin"></loginRegister>
  </div>
</template>

<script>
import myNavigation from "@/components/Header/index.vue";
import myFooter from '@/components/Footer/index.vue';
import loginRegister from "@/components/Login/index.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    myNavigation,
    myFooter,
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
@media screen and (max-width:1450px) {

#app {
width:1450px;

}

}
body {
  background-image: url("@/assets/background.jpg");
}
</style>
