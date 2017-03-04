<template>
    <div class="photo-detail">
        <outer-scroll></outer-scroll>
        <div class="photo-content">
            <h1>标题</h1>
            <div class="intro">
                哦呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵
            </div>
            <ul class="item-list">
                <li>
                    <img src="../../static/imgs/om_n10.jpg"/></li>
                <li>
                    <img src="../../static/imgs/om_n11.jpg"/></li>
            </ul>
        </div>
        <like id="1" count="1"></like>
        <comment id="1"></comment>
    </div>
</template>
<script>
    import comment from '../../kits/comment.vue'
    import outerScroll from '../../kits/outerScroll.vue'
    import like from '../../kits/like.vue'
    export default {
        data(){
            return {}
        },
        components:{
            comment,
            outerScroll,
            like
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .photo-content
        padding: 0.1rem
        h1
            text-align: center
            font 0.22rem/0.4rem $baseFont
            margin: 0.1rem
        .intro
            border: 0.01rem dashed $baseColor
            padding: 0.1rem
            text-indent: 2em
        .item-list
            padding-top: 0.2rem
            li
                margin-bottom: 0.1rem
                img
                    width: 100%
</style>