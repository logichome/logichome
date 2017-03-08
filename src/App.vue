<template>
    <div class="tmpl">
        <lo-header></lo-header>
            <transition name="fade">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        <tabBar></tabBar>
    </div>
</template>
<script>
    import './static/style/styleReset.styl';
    import './static/font/iconfont.css'
    import LoHeader from './components/header/header.vue';
    import tabBar from './components/tabBar/tabBar.vue'
    export default {
        components: {
            tabBar,
            LoHeader
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .fade-enter-active, .fade-leave-active {
        position: absolute
        width: 100%
        transition: opacity 0.5s
    }
    .fade-enter, .fade-leave-active {
        position: absolute
        width: 100%
        transition: opacity 0.5s
        opacity: 0
    }
</style>