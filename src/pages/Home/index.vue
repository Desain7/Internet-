<template>
    <div>
        <carousel></carousel>
        <hotWorks></hotWorks>
        <craftsman></craftsman>
    </div>
</template>

<script>
import carousel from './carousel/index.vue'
import hotWorks from './hotWorks/index.vue'
import craftsman from './craftsman/index.vue'
export default {
    name:'homePage',

    components:{carousel, hotWorks, craftsman}
}
</script>

<style lang="scss">
    
</style>