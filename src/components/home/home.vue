<template>
    <div class="home">
        <outer-scroll :canRefresh="true"></outer-scroll>
        <carousel v-if="carouselImages" :ua="$root.ua" :images="carouselImages"></carousel>
        <div class="welcome">
            <p class="welcome-title">欢迎来到乌龟包子铺</p>
            <p class="welcome-content">哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦欢迎语哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦哔哩吧啦欢迎语。</p>
        </div>
        <div class="github">
            <a class="github-button" href="https://github.com/logichome">
                <i class="github-logo"></i>
                <p class="github-address">github.com/logichome</p>
            </a>
        </div>
        <div class="last-update">
            <div class="last-update-title">
                <h3>最近更新</h3>
                <p>LAST UPDATE</p>
            </div>
            <ul>
                <li>
                    <a href="@">
                        <span class="content-type">笔记</span>
                        <span class="update-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">照片</span>
                        <span class="update-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">照片</span>
                        <span class="update-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">笔记</span>
                        <span class="update-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">笔记</span>
                        <span class="update-content">我是标题我来试试水</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="random-list">
            <div class="random-list-title">
                <h3>随便瞅瞅</h3>
                <p>HELP YOURSELF</p>
            </div>
            <div class="get-others">
                <a href="javascript:void(0)">
                    <i class="iconfont icon-forward"></i>
                    <span>换一批</span>
                </a>
            </div>
            <ul>
                <li>
                    <a href="@">
                        <span class="content-type">笔记</span>
                        <span class="random-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">照片</span>
                        <span class="random-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">照片</span>
                        <span class="random-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">笔记</span>
                        <span class="random-content">我是标题我来试试水</span>
                    </a>
                </li>
                <li>
                    <a href="@">
                        <span class="content-type">笔记</span>
                        <span class="random-content">我是标题我来试试水</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import carousel from '../../kits/carousel.vue';
    import outerScroll from '../../kits/outerScroll.vue';
    import {eventHub} from '../../eventHub';
    export default {
        data(){
            return {
                carouselImages:null
            }
        },
        methods:{
            getCarouselData(callback){
                this.$http.get('http://120.77.202.112/api/getcarousel').then(response => {
                    this.carouselImages = response.body;
                    if(callback) callback(1);
                }, response => {
                    console.log('err:',response);
                    if(callback) callback(0);
                });
            },
            handleRefresh(){
                eventHub.$on('update',()=>{
                    this.carouselImages = false;
                    this.getCarouselData(status=>{
                        eventHub.$emit('updateFinish',status);
                    })
                })
            }
        },
        created() {
            this.getCarouselData();
            this.handleRefresh();
            console.log("home created");
        },
        components: {
            carousel,
            outerScroll
        },
        beforeDestroy(){
            console.log("home beforeDestroy");
        },
        destroyed(){
            console.log("home Destroy");
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .home
        .welcome
            color $baseColor
            padding: 0.2rem
            text-align: center
            .welcome-title
                font bold 0.2rem/0.4rem 'microsoft yahei'
            .welcome-content
                text-align: left
                text-indent: 2em
                letter-spacing 0.016rem
                font normal 0.16rem/0.3rem 'microsoft yahei'
        .github
            padding: 0.2rem
            .github-button
                display: block
                border: 0.02rem solid $baseColor
                background-color: $inverseColor
                height: 0.5rem
                line-height: 0.5rem
                .github-logo
                    position: absolute
                    margin: 0.1rem 0.5rem
                    background: url("../../static/imgs/github.png") no-repeat
                    background-size: 100% auto
                    width: 0.3rem
                    height: 0.3rem
                .github-address
                    padding-left: 1rem
                    color $baseColor
                    font 0.18rem/0.5rem 'microsoft yahei'
        .last-update
        .random-list
            padding: 0.2rem
            .last-update-title
            .random-list-title
                margin-bottom: 0.2rem
                h3
                    font bold 0.2rem/0.4rem 'microsoft yahei'
                text-align: center
            .get-others
                text-align: right
                padding: 0.05rem
            ul
                padding: 0.1rem
                background-color: #fff
                border: 0.03rem dashed $baseColor
                li
                    position: relative
                    height: 0.5rem
                    margin: 0.1rem 0
                    .content-type
                        position: absolute
                        height: 100%
                        text-align: center
                        width: 0.5rem
                        font 0.16rem/0.5rem $baseFont
                        background-color: $baseColor
                        color $inverseColor
                    .update-content
                    .random-content
                        display: block
                        padding-left: 0.5rem
                        font 0.18rem/0.5rem $baseFont
                        text-indent:1em
                        background-color: $backgroundColor
</style>