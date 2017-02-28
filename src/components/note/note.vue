<template>
    <div class="tmpl">{{msg}}
        <div class="space"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                msg: 'note'
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .space
        height: 10rem
</style>