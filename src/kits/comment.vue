<template>
    <div class="comment">
        <h4>评论</h4>
        <ul class="comment-list">
            <li v-for="(item,index) in commentList" :key="index">
                <div class="user-info clearfix">
                    <div class="user-avatar fl">
                        <i class="iconfont icon-peoplefill"></i>
                    </div>
                    <p class="user-name fl" v-text="item.visitor"></p>
                </div>
                <div class="message" v-text="item.content">嘻嘻哒</div>
            </li>
            <li class="no-comment" v-if="!commentList">
                <p>沙发都没人坐，不来个葛优躺么</p>
            </li>
        </ul>
        <h4>发表评论</h4>
        <span class="visitor-name-tips">昵称：</span>
        <input v-model="visitorName" type="text" class="visitor-name" />
        <textarea class="comment-content" v-model="commentContent"></textarea>
        <button @click="commentSubmit" class="comment-submit">提交</button>
    </div>
</template>
<script>
    import {Toast,Indicator} from 'mint-ui'
    export default {
        props:['commentList','addComment'],
        data(){
            return {
                visitorName:"",
                commentContent:"",
                message:"",
                timeToShowMessage:false
            }
        },
        methods:{
            commentSubmit(){
                if(!this.commentContent){
                    Toast({
                        message: '内容不能为空',
                        position: 'middle',
                        duration: 2000
                    });
                }else if(!this.visitorName) {
                    Toast({
                        message: '昵称不能为空',
                        position: 'middle',
                        duration: 2000
                    });
                }else{
                    Indicator.open({
                        text: '发送中...',
                        spinnerType: 'fading-circle'
                    });
                    this.addComment(this.visitorName,this.commentContent,(status) => {
                        if(status){
                            Indicator.close();
                            Toast({
                                message: '提交成功',
                                position: 'middle',
                                duration: 2000
                            });
                            this.visitorName = "";
                            this.commentContent = "";
                        } else {
                            Indicator.close();
                            Toast({
                                message: '评论失败',
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    });
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../static/style/skin.styl"
    .comment
        margin: 0.1rem
        border-top: 1px solid $baseColor
        h4
            font 0.22rem/0.5rem $baseFont
        .comment-list
            margin-bottom: 0.2rem
            li
                margin-bottom: 0.1rem
                padding: 0.1rem
                background-color: #fff
                .user-info
                    line-height: 0.4rem
                    .user-avatar
                        height: 0.4rem
                        width: 0.4rem
                        text-align: center
                        border: 1px solid $baseColor
                        border-radius 50%
                        .iconfont
                            font-size:0.3rem
                    .user-name
                        font-size: 0.18rem
                        text-indent:0.5em
                .message
                    margin-top: 0.1rem
                    height: 0.3rem
                    text-indent:2em
                    font:0.16rem/0.3rem $baseFont
                &.no-comment
                    text-align: center
                    background-color: inherit
        .visitor-name-tips
            font 0.16rem/0.3rem $baseFont
            padding-left: 0.1rem
        .visitor-name
            height: 0.3rem
            width: 1.8rem
            font 0.14rem/0.3rem $baseFont
            padding-left: 0.08rem
            box-shadow inset 0 0 0.1rem 0.01rem $baseColor
            border-radius 0.08rem
        .comment-content
            display: block
            margin-top:0.2rem
            padding: 0.1rem 0.2rem
            box-sizing border-box
            width: 100%
            height: 1.2rem
            font 0.16rem/0.3rem $baseFont
            box-shadow inset 0 0 0.2rem 0.01rem $baseColor
            border-radius 0.1rem
        .comment-submit
            display block
            width: 1rem
            height: 0.4rem
            font 0.2rem/0.4rem $baseFont
            color $inverseColor
            background-color: $baseColor
            margin 0.2rem auto
            border-radius 0.1rem
            &:active
                background-color: $lightBaseColor
</style>