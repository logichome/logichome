<template>
    <div class="banner">
        <ul>
            <transition-group name="fade" mode="in-out">
                <li v-for="(item,index) in imgList" :key="index" v-show="activeIndex==index">
                    <img :src="item.src" alt="">
                </li>
            </transition-group>
        </ul>
    </div>
</template>
<script>
    export default {
        props:['imgList'],
        data(){
            return {
                activeIndex:0,
                timerId:null
            }
        },
        methods:{
            //设置定时器
            setIntv(){
                this.timerId = setInterval(()=>{
                    //判断是否是最后一张，是则返回第一张
                    this.activeIndex =
                        this.activeIndex >= this.imgList.length - 1 ?
                            0 : ++this.activeIndex;
                },4000)
            },
        },
        created(){
            //创建时设置定时器
            this.setIntv();
        },
        destroyed(){
            //销毁时清除定时器
            clearInterval(this.timerId);
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .banner
        ul
            height: 2.1rem
            li
                img
                    width: 100%
    .fade-enter-active, .fade-leave-active {
        position: absolute
        width: 100%
        transition: opacity 0.8s
    }
    .fade-enter, .fade-leave-active {
        position: absolute
        width: 100%
        transition: opacity 0.8s
        opacity: 0
    }
</style>