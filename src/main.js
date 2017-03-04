// 导入Vue与核心组件
import Vue from 'vue';
import VueResource from 'vue-resource'
// 加载Resource
Vue.use(VueResource);

import store from './store'
import router from './router'
import App from './App.vue';


// 配置Vue对象
const vm = new Vue({
    el:'#app',
    render:create=>create(App),
    store,
    router,
    data: {
        // scrollPosition:{},
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
    // vm.scrollPosition[from.name] = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // 将页面跳转到记忆高度
    // window.scrollTo(0,(vm.scrollPosition[to.name]||0));
    window.scrollTo(0,0);
    next();
});
