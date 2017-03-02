<template>
    <div class="home">
        <outer-scroll></outer-scroll>
        <carousel v-if="carouselImages" :ua="$root.ua" :images="carouselImages"></carousel>
        {{msg}}
        <div class="space"></div>
    </div>
</template>
<script>
    import carousel from '../../kits/carousel.vue';
    import outerScroll from '../../kits/outerScroll.vue';
    export default {
        data(){
            return {
                msg:'home',
                carouselImages:false
            }
        },
        methods:{
            getCarouselData(){
                this.$http.get('http://120.77.202.112/api/getcarousel').then(response => {
                    this.carouselImages = response.body;
                    console.log(this.carouselImages);
                }, response => {
                    console.error('err:',response);
                });
            }
        },
        created() {
            this.getCarouselData();
        },
        components: {
            carousel,
            outerScroll
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .space
        height: 10rem

</style>