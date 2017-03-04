<template>
    <div class="note-detail">
        <outer-scroll></outer-scroll>
        <div class="note-content" v-html="content"></div>
        <like id="1" count="1"></like>
        <comment id="1"></comment>
    </div>
</template>
<script>
    import HyperDown from 'hyperdown'
    import HighLight from 'highlight.js'
    import '../../static/style/atelier-dune-light.css'
    import comment from '../../kits/comment.vue'
    import outerScroll from '../../kits/outerScroll.vue'
    import like from '../../kits/like.vue'
    export default {
        data(){
            return {
                content:''
            }
        },
        activated(){
            let parser = new HyperDown;
            this.$http.get('http://127.0.0.1/api/getnotedetail/1').then((res)=>{
                this.content = parser.makeHtml(res.body.text);
                this.$store.commit('initComponent',{
                    headerTitle:res.body.title,
                    backButton:true
                })
            })
        },
        updated(){
            let codes = document.getElementsByTagName("code");
            for (let i = 0,len = codes.length; i < len; i++) {
                HighLight.highlightBlock(codes[i]);
            }
        },
        components:{
            comment,
            like,
            outerScroll
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../static/style/skin.styl"
    .note-detail
        color $baseColor
        .note-content
            padding: 0.1rem
            p
                text-indent: 2em
                font-size: 0.16rem
            h1
                text-align: center
                font 0.22rem/0.4rem $baseFont
                margin: 0.1rem
            h2
                font bold 0.20rem/0.4rem $baseFont
            h3
                font bold 0.16rem/0.4rem $baseFont
            h4,h5,h6
                font  0.16rem/0.4rem $baseFont
            code
                font  0.16rem/0.2rem "Consolas"
                padding: 0.1rem
            blockquote
                border: 0.01rem dashed $baseColor
                padding: 0.1rem
                text-indent: 2em
            hr
                border:none
                border-top: 0.01rem solid $baseColor
            li
                text-indent: 2em
                position: relative
                &:before
                    position: absolute
                    font-size: 0.12rem
                    line-height: 0.12rem
                    bottom: 0.05rem
                    left: -1em
                    content: "\E6EA";
                    font-family:"iconfont"

</style>