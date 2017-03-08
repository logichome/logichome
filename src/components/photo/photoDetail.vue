<template>
    <div class="photo-detail">
        <outer-scroll :canRefresh="true" :update="getContent"></outer-scroll>
        <div class="photo-content">
            <h1 v-text="title"></h1>
            <div class="intro" v-text="intro" v-if="intro"></div>
            <ul class="item-list">
                <li v-for="(item,index) in imgList" :key="index">
                    <img :src="item.src" alt=""></li>
            </ul>
            <p class="image-loading" v-if="!imgList">玩命加载中......</p>
        </div>
        <like :id="imgId" :count="likeCount" :addLike="addCount"></like>
        <comment :commentList="commentList" :addComment="addComment"></comment>
    </div>
</template>
<script>
    import comment from '../../kits/comment.vue'
    import outerScroll from '../../kits/outerScroll.vue'
    import like from '../../kits/like.vue'
    export default {
        data(){
            return {
                imgList:false,
                commentList:false,
                title:"",
                intro:"",
                likeCount:0,
                imgId:""
            }
        },
        methods:{
//            添加评论
            addComment(name,content,callback){
                this.$http.post("http://120.77.202.112/api/addphotocomment/"+this.imgId,{
                    visitor:name,
                    content,
                    date:new Date().getTime()
                },{emulateJSON:true}).then(()=>{
                    this.getContent(callback);
                },()=>{
                    if(callback) callback(0);
                })
            },
//            点赞
            addCount(){
                this.$http.get("http://120.77.202.112/api/addphotolike/"+this.imgId)
                    .then((res)=>{
                        if(res) this.likeCount++
                    });
            },
//            获取内容
            getContent(callback){
//                定义一个闭包检测请求是否完成
                let reqFinished = (()=>{
                    let flag = 0;
                    return ()=>{
                        if(++flag >= 2) callback(1);
                    }
                })();
//                请求图片
                this.$http.get('http://120.77.202.112/api/getphoto/'+this.$route.params.id)
                    .then(res=>{
                        this.imgList = res.body;
                        if(res.body.length===0)return this.$router.push({path:'/err404'});
                        if(callback) reqFinished();
                    },err=>{
                        console.log(err);
                        this.$router.push({path:'/err404'})
                    });
//                请求图片文件夹信息
                this.$http.get('http://120.77.202.112/api/getphotodir')
                    .then(res=>{
                        res.body.forEach((value)=>{
                            if(value.dirid === this.$route.params.id){
                                this.likeCount = value.likes;
                                this.commentList = value.comment;
                                this.intro = value.desc;
                                this.title = value.title;
                                this.imgId = value.dirid
                                this.$store.commit('initComponent',{
                                    headerTitle:this.title,
                                    backButton:true
                                });
                            }
                        });
                        if(callback) reqFinished();
                    },err=>{
                        console.log(err);
                        if(callback) callback(0);
                    })
            }
        },
        components:{
            comment,
            outerScroll,
            like
        },
        activated(){
            this.getContent();
        },
        deactivated(){
            this.imgList = false;
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
    @import "../../static/style/skin.styl"
    .photo-content
        padding: 0.1rem
        h1
            text-align: center
            font 0.22rem/0.4rem $baseFont
            margin: 0.1rem
        .intro
            border: 0.01rem dashed $baseColor
            padding: 0.1rem
            text-indent: 2em
        .item-list
            padding-top: 0.2rem
            li
                margin-bottom: 0.1rem
                img
                    width: 100%
        .image-loading
            text-align: center
</style>