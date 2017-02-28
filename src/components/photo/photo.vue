<template>
    <div class="tmpl">{{msg}}
        <mt-button type="primary" size="large">primary</mt-button>
        <div class="space"></div>
    </div>
</template>
<script>
    import { Button } from 'mint-ui';
    export default {
        data(){
            return {
                msg: 'photo'
            }
        },
        components:{
            "mt-button":Button
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .space
        height: 10rem

</style>