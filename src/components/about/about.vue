<template>
    <div class="about">
        <outer-scroll v-if=""></outer-scroll>
        <p>oH!&nbsp;&nbsp;&nbsp;还没做完呢~你就来了</p>
        <p>{{msg}}</p>
        <img src="../../static/imgs/logo.png"/>
    </div>
</template>
<script>
    import outerScroll from '../../kits/outerScroll.vue';
    export default {
        data(){
            return {
                msg: 'building..'
            }
        },
        components:{
            outerScroll
        },
        activated(){
            this.$store.commit("initComponent");
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .about
        position: absolute
        height: 5rem
        padding-top: 1rem
        p
            padding-top: 0.3rem
            text-align: center
            font-size: 0.2rem
        img
            display: block
            width: 1rem
            margin: 0.5rem auto
</style>