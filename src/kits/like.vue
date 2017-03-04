<template>
    <div class="like clearfix">
        <div class="like-box">
            <div class="good">
                <div @click="addLike" class="button">
                    <i v-show="!isLike" class="iconfont icon-appreciate"></i>
                    <i v-show="isLike" class="iconfont icon-appreciatefill"></i>
                    <span>赞</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span v-text="localCount"></span>
                </div>
            </div>
            <div class="bad">
                <div @click="addDislike" class="button">
                    <i class="iconfont icon-appreciate"></i>
                    <span>踩</span>
                </div>
            </div>
        </div>
        <toast :message="message" :show="timeToShowMessage"></toast>
        <div ref="ques" class="question hide">
            <img src="../static/imgs/question.png"/>
        </div>

    </div>
</template>
<script>
    import toast from "./toast.vue"
    export default {
        props:['id','count'],
        data(){
            return {
                isLike:false,
                message:"",
                timeToShowMessage:false,
                localCount:0,
                timerId: null
            }
        },
        created(){
            this.localCount = this.count;
        },
        methods:{
            addLike(){
                if(this.isLike) return this.showMessage("你已经点过赞啦");;
                this.showMessage("感谢您的认可~摸摸大");
                this.localCount++;
                this.isLike = true;
                console.log(this.id);
            },
            addDislike(){
                this.showMessage("可以不爱!!请别伤害!!");
                this.$refs.ques.classList.remove("hide");
                setTimeout(()=>{
                    this.$refs.ques.classList.add("hide");
                },2000)
            },
            showMessage(msg){
                clearTimeout(this.timerId);
                this.message = msg;
                this.timeToShowMessage= true;
                this.timerId = setTimeout(()=>{
                    this.timeToShowMessage= false;
                },2000)
            }
        },
        components:{
            toast
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
    .question
        transition all 0.3s
        overflow: hidden
        position: fixed
        height: 100%
        width: 100%
        top: 0
        left: 0
        img
            position: absolute
            margin: 0 auto
            width: 3rem
            left: 50%
            margin-left:-1.5rem
            top: 50%
            margin-top: -1rem
        &.hide
            top: -100%
            height: 0
</style>