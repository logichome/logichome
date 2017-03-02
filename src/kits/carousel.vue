<template>
    <div class="carousel">
        <ul ref="ul" class="carousel-img-list">
            <li v-for="(item,index) in images" :key="index"><a href="javascript:void(0);"><img :src="item.src"></a></li>
        </ul>
        <ul ref="marks" class="carousel-marks">
            <li v-for="(item,index) in images" :key="index" :class="{active:index===0}"></li>
        </ul>
        <!--<span class="carousel-left-arrow">&lt;</span>-->
        <!--<span class="carousel-right-arrow">&gt;</span>-->
    </div>
</template>
<script>
    export default {
        data(){
            return {
                options:{
                    canDrag:true,
                    count:1,
                    time:4000
                },
                index: 0,
                boxWidth:0,
                isReady: true,
                isDragging: false,
                ul:null,
                marks:null
            }
        },
        props:['ua','images'],
        methods:{
            getStyle(ele, attr) {
                if (ele.currentStyle) {
                    return ele.currentStyle[attr];
                } else {
                    return getComputedStyle(ele, null)[attr];
                }
            },
            init(){
                this.ul = this.$refs.ul;
                this.marks = this.$refs.marks.children;
                this.appendFirstImg();
                this.boxWidth = this.ul.parentNode.offsetWidth / this.options.count;
                this.setIntv();
                this.bindEvent();
                this.options.canDrag ?
                    this.bindDragEvent() : {};
            },
            appendFirstImg(){
                for (let i = 0; i < this.options.count; i++) {
                    this.ul.appendChild(this.ul.children[i].cloneNode(true));
                }
            },
            toNext() {
                if (!this.isReady) {
                    return;
                }
                if (this.index >= this.images.length) {
                    this.ul.style.left = 0;
                    this.index = 0;
                }
                this.index++;
                this.changeMark(this.index);
                this.animate(this.ul, {left: -this.index * this.boxWidth});
            },
            toPrev() {
                if (!this.isReady) {
                    return;
                }
                if (this.index <= 0) {
                    this.ul.style.left = -this.ul * this.boxWidth + "px";
                    this.index = this.ul;
                }
                this.index--;
                this.changeMark(this.index);
                this.animate(this.ul, {left: -this.index * this.boxWidth});
            },
            toJump(index) {
                this.index = index;
                this.animate(this.ul, {left: -index * this.boxWidth});
                this.changeMark();
            },
            setIntv() {
                if (this.isDragging) {
                    return;
                }
                var _this = this;
                _this.timerId = setInterval(function () {
                    _this.toNext();
                }, _this.options.time);
            },
            clearIntv() {
                clearInterval(this.timerId);
            },
            bindEvent() {
                var _this = this;

                //鼠标悬停时清除定时器，离开后重启
                if(_this.ua === 'pc'){
                    _this.ul.parentNode.addEventListener("mouseover", function () {
                        _this.clearIntv();
                    });
                    _this.ul.parentNode.addEventListener("mouseout", function () {
                        _this.setIntv();
                    });
                }
                //绑定左右箭头按钮点击事件
//                if (_this.arrows) {
//                    _this.arrows.left.addEventListener("click", function () {
//                        _this.toPrev();
//                    });
//                    _this.arrows.right.addEventListener("click", function () {
//                        _this.toNext();
//                    });
//                }
                //绑定状态标识点击事件
                for (var i = 0, len = _this.marks.length; i < len; i++) {
                    _this.marks[i].index = i;
                    _this.marks[i].addEventListener("click", function () {
                        _this.toJump(this.index);
                    })
                }
                //窗口调整更新盒子宽度
                window.addEventListener("resize",function(){
                    _this.clearIntv();
                    _this.boxWidth = _this.ul.parentNode.offsetWidth / _this.options.count;
                    _this.ul.style.left = -_this.index * _this.boxWidth + 'px';
                    _this.setIntv();
                })
            },
            changeMark() {
                var index = this.index === this.images.length ? 0 : this.index;
                if (this.marks) {
                    for (var i = 0, len = this.marks.length; i < len; i++) {
                        this.marks[i].classList.remove("active");
                    }
                    this.marks[index].classList.add("active");
                }
                if (this.callback) {
                    this.callback(index);
                }
            },
            animate: function (element, data) {
                var _this = this;
                _this.isReady = false;
                clearInterval(element.timerId);

                element.timerId = setInterval(function () {
                    var flag = true;
                    var leader, target, step;
                    for (var Key in data) {
                        if (Key === "opacity") {
                            leader = _this.getStyle(element, Key) * 100 || 0;
                            target = data[Key] * 100;
                            step = (target - leader) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            leader = leader + step;
                            element.style[Key] = leader / 100;
                        } else if (Key == "zIndex") {
                            leader = parseInt(_this.getStyle(element, Key)) || 0;
                            target = data[Key];
                            step = (target - leader) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            leader = leader + step;
                            element.style[Key] = leader;
                        } else {
                            leader = parseInt(_this.getStyle(element, Key)) || 0;
                            target = data[Key];
                            step = (target - leader) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            leader = leader + step;
                            element.style[Key] = leader + "px";
                        }
                        if (target !== leader) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        clearInterval(element.timerId);
                        _this.isReady = true;
                        if (_this.index > _this.images.length) {
                            _this.ul.style.left = 0;
                        }
                    } else if (_this.isDragging) {
                        clearInterval(element.timerId);
                    }
                }, 20);
            },
            bindDragEvent: function () {
                let _this = this;
                let isMobile = _this.ua !== 'pc';
                let eventName = isMobile ?
                    ['touchstart','touchmove','touchend'] :
                    ['mousedown','mousemove','mouseup']
                //添加鼠标按下事件
                this.ul.addEventListener(eventName[0], function (e) {
                    _this.isDragging = true;//改变拖拽状态标记
                    if (!isMobile) e.preventDefault();//阻止默认事件
                    _this.clearIntv();//清除轮播定时器
                    //定义变量
                    let startX = isMobile ? e.touches[0].pageX : e.pageX;
                    let moveMouse;
                    let upMouse;
                    let distance = 0;
                    let leader = parseInt(_this.getStyle(this, "left"));
                    let result = leader;
                    //绑定鼠标移动与松开事件（鼠标可能移出盒子外，为提高体验绑定了window）
                    window.addEventListener(eventName[1], moveMouse = function (e) {
                        if (!isMobile) e.preventDefault();
                        let positionX = isMobile ? e.touches[0].pageX : e.pageX;
                        distance = positionX - startX;
                        result = leader + distance;
                        let maxLong = _this.images.length * _this.boxWidth;
                        if (result > 0) {
                            result -= maxLong;
                        } else if (result < -maxLong) {
                            result += maxLong;
                        }
                        _this.ul.style.left = result + "px";
                    });
                    window.addEventListener(eventName[2], upMouse = function () {
                        //清除拖拽状态
                        _this.isDragging = false;
                        let overflow = -result % _this.boxWidth;
                        let index = parseInt(-result / _this.boxWidth);
                        //判断滑动方向和滑动距离进行动画跳转
                        _this.toJump(distance > 0 ?
                            (overflow > _this.boxWidth * 2 / 3 ? ++index : index) :
                            (overflow > _this.boxWidth / 3 ? ++index : index));
                        //清除此次绑定的鼠标移动和移动松开事件
                        this.removeEventListener(eventName[1], moveMouse);
                        this.removeEventListener(eventName[2], upMouse);
                        _this.setIntv();
                    });
                });
            }
        },
        mounted(){
            this.init();
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../static/style/skin.styl"
    .carousel
        position: relative;
        width: 100%;
        overflow: hidden;
        .carousel-img-list
            position: relative;
            left: 0;
            width: 1000%;
            height: 100%;
            li
                float: left;
                width: 10%;
                height: 100%;
                img
                    width: 100%;
                    height: 100%;
        .carousel-marks
            position: absolute;
            bottom: 0.1rem;
            left: 50%;
            transform: translateX(-50%);
            li
                float: left;
                margin: 0 0.1rem;
                height: 0.1rem;
                width: 0.1rem;
                border-radius: 50%;
                opacity: 0.5;
                background-color: #fff;
                &.active
                    opacity: 1;
        //arrow
        .carousel-left-arrow
        .carousel-right-arrow
            user-select: none;
            text-align: center;
            opacity: 0;
            position: absolute;
            height: 100%;
            line-height: 637px;
            top: 0;
            cursor: pointer;
            color: #fff;
            font-family: Consolas;
            font-size: 0.5rem;
            font-weight: bold;
            transition: all $animateTime;
        &:hover
            .carousel-left-arrow
            .carousel-right-arrow
                opacity: 1
        .carousel-left-arrow
            left: 0;
            padding-left: 0.3rem;

        .carousel-left-arrow:hover
            padding-right: 0.1rem;
            padding-left: 0.2rem;

        .carousel-right-arrow
            right: 0;
            padding-right: 0.3rem;

        .carousel-right-arrow:hover
            padding-left: 0.2rem;
            padding-right: 0.2rem;

</style>