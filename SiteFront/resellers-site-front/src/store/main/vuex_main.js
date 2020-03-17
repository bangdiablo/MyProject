export default {
    namespaced: true,
    state: {
        loading: false,
        langType: 'KO',  // KO, JA, EN
        admin: false,
        currentMenu: '',
        pageLoadInfo: {}
    },
    mutations: {
        start   : (state) => state.loading = true,
        end     : (state) => state.loading = false,
        setAdmin : (state, payload) => state.admin = payload,
        setCurrentMenu  : (state, data) => state.currentMenu = data,
        setPageLoadInfo : (state, payload) => state.pageLoadInfo = payload,
        setLangType : (state, payload) => state.langType = payload,
    },
    actions: {
        setAdmin({ commit }, isAdmin) {
            commit('setAdmin', isAdmin)
        },
        setCurrentMenu : ({commit}, data) => {

            commit('setCurrentMenu', data);
        },
        setPageLoadInfo : ({commit}, data) => {

            commit('setPageLoadInfo', data);
        },
        setLangType : ({commit}, data) => {

            commit('setLangType', data);
        }
    }
};