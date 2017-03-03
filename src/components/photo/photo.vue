<template>
    <div class="photo">{{msg}}
        <outer-scroll :canRefresh="false"></outer-scroll>

        <mt-button type="primary" size="large">primary</mt-button>
        <div class="space"></div>
    </div>
</template>
<script>
    import { Button } from 'mint-ui';
    import outerScroll from '../../kits/outerScroll.vue';
    export default {
        data(){
            return {
                msg: 'photo'
            }
        },
        components:{
            mtButton:Button,
            outerScroll
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .space
        height: 10rem

</style>