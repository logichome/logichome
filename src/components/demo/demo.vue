<template>
    <div class="demo">
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
                msg: 'demo'
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