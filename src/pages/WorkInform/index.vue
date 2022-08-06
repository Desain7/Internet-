<template>
  <div>
    <div class="workTitle">
      <span class="text">赣州擂茶</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkInform",
};
</script>

<style lang="scss">
.workTitle {
  .text {
    line-height: 44px;
    &:before,
    &:after {
      content: "";
      display: inline-block;
      width: 22px;
      height: 44px;
      vertical-align: top;
      background-image: url("@/assets/titleBg.png");
    }
    &:after {
    background-position: right;
    margin-left: 18px;
}
    &:before {
    background-position: left;
    margin-right: 18px;
}
  }
}
</style>