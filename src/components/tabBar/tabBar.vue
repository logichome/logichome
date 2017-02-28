<template>
    <div>
        <div class="tab-bar">
            <ul @click="upToTop">
                <router-link to="/home" tag="li" data-comp-name="home">
                    <i class="iconfont icon-home_fill_light active-icon"></i>
                    <i class="iconfont icon-home_light quiet-icon"></i>
                    <p>HOME</p>
                </router-link>
                <router-link to="/note" tag="li" data-comp-name="note">
                    <i class="iconfont icon-formfill active-icon"></i>
                    <i class="iconfont icon-form1 quiet-icon"></i>
                    <p>NOTE</p>
                </router-link>
                <router-link to="/photo" tag="li" data-comp-name="photo">
                    <i class="iconfont icon-camerafill active-icon"></i>
                    <i class="iconfont icon-camera quiet-icon"></i>
                    <p>PHOTO</p>
                </router-link>
                <router-link to="/demo" tag="li" data-comp-name="demo">
                    <i class="iconfont icon-creativefill active-icon"></i>
                    <i class="iconfont icon-creative quiet-icon"></i>
                    <p>DEMO</p>
                </router-link>
                <router-link to="/about" tag="li" data-comp-name="about">
                    <i class="iconfont icon-hotfill active-icon"></i>
                    <i class="iconfont icon-hot1 quiet-icon"></i>
                    <p>ABOUT</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    import {eventHub} from '../../eventHub';
    export default {
        data(){
            return {
                lastClick:"home"
            }
        },
        methods: {
            upToTop(e){
                let li = e.target.localName === "li" ? e.target : e.target.parentNode;
                if(li.dataset.compName === this.lastClick){
                    window.scrollTo(0,0);
                }
                this.lastClick = li.dataset.compName;
            }
        },
        mounted(){

        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .tab-bar
        background-color: $inverseColor
        border-top: 0.01rem dashed $baseColor
        position: fixed
        height: 0.6rem
        width: 100%
        left: 0
        bottom: 0
        ul
            height: 100%
            li
                .iconfont
                    font-size: 0.3rem
                text-align: center
                line-height: 0.44rem
                float: left
                width: 20%
                color $baseColor
                height: 100%
                box-sizing border-box
                p
                    line-height:0.08rem
                    font-size:0.1rem
                .quiet-icon
                    display block
                .active-icon
                    display none
                &.router-link-active
                    border-bottom: 0.02rem solid $baseColor
                    .active-icon
                        display: block
                    .quiet-icon
                        display none

                
</style>

