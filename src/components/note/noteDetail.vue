<template>
    <div class="note-detail">
        <outer-scroll :canRefresh="true" :update="getContent"></outer-scroll>
        <div class="note-content" v-html="content"></div>
        <like :id="noteId" :count="likeCount" :addLike="addCount"></like>
        <comment :commentList="commentList" :addComment="addComment"></comment>
    </div>
</template>
<script>
    import HyperDown from 'hyperdown'
    import HighLight from 'highlight.js'
    import comment from '../../kits/comment.vue'
    import outerScroll from '../../kits/outerScroll.vue'
    import like from '../../kits/like.vue'
    import "../../static/style/atelier-dune-light.css"
    export default {
        data(){
            return {
                content:'',
                likeCount:0,
                noteId:"",
                commentList:[]
            }
        },
        methods:{
            addComment(name,content,callback){
                this.$http.post("http://120.77.202.112/api/addnotecomment/"+this.noteId,{
                    visitor:name,
                    content,
                    date:new Date().getTime()
                },{emulateJSON:true}).then(()=>{
                    this.getContent(callback);
                },()=>{
                    if(callback) callback(0);
                })
            },
            addCount(){
                this.$http.get("http://120.77.202.112/api/addnotelike/"+this.noteId)
                    .then((res)=>{
                        if(res) this.likeCount++
                    });
            },
            getContent(callback){
                let parser = new HyperDown;
                this.$http.get('http://120.77.202.112/api/getnotedetail/'+this.$route.params.id)
                    .then(res=>{
                        this.content = parser.makeHtml(res.body.text);
                        this.likeCount = res.body.likes;
                        this.noteId = res.body.noteid;
                        this.commentList = res.body.comment;
                        this.$store.commit('initComponent',{
                            headerTitle:res.body.title,
                            backButton:true
                        })
                        if(callback) callback(1);
                    },()=>{
                        if(callback) callback(0);
                        this.$router.push({path:'/err404'})
                    })
            }
        },
        activated(){
            this.getContent();
        },
        updated(){
            let codes = document.getElementsByTagName("code");
            for (let i = 0,len = codes.length; i < len; i++) {
                HighLight.highlightBlock(codes[i]);
            }
        },
        components:{
            comment,
            like,
            outerScroll
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../static/style/skin.styl"
    .note-detail
        color $baseColor
        .note-content
            padding: 0.1rem
            p
                text-indent: 2em
                font-size: 0.16rem
            h1
                text-align: center
                font 0.22rem/0.4rem $baseFont
                margin: 0.1rem
            h2
                font bold 0.20rem/0.4rem $baseFont
            h3
                font bold 0.16rem/0.4rem $baseFont
            h4,h5,h6
                font  0.16rem/0.4rem $baseFont
            code
                font  0.16rem/0.2rem "Consolas"
                padding: 0.1rem
            blockquote
                border: 0.01rem dashed $baseColor
                padding: 0.1rem
                text-indent: 2em
            hr
                border:none
                border-top: 0.01rem solid $baseColor
            li
                text-indent: 2em
                position: relative
                &:before
                    position: absolute
                    font-size: 0.12rem
                    line-height: 0.12rem
                    bottom: 0.05rem
                    left: -1em
                    content: "\E6EA";
                    font-family:"iconfont"

</style>