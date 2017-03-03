<template>
    <div class="study-note">
        <div class="title">
            <h3>学习笔记</h3>
            <p>STUDY NOTE</p>
        </div>
        <ul>
            <router-link to="/note/1" tag="li">
                <p class="note-title">学习笔记标题</p>
                <div class="note-info clearfix">
                    <p class="note-info-left fl">
                        <span class="author"><i class="iconfont icon-peoplefill">Rico</i></span>
                    </p>
                    <p class="note-info-right fr">
                        <span class="date"><i class="iconfont icon-writefill"></i>2017-3-2</span>
                        <span class="pv"><i class="iconfont icon-attentionfill"></i>22</span>
                        <span class="star"></i><i class="iconfont icon-appreciatefill"></i>1</span>
                    </p>
                </div>
            </router-link>
            <li>
                <p class="note-title">学习笔记标题</p>
                <div class="note-info clearfix">
                    <p class="note-info-left fl">
                        <span class="author"><i class="iconfont icon-peoplefill">Rico</span>
                    </p>
                    <p class="note-info-right fr">
                        <span class="date"><i class="iconfont icon-writefill"></i>2017-3-2</span>
                        <span class="pv"><i class="iconfont icon-attentionfill"></i>22</span>
                        <span class="star"></i><i class="iconfont icon-appreciatefill"></i>1</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        data(){
            return {}
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .study-note
        margin: 0.1rem 0.2rem
        background-color: #ffffff
        .title
            text-align: center
            h3
                font 0.2rem/0.3rem $baseFont
            p
                font 0.14rem/0.3rem $baseFont
                border-bottom: 0.01rem solid $baseColor
        ul
            padding: 0.1rem
            li
                margin-top: 0.1rem
                padding: 0.05rem 0.1rem
                height: 0.6rem
                font 0.14rem/0.3rem $baseFont
                .note-title
                    font 0.18rem/0.3rem $baseFont
                .note-info
                    border-bottom:0.01rem dashed $baseColor
                    .note-info-right
                        span
                            padding-left:0.1rem
</style>