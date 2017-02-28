<template>
    <div class="tmpl">
        <l-header></l-header>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        <tabBar></tabBar>
    </div>
</template>
<script>
    import './static/style/styleReset.styl';
    import './static/font/iconfont.css'
    import lHeader from './components/header/header.vue';
    import tabBar from './components/tabBar/tabBar.vue'
    export default {
        data(){
            return {
                msg: 'im app'
            }
        },
        components: {
            tabBar,
            lHeader
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>