<template>
    <div class="about">
        <outer-scroll :canRefresh="false"></outer-scroll>
        {{msg}}
        <div class="space"></div>
    </div>
</template>
<script>
    import outerScroll from '../../kits/outerScroll.vue';
    export default {
        data(){
            return {
                msg: 'about'
            }
        },
        components:{
            outerScroll
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .space
        height: 10rem

</style>