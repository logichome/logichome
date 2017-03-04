<template>
    <div class="note">
        <outer-scroll :canRefresh="false"></outer-scroll>
        <tab :items="items"></tab>
        <note-item :status="tabStatus" :items="items"></note-item>
    </div>
</template>
<script>
    import tab from '../../kits/tab.vue';
    import noteItem from  './noteItem.vue'
    import outerScroll from '../../kits/outerScroll.vue';
    import {eventHub} from '../../eventHub'
    export default {
        data(){
            return {
                items:[
                    {
                        name:'笔记',
                        tag:'note',
                        en:"STUDY NOTE"
                    },
                    {
                        name:'书签',
                        tag:'bookmark',
                        en:"BOOKMARK"
                    },{
                        name:'日志',
                        tag:'log',
                        en:"DAILY RECORD"
                    }
                    ],
                tabStatus:'note'
            }
        },
        components:{
            tab,
            noteItem,
            outerScroll
        },
        methods:{
            changeComponent(){
                eventHub.$on('tabChange',tag=>{
                    this.tabStatus = tag;
                })
            }
        },
        activated(){
            this.$store.commit("initComponent")
        },
        created(){
            this.changeComponent();
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"

</style>