<template>
    <div class="home">
        <carousel></carousel>
        {{msg}}
        <div class="space"></div>
    </div>
</template>
<script>
    import carousel from '../../kits/carousel.vue';
    export default {
        data(){
            return {
                msg:'home'
            }
        },
        created() {
            console.log();
        },
        components: {
            carousel
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .space
        height: 10rem

</style>