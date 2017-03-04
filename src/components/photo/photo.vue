<template>
    <div class="photo">
        <outer-scroll :canRefresh="false"></outer-scroll>
        <div class="photo-content">
            <div class="title">
                <h2>照片</h2>
                <p class="title-en">PHOTO</p>
            </div>
            <div class="photo-list">
                <ul>
                    <router-link v-for="(item,value) in photoList" :to="'/photo/'+item.dirid" tag="li">
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
            </div>
        </div>

        <div class="space"></div>
    </div>
</template>
<script>
    import outerScroll from '../../kits/outerScroll.vue';
    export default {
        data(){
            return {
                photoList:[]
            }
        },
        methods:{
            getPhotoList(){
                this.$http.get("http://127.0.0.1/api/getphotodir").then(res=>{
                    this.photoList = res.body;
                    console.log(this.photoList);
                })
            }
        },
        activated(){
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
</style>