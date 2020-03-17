export default {
    namespaced: true,
    state: {
        loading: false,
        langType: 'KO',  // KO, JA, EN
        admin: false,
        currentMenu: '',
        setPolicy: [],
        policyDataList: [],
    },
    mutations: {
        start   : (state) => state.loading = true,
        end     : (state) => state.loading = false,
        setAdmin : (state, payload) => state.admin = payload,
        setCurrentMenu  : (state, data) => state.currentMenu = data,
        setPolicy  : (state, data) => state.setPolicy = data,
        policyDataList  : (state, data) => state.policyDataList = data,
    },
    actions: {
        setAdmin({ commit }, isAdmin) {
            commit('setAdmin', isAdmin)
        },
        setCurrentMenu : ({commit}, data) => {

            commit('setCurrentMenu', data);
        },
        setPolicy({ commit }, data) {
            // console.log("setPolicy/////////////", data)
            commit('setPolicy', data)
        },
        policyDataList({ commit }, data) {
            // console.log("policyDataList/////////////", data)
            commit('policyDataList', data)
        },
    }
};
