// 导入Vue与核心组件
import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource'
// 加载Router和Resource
Vue.use(VueRouter);
Vue.use(vueResource);

import {eventHub} from './eventHub';
// 引入各组件
import App from './App.vue';
import home from './components/home/home.vue';
import photo from './components/photo/photo.vue';
import noteDetail from './components/note/noteDetail.vue';
import note from './components/note/note.vue';
import about from './components/about/about.vue';
import demo from './components/demo/demo.vue';



// 配置路由
const router = new VueRouter({
    // mode: 'history',
    routes: [
        {name:'root',path:'/',redirect:'/home'},
        {name:'home',path:'/home',component:home},
        {name:'note',path:'/note',component:note},
        {name:'noteDetail',path:'/note/:id',component:noteDetail},
        {name:'demo',path:'/demo',component:demo},
        {name:'about',path:'/about',component:about},
        {name:'photo',path:'/photo',component:photo}
    ],
    scrollBehavior(to, from, savedPosition) {
        console.log(to);
        console.log(from);
        console.log(savedPosition);
        return {x: 0, y: 0}
    }
});
// 配置Vue对象
const vm = new Vue({
    el:'#app',
    render:create=>create(App),
    router,
    data: {
        scrollPosition:{},
        ua:''
    },
    methods:{
        tellUA(){
            if(navigator.userAgent.match(/(iPhone|iPod|Android|nokia|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i)){
                this.ua = 'mobile';
            } else {
                this.ua = 'pc';
            }
        }
    },
    created(){
        this.tellUA();
    }
});
// 注册路由钩子
router.beforeEach((to, from, next) => {
    // 获取当前页面滚动高度并将其挂载到scrollPosition中
    vm.scrollPosition[from.name] = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // 将页面跳转到记忆高度
    window.scrollTo(0,(vm.scrollPosition[to.name]||0));
    eventHub.$emit("routerChange",to.name);
    next();
});
