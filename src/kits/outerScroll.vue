<template>
    <div class="outer-scroll">
        <div ref="tips" class="tips">
            <p class="text" >
                <i v-show="status == 'pulling0'" class="iconfont icon-moreunfold"></i>
                <i v-show="status == 'pulling1'" class="iconfont icon-less"></i>
                <i v-show="status == 'pulling2'" class="iconfont icon-hotfill"></i>
                <i v-show="status == 'loading'" class="iconfont icon-refresh"></i>
                <i v-show="status == 'loaded'" class="iconfont icon-assessedbadge"></i>
                <i v-show="status == 'error'" class="iconfont icon-cry"></i>
                <i v-show="status == 'heheda'" class="iconfont icon-cardboardfill"></i>
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
                tips:'下拉更新数据',
                status:'pulling0'
            }
        },
        props:['canRefresh'],
        methods:{
            /*
            获取滚动条高度
             */
            getScrollY() {
                return (window.pageYOffset !== undefined)
                    ? window.pageYOffset
                    : (window.scrollTop !== undefined)
                        ? window.scrollTop
                        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            },
            /*
            绑定触摸事件
             */
            bindTouch(){
                let isTouching = false;
//                定义定时器id
                let restoreTimerId = null;
                let animateTimerId = null;
//                获取父元素节点
                let fatherElement = this.$el.parentNode;
//                获取提示信息高度
                let eleHeight = this.$refs.tips.offsetHeight;
//                设置父元素相对定位
                fatherElement.style.position = 'relative';
//                给父元素绑定触摸事件
                fatherElement.addEventListener('touchstart',e=>{
//                    获取触摸时的状态
                    isTouching = true;
                    let startTouch = e.touches[0].clientY;
                    let startScroll = this.getScrollY();
                    let startTop = parseInt(getStyle(fatherElement,'top'));
                    let distance = 0;
//                    定义touchmove和touchend的处理回调函数，方便清除事件
                    let moveFn;
                    let upFn;
                    let updateFinishFn;
//                    清除定时器，中止正在进行的动画
                    clearTimeout(restoreTimerId);
                    clearTimeout(animateTimerId);
//                    绑定触摸移动事件
                    fatherElement.addEventListener('touchmove',moveFn = (e)=>{
//                        计算应该滑动的距离
                        let positionTouch = e.touches[0].clientY;
                        distance = positionTouch - startTouch - startScroll + startTop;
//                        如果小于0，则不滑动
                        if(distance <= 0){
                            fatherElement.style.top = 0;
                            return;
                        }
//                        如果大于0,移除默认事件,以免滑动时与scroll事件冲突
                        e.preventDefault();
//                        小于一个tips高度时,一比一滑动
                        if(distance < eleHeight){
                            this.tips = '下拉更新数据';
                            this.status = 'pulling0';
                            fatherElement.style.top = distance + 'px';
//                            大于一个tips小于三个tips高度时,一比二滑动
                        } else if(distance < eleHeight*4){
                            this.tips = '松开更新数据';
                            this.status = 'pulling1';
                            fatherElement.style.top = eleHeight + (distance-eleHeight)/2 + 'px';
//                            大于三个tips高度时,一比八滑动
                        } else {
                            this.tips = '嘤嘤嘤..不要呀..快放开我！';
                            this.status = 'pulling2';
                            fatherElement.style.top = eleHeight*2.5 + (distance-eleHeight*4)/8 + 'px';
                        }
                    });
//                    绑定触摸结束事件
                    fatherElement.addEventListener('touchend',upFn = ()=>{
                        isTouching = false;
                        if(distance < eleHeight) {
                            animateTimerId = animate(fatherElement,{top:0});
                        } else {
                            animateTimerId = animate(fatherElement,{top:eleHeight},()=>{
//                                判断是否支持刷新
                                if(this.canRefresh){
//                                    触发更新事件
                                    eventHub.$emit("update");
                                    this.tips = '正在更新';
                                    this.status = 'loading';
//                                    处理超时未响应的情况
                                    let timeOver = setTimeout(()=>{
                                        if(this.status === 'loading'){
                                            this.tips = '请求超时';
                                            this.status = 'error';
                                                restoreTimerId = setTimeout(function(){
                                                    animateTimerId = animate(fatherElement,{top:0});
                                                },800);
                                            eventHub.$off("updateFinish",updateFinishFn);
                                        }
                                    },5000);
//                                    接收请求完成状态分发事件
                                    eventHub.$on("updateFinish",updateFinishFn = status=>{
                                        this.tips = status?'数据已更新':'数据更新失败';
                                        this.status = status?'loaded':'error';
                                        clearTimeout(timeOver);
                                        eventHub.$off("updateFinish",updateFinishFn);
                                        restoreTimerId = setTimeout(function(){
                                            if(isTouching) return;
                                            animateTimerId = animate(fatherElement,{top:0});
                                        },800)
                                    });
//                                    不支持刷新时的操作
                                } else {
                                    this.tips = '静态页面刷个毛毛哦';
                                    this.status = 'heheda';
                                    restoreTimerId = setTimeout(function(){
                                        animateTimerId = animate(fatherElement,{top:0});
                                    },800)
                                }
                            });
                        }
//                        清除绑定的事件
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
    @keyframes round
        0%
            transform rotateZ(0deg)
            -webkit-transform:rotateZ(0deg)
        100%
            transform rotateZ(90deg)
            -webkit-transform rotateZ(360deg)

    .outer-scroll
        width: 100%
        left 0
        top: -10rem
        position: absolute
        z-index -1
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
                .icon-refresh::before
                    display: inline-block
                    animation round 1s infinite linear
            span
                font-size:0.16rem
</style>