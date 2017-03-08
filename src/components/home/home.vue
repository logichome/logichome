<template>
    <div class="home">
        <banner v-if="carouselImages" :imgList="carouselImages"></banner>
        <div class="welcome">
            <p class="welcome-title">欢迎你的到来</p>
            <p class="welcome-content"></p>
        </div>
        <div class="github">
            <a class="github-button" href="https://github.com/logichome">
                <i class="github-logo"></i>
                <p class="github-address">ＧＩＴＨＵＢ</p>
            </a>
        </div>
        <div class="last-update">
            <div class="last-update-title">
                <h3>最近更新</h3>
                <p>LAST UPDATE</p>
            </div>
            <ul>
                <router-link v-for="(item,index) in lastUpdateList" :key="index" :to="item.url" tag="li">
                        <span class="content-type" v-text="transType(item.type)"></span>
                        <span class="update-content" v-text="item.title"></span>
                </router-link>
            </ul>
        </div>
        <div class="random-list">
            <div class="random-list-title">
                <h3>随便瞅瞅</h3>
                <p>HELP YOURSELF</p>
            </div>
            <div class="get-others">
                <a href="javascript:void(0)" @click="getHelpYourself()">
                    <i class="iconfont icon-forward"></i>
                    <span>换一批</span>
                </a>
            </div>
            <ul>
                <router-link v-for="(item,index) in helpYourselfList" :key="index" :to="item.url" tag="li">
                    <span class="content-type" v-text="transType(item.type)"></span>
                    <span class="random-content" v-text="item.title"></span>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>

    import outerScroll from '../../kits/outerScroll.vue';
    import banner from './banner.vue';
    export default {
        data(){
            return {
                carouselImages:null,
                helpYourselfList:[],
                lastUpdateList:[]
            }
        },
        methods:{
            //轮播图请求
            getCarouselData(callback){
                this.$http.get('http://120.77.202.112/api/getcarousel').then(res => {
                    this.carouselImages = res.body;
                    if(callback) callback(1);
                }, () => {
                    if(callback) callback(0);
                });
            },
            //随便瞅瞅请求
            getHelpYourself(callback){
                this.$http.get('http://120.77.202.112/api/gethelpyourself').then(res => {
                    this.helpYourselfList = res.body;
                    if(callback) callback(1);
                },() => {
                    if(callback) callback(0);
                })
            },
            //最近更新请求
            getLastUpdate(callback){
                this.$http.get('http://120.77.202.112/api/getlastupdate').then(res => {
                    this.lastUpdateList = res.body;
                    if(callback) callback(1);
                }, () => {
                    if(callback) callback(0);
                });
            },
            getDate(callback){
                //定义闭包函数存储请求状态，满足3个成功请求返回状态码1，否则返回0
                let store = !callback ?  //无回调则不定义闭包函数
                    null :
                    (()=>{
                    let flag = 0,
                        count =0;
                    return status => {
                        flag+=status;
                        count++;
                        if(count === 3) callback(flag === 3 ? 1 : 0);
                    }
                })();
                //调用请求函数
                this.getCarouselData(store);
                this.getHelpYourself(store);
                this.getLastUpdate(store);
            },
            transType(type){
                switch (type){
                    case "note":
                        return "笔记";
                        break;
                    case "bookmark":
                        return "书签";
                        break;
                    case "image":
                        return "照片";
                }
            }
        },
        activated(){
            this.$store.commit("initComponent")
        },
        created() {
            this.getDate();
        },
        components: {
            banner,
            outerScroll
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
                border: 0.01rem solid $baseColor
                background-color: $inverseColor
                height: 0.5rem
                line-height: 0.5rem
                .github-logo
                    position: absolute
                    margin: 0.1rem 0.9rem
                    background: url("../../static/imgs/github.png") no-repeat
                    background-size: 100% auto
                    width: 0.3rem
                    height: 0.3rem
                .github-address
                    padding-left: 1.4rem
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