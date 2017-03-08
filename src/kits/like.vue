<template>
    <div class="like clearfix">
        <div class="like-box">
            <div class="good">
                <div @click="addLikeCount" class="button">
                    <i v-show="!isLike" class="iconfont icon-appreciate"></i>
                    <i v-show="isLike" class="iconfont icon-appreciatefill"></i>
                    <span>赞</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span v-text="count"></span>
                </div>
            </div>
            <div class="bad">
                <div @click="addDislike" class="button">
                    <i class="iconfont icon-appreciate"></i>
                    <span>踩</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        props:['id','count','addLike'],
        data(){
            return {
                isLike:false,
                message:"",
                timeToShowMessage:false,
                timerId: null
            }
        },
        methods:{
            addLikeCount(){
                if(this.isLike) {
                    Toast({
                        message: '你已经点过赞啦',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                Toast({
                    message: '感谢您的认可~摸摸大',
                    position: 'middle',
                    duration: 2000
                });
                this.addLike();
                this.isLike = true;
            },
            addDislike(){
                Toast({
                    message: '可以不爱  请别伤害',
                    position: 'middle',
                    duration: 2000
                });
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../static/style/skin.styl"
    .like-box
        display: flex
        flex-direction:row
        flex-wrap: nowrap
        justify-content space-around
        .good
        .bad
            text-align: center
            flex-grow 1
            font bold 0.2rem/0.4rem $baseFont
            padding: 0.1rem
            width: 3rem
            .button
                &:active
                    background-color: $lightBaseColor
                background-color: $baseColor
                color $inverseColor
                height: 0.4rem
                border-radius 0.2rem
            i
                font-size:0.2rem
        .bad
            .icon-appreciate:before
                display inline-block
                transform rotate(180deg)
</style>