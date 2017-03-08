<template>
    <div class="photo">
        <div class="photo-content">
            <div class="title">
                <h2>照片</h2>
                <p class="title-en">PHOTO</p>
            </div>
            <div class="photo-list">
                <ul
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="0">
                    <router-link v-for="(item,value) in showList" :to="'/photo/'+item.dirid" tag="li">
                        <div class="photo-img">
                            <img :src="item.cover"/>
                        </div>
                        <div class="photo-info clearfix">
                            <div class="photo-title">
                                <p v-text="item.title"></p>
                            </div>
                            <p class="photo-info-left fl">
                                <span class="author"><i class="iconfont icon-peoplefill" v-text="item.author"></i></span>
                            </p>
                            <p class="photo-info-right fr">
                                <span class="count"><i class="iconfont icon-pic-filling" v-text="item.count"></i></span>
                                <span class="date"><i class="iconfont icon-camerafill" v-text="item.date"></i></span>
                                <span class="pv"><i class="iconfont icon-attentionfill" v-text="item.views"></i></span>
                                <span class="star"><i class="iconfont icon-appreciatefill" v-text="item.likes"></i></span>
                            </p>
                        </div>
                    </router-link>
                </ul>
                <p class="loading" v-if="loading && !loaded">玩命加载中...</p>
                <p class="loaded" v-if="loaded">已经到底啦~</p>
            </div>
        </div>

    </div>
</template>
<script>
    import outerScroll from '../../kits/outerScroll.vue';
    import { InfiniteScroll } from 'mint-ui';
    import  Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default {
        data(){
            return {
                photoList:[],
                showList:[],
                loaded:false,
                loading:false
            }
        },
        methods:{
            getPhotoList(callback){
                this.$http.get("http://120.77.202.112/api/getphotodir").then(res=>{
                    this.photoList = res.body;
                    this.showList = this.photoList.slice(0,2);
                    if(callback) callback(1);
                }, () => {
                    if(callback) callback(0);
                });
            },
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.showList.length - 1;
                    for (let i = 1; i <= 2; i++) {
                        if(this.photoList.length === this.showList.length){
                            this.loading = true;
                            this.loaded = true;
                            return
                        }
                        this.showList.push(this.photoList[last+i]);
                    }
                    this.loading = false;
                }, 1000);
            }
        },
        activated(){
            this.loading = false;
            this.loaded = false;
            this.$store.commit("initComponent");
            this.getPhotoList();
        },
        components:{
            outerScroll
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .photo-content
        padding: 0.1rem 0.2rem
        .title
            text-align: center
            padding-bottom: 0.1rem
            border-bottom: 1px dashed $baseColor
            h2
                font: 0.24rem/0.4rem $baseFont
            .title-en
                font: 0.14rem/0.2rem $baseFont
        .photo-list
            ul
                li
                    background-color: #fff
                    margin:0.2rem 0
                    .photo-img
                        width: 100%
                        /*height: 3rem*/
                        overflow: hidden
                        img
                            width: 100%
                    .photo-info
                        padding: 0.1rem
                        span
                            padding-left:0.1rem
                        .photo-title
                            height: 0.3rem
                            padding: 0 0.1rem
                            margin-bottom: 0.1rem
                            font 0.16rem/0.3rem $baseFont
            .loading
            .loaded
                text-align: center
                color $baseColor
</style>