import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const state = {
    ua:"mobile",
    headerTitle:"LOGICHOME.ME",
    backButton:false,
    searchActive:false
};
const mutations = {
    setHeaderTitle(state,newTitle){
        state.headerTitle = newTitle;
    },
    setSearchActive(state,bool){
        state.searchActive = typeof bool === "boolean" ? bool : false;
    },
    // 组件初始化
    initComponent(state,options){
        options = options || {}
        state.backButton = options.backButton || false;
        state.searchActive = options.searchActive || false;
        state.headerTitle = options.headerTitle || 'LOGICHOME.ME';
    }
};
const actions = {

};
const store = new Vuex.Store({
    // strict: true,
    state,
    mutations,
    actions
});

export default store;