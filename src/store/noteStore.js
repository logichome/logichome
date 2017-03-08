const noteStore = {
    state: {
        activeTab:'test'
    },
    mutations: {
        setNoteActiveTab(state,newTab){
            state.activeTab = newTab;
        }
    },

    actions: {},
    getters: {}
};
export default noteStore;