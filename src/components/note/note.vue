<template>
    <div class="note">
        <outer-scroll :canRefresh="false"></outer-scroll>
        <tab :items="tabItems"></tab>
        <study-note v-if="tabStatus==='note'"></study-note>
    </div>
</template>
<script>
    import tab from '../../kits/tab.vue';
    import studyNote from  './studyNote.vue'
    import outerScroll from '../../kits/outerScroll.vue';
    import {eventHub} from '../../eventHub'
    export default {
        data(){
            return {
                tabItems:[
                    {
                        name:'笔记',
                        tag:'note'
                    },
                    {
                        name:'书签',
                        tag:'bookmark'
                    },{
                        name:'日志',
                        tag:'log'
                    }
                    ],
                tabStatus:'note'
            }
        },
        components:{
            tab,
            studyNote,
            outerScroll
        },
        methods:{
            changeComponent(){
                eventHub.$on('tabChange',tag=>{
                    this.tabStatus = tag;
                })
            }
        },
        created(){
            this.changeComponent();
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../static/style/skin.styl"

</style>