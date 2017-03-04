<template>
    <div class="toast hide">
        <p class="text" v-text="message"></p>
    </div>
</template>
<script>
    export default {
        props:['message','show'],
        data(){
            return {
            }
        },
        watch:{
            show:function(){
                if(this.show){
                    this.$el.classList.remove("hide");
                }else{
                    this.$el.classList.add("hide");
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .toast

        position: fixed
        z-index 2
        width: 100%
        left: 0
        bottom 1.6rem
        .text
            transition all 0.3s
            opacity 1
            overflow: hidden
            border-radius 0.1rem
            height: 0.4rem
            margin 0 auto
            background-color: rgba(0,0,0,0.5)
            width: 2rem
            color #fff
            font-size 0.18rem
            line-height: 0.4rem
            text-align: center
    .toast.hide
        .text
            opacity 0
            height: 0

</style>