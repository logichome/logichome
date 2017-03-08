import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import home from '../components/home/home.vue';
// import photo from '../components/photo/photo.vue';
// import photoDetail from '../components/photo/photoDetail.vue';
// import noteDetail from '../components/note/noteDetail.vue';
// import note from '../components/note/note.vue';
// import about from '../components/about/about.vue';
// import demo from '../components/demo/demo.vue';
// import err404 from  '../kits/err404.vue'

const home = resolve => require(['../components/home/home.vue'], resolve);
const photo = resolve => require(['../components/photo/photo.vue'], resolve);
const photoDetail = resolve => require(['../components/photo/photoDetail.vue'], resolve);
const noteDetail = resolve => require(['../components/note/noteDetail.vue'], resolve);
const note = resolve => require(['../components/note/note.vue'], resolve);
const about = resolve => require(['../components/about/about.vue'], resolve);
const demo = resolve => require(['../components/demo/demo.vue'], resolve);
const err404 = resolve => require(['../kits/err404.vue'], resolve);


// 配置路由
const router = new VueRouter({
    mode: 'history',
    routes: [
        {name:'root',path:'/',redirect:'/home'},
        {name:'home',path:'/home',component:home},
        {name:'note',path:'/note',component:note},
        {name:'noteDetail',path:'/note/:id',component:noteDetail},
        {name:'demo',path:'/demo',component:demo},
        {name:'about',path:'/about',component:about},
        {name:'photo',path:'/photo',component:photo},
        {name:'photoDetail',path:'/photo/:id',component:photoDetail},
        {name:'err404',path:'/err404',component:err404},
        {name:'real404',path:'*',component:err404},
    ],
    scrollBehavior(to, from, savedPosition) {
        // console.log(to);
        // console.log(from);
        // console.log(savedPosition);
        return {x: 0, y: 0}
    }
});

export default router;