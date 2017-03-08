<template>
    <div>
        <div ref="ele" class="header">
            <div :class="{'back-hide':!backButton||searchActive}" class="back" @click="goBack">
                <i class="iconfont icon-back1"></i>
                <span>返回</span>
            </div>
            <img class="logo" src="../../static/imgs/i_logo.png"/>
            <p class="title" :class="{'title-hide':searchActive}" v-text="headerTitle" @click="scrollToTop"></p>
            <div class="search" :class="{'search-active':searchActive}">
                <i class="search-back iconfont icon-right" @click="setSearchActive"></i>
                <input ref="searchEle" v-model="searchValue" placeholder="站内搜索" class="search-input" type="text"/>
                <i class="search-clear iconfont icon-roundclosefill" v-show="searchActive&&searchValue" @click="searchClear"></i>
                <i class="search-btn iconfont icon-search" @click="handleSearch"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        props:{
            heightToHide:{
                default:200
            }
        },
        data(){
            return {
                scroller:window,
                lastKnownScrollY:0,
                searchValue:"",
                showBackList:['noteDetail'],
            }
        },
        computed: mapState({
            headerTitle: 'headerTitle',
            backButton:'backButton',
            searchActive:'searchActive'
        }),
        methods:{
            ...mapMutations([
                'setSearchActive'
            ]),
            //返回
            goBack(){
                this.$route.name === "err404"?
                    this.$router.go(-2) :
                    this.$router.go(-1);
            },
            //返回顶部
            scrollToTop(){
                window.scrollTo(0,0);
            },
            //处理搜索按钮的点击事件
            handleSearch(){
                this.$refs.searchEle.focus();
                if(this.searchActive){
                    console.log("value:",this.searchValue);
                } else {
                    this.setSearchActive(true);
                }
            },
            //清除搜索框文字
            searchClear(){
                this.searchValue='';
                this.$refs.searchEle.focus();
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .header
        position: fixed
        z-index 99
        top 0
        left: 0
        width: 100%
        height: 0.4rem
        background-color: $baseColor
        .back
            .iconfont
                position: relative
                top: 0.01rem
                left:0.04rem
            transition all $animateTime
            position: absolute
            left: 0
            color $inverseColor
            font 0.16rem/0.4rem $baseFont
            &.back-hide
                opacity 0
                z-index -1
        .logo
            position: absolute
            margin: 0.05rem 0.1rem
            height: 0.3rem
            width: 0.3rem
            display none
        .title
            transition opacity $animateTime
            color $inverseColor
            line-height: 0.4rem
            text-align: center
            font-size:0.18rem
            opacity 1
            &.title-hide
                opacity 0
        .search
            position: absolute
            box-sizing border-box
            transition width $animateTime
            padding: 0.1rem 0.4rem
            top: 0
            right: 0
            height: 100%
            width: 0
            &.search-active
                width: 100%
                .search-input
                    padding: 0 0.1rem
                .search-back
                    opacity 1
            .search-input
                color $baseColor
                display block
                box-sizing border-box
                font: 0.12rem/0.14rem "microsoft yahei"
                height: 100%
                width: 100%
                border-radius 0.1rem
                background-color: rgba(255,255,255,0.9)
            .search-btn
            .search-back
            .search-clear
                color $inverseColor
                position: absolute
                font-size: 0.2rem
                line-height: 0.4rem
                width: 0.4rem
                text-align: center
                top: 0
                right: 0
            .search-back
                transition opacity  $animateTime
                opacity 0
                left 0
            .search-clear
                color $baseColor
                font-size: 0.12rem
                line-height: 0.42rem
                right: 0.4rem
                width: 0.3rem
</style>

