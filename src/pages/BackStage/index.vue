<template>
    <div class="backStage">
        <tabList></tabList>
        <router-view ></router-view>
    </div>
</template>

<script>
import tabList from './tabList/index.vue'
export default {
    name:'backStage',
    components:{tabList}
}
</script>

<style lang="scss" scoped>
    .backStage{
        
    }
</style>