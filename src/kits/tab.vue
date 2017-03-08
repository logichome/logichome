<template>
    <div class="tab">
        <div v-for="(item,index) in items" :key="index" v-text="item.name" class="tab-item" @click="tabChange(item.tag)" :class="{'active-item':item.tag===active}"></div>
    </div>
</template>
<script>
    export default {
        props:['items','active','setActive'],
        data(){
            return {

            }
        },
        methods:{
            tabChange(tag){
                this.setActive(tag);
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../static/style/skin.styl"
    .tab

        background-color: $inverseColor
        display: flex
        flex-direction:row
        flex-wrap: nowrap
        justify-content space-around
        .tab-item
            padding: 0.1rem 0
            text-align: center
            flex-grow 1
            align-items stretch
            font-size: 0.16rem
            color $baseColor
            box-sizing border-box
            &:nth-last-of-type(1)
                border-right none
            &.active-item
                border-bottom:0.02rem solid $baseColor
</style>