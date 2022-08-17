<template>
    <div v-if="$route.meta.showFooter">
        <div class="footerContainer">
            <div class="footer">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'myFooter'
}
</script>

<style lang="scss" scoped>
    .footerContainer{
        width: 80%;
        margin: 0 auto;
        height: 10rem;
        margin-top: 5%;
        background-color: #fff;
        .footer{

        }
    }
</style>