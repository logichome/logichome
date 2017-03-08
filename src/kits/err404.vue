<template>
    <div class="err404">
        <img src="../static/imgs/ufo.png"/>
        <p>你访问的页面到M78星云去了</p>
        <p>下次再来吧</p>
        <button @click="goBack">嘤嘤嘤，那我要回去惹！</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            goBack(){
                this.$route.name === "err404" ?
                    this.$router.go(-2) :
                    this.$router.push("/")
            }
        },
        activated(){
            this.$store.commit('initComponent',{
                headerTitle:'FOUND 404',
                backButton:true
            })
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../static/style/skin.styl"
    .err404
        text-align: center
        padding: 0.2rem
        img
            width: 2rem
            margin: 0.1rem
        p
            font 0.18rem/0.3rem $baseFont
        button
            margin-top: 0.2rem
            display inline-block
            background-color: $baseColor
            color $inverseColor
            width: 3rem
            height: 0.5rem
            font 0.18rem/0.5rem $baseFont
            border-radius 0.1rem
</style>