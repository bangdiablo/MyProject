export default {

    state: {
        user: {
            firstname: '',
            lastname: '',
            email: '',
            id: '',
            labelid: '',
            resellerid: '',
            existCertify: false,
            lang: '',
            permitfile: ''
        }
    },
    getters: {
        user : (state) => state.user
    },
    mutations: {
        SET_USER_FIRSTNAME  : (state, data) => state.user.firstname = data,
        SET_USER_LASTNAME   : (state, data) => state.user.lastname = data,
        SET_USER_EMAIL      : (state, data) => state.user.email = data,
        SET_USER_ID         : (state, data) => state.user.id = data,
        SET_USER_LABELID    : (state, data) => state.user.labelid = data,
        SET_USER_ACCOUNTID  : (state, data) => state.user.accountid = data,
        SET_EXIST_CERTIFY   : (state, data) => state.user.existCertify = data,
        SET_LANG            : (state, data) => state.user.lang = data,
        SET_PERMITFILE      : (state, data) => state.user.permitfile = data,
        SET_RESELLERID      : (state, data) => state.user.resellerid = data,
    },
    actions: {

        setUser : ({commit}, data) => {

            if (data.firstname !== undefined && data.firstname !== null) {

                commit('SET_USER_FIRSTNAME', data.firstname);

                if (data.lastname !== undefined && data.lastname !== null)
                    commit('SET_USER_LASTNAME', data.lastname);
                else
                    commit('SET_USER_LASTNAME', '');
            }

            if (data.email !== undefined && data.email !== null)
                commit('SET_USER_EMAIL', data.email);

            if (data.id !== undefined && data.id !== null)
                commit('SET_USER_ID', data.id);

            if (data.labelid !== undefined && data.labelid !== null)
                commit('SET_USER_LABELID', data.labelid);

            if (data.accountid !== undefined && data.accountid !== null)
                commit('SET_USER_ACCOUNTID', data.accountid);

            if (data.existCertify !== undefined && data.existCertify !== null)
                commit('SET_EXIST_CERTIFY', data.existCertify);

            if (data.lang !== undefined && data.lang !== null)
                commit('SET_LANG', data.lang);

            if (data.permitfile !== undefined && data.permitfile !== null)
                commit('SET_PERMITFILE', data.permitfile);

            if (data.resellerid !== undefined && data.resellerid !== null)
                commit('SET_RESELLERID', data.resellerid);


        },
    }
}