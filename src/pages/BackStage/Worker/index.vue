<template>
  <div class="work">
    <div class="workManage">
    </div>
  </div>
</template>

<script>
export default {
  name: "workerManage",
};
</script>

<style lang="scss" scoped>
.work {
  overflow: hidden;

  .workManage {
    background-color: rgb(35, 42, 69);
    height: 100vh;
    width: 90%;
    position: absolute;
    right: 0;
    .el-card {
      width: 90%;
      margin: auto;
      margin-top: 2%;
    }
  }
}
</style>