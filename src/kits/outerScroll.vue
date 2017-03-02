<template>
    <div class="outer-scroll">
        <div class="tips">
            <p class="text" >
                <i class="iconfont icon-moreunfold"></i>
                <span v-text="tips"></span>
            </p>
        </div>
    </div>
</template>
<script>
    import {getStyle,animate} from './common.js';
    import {eventHub} from '../eventHub';
    export default {
        data(){
            return {
                tips:'下拉更新数据'
            }
        },
        props:['canRefresh'],
        methods:{
            getScrollY() {
                return (window.pageYOffset !== undefined)
                    ? window.pageYOffset
                    : (window.scrollTop !== undefined)
                        ? window.scrollTop
                        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            },
            bindTouch(){
                let restoreTimerId = null;
                let fatherElement = this.$el.parentNode;
                fatherElement.style.position = 'relative';
                fatherElement.style.transition = 'all 0.3s';
                fatherElement.addEventListener('touchstart',e=>{
                    fatherElement.style.transition = 'none';
                    let eleHeight = 50;
                    let startTouch = e.touches[0].clientY;
                    let startScroll = this.getScrollY();
                    let startTop = parseInt(getStyle(fatherElement,'top'));
                    console.log(startTop);
                    let moveFn;
                    let upFn;
                    let distance = 0;
                    clearTimeout(restoreTimerId);
                    fatherElement.addEventListener('touchmove',moveFn = (e)=>{
                        let positionTouch = e.touches[0].clientY;
                        distance = positionTouch - startTouch - startScroll - startTop;
                        if(distance <= 0){
                            fatherElement.style.top = 0;
                            return;
                        }
                        e.preventDefault();
                        if(distance < eleHeight){
                            this.tips = '下拉更新数据';
                            fatherElement.style.top = distance + 'px';
                        } else if(distance < eleHeight*3){
                            this.tips = '松开更新数据';
                            fatherElement.style.top = eleHeight + (distance-eleHeight)/2 + 'px';
                        } else {
                            this.tips = '快松开！撑不住啦！';
                            fatherElement.style.top = eleHeight*2 + (distance-eleHeight*3)/8 + 'px';
                        }
                    });
                    fatherElement.addEventListener('touchend',upFn = ()=>{
                        fatherElement.style.transition = 'all 0.3s';
                        if(distance < eleHeight) {
                            fatherElement.style.top = 0;
                        } else {
                            fatherElement.style.top = eleHeight + 'px';
                            eventHub.$emit("update");
                            if(this.canRefresh){
                                this.tips = '正在更新';
                                eventHub.$on("updateFinish",status=>{
                                    this.tips = status?'数据已更新':'数据更新失败';
                                    restoreTimerId = setTimeout(function(){
                                        fatherElement.style.top = 0;
                                    },800)
                                });
                            } else {
                                this.tips = '这是静态页面刷个毛毛哦';
                                restoreTimerId = setTimeout(function(){
                                    fatherElement.style.top = 0;
                                },800)
                            }
                        }
                        fatherElement.removeEventListener('touchmove', moveFn);
                        fatherElement.removeEventListener('touchend', upFn);
                    });
                })
            }
        },
        mounted(){
            this.bindTouch();
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../static/style/skin.styl"
    .outer-scroll
        width: 100%
        top: -10rem
        position: absolute
        background-color: $inverseColor
        overflow hidden
        height: 10rem
        .tips
            position: absolute
            height: 0.5rem
            width: 100%
            bottom:0
            text-align: center
            .text
                line-height: 0.5rem
            span
                font-size:0.16rem
</style>