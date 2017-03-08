<template>
    <div class="note">
        <tab :items="tabItems" :active="activeTab" :setActive="setNoteType"></tab>
        <note-item :status="activeTab" :items="tabItems" :noteList="noteList"></note-item>
    </div>
</template>
<script>
    import tab from '../../kits/tab.vue';
    import noteItem from  './noteItem.vue'
    import outerScroll from '../../kits/outerScroll.vue';
    import { mapState,mapMutations } from 'vuex'
    export default {
        data(){
            return {
                tabItems:[
                    {
                        name:'笔记',
                        tag:'note',
                        en:"STUDY NOTE"
                    },
                    {
                        name:'书签',
                        tag:'bookmark',
                        en:"BOOKMARK"
                    }
                ],
                noteList:[]
            }
        },
        components:{
            tab,
            noteItem,
            outerScroll
        },
        computed:{
            ...mapState({
                activeTab:state=>state.noteStore.activeTab
            })
        },
        methods:{
            ...mapMutations([
                'setNoteActiveTab'
            ]),
            getNoteList(callback){
                this.$http.get("http://120.77.202.112/api/getnotelist/"+this.activeTab).then(res=>{
                    this.noteList = res.body;
                    if(callback) callback(1);
                }, () => {
                    if(callback) callback(0);
                });
            },
            setNoteType(type){
                this.setNoteActiveTab(type);
                this.getNoteList();
            }
        },
        activated(){
            this.$store.commit("initComponent");
            this.getNoteList();
        },
        created(){
            this.setNoteActiveTab(this.tabItems[0].tag);
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"
    .note
        min-height 6rem
</style>