export default {
  namespaced: true,
  state: {
    storage_service: {},
    lists: [],
  },
  mutations: {
    set_storage_service_google_drive_to_true(state, data) {
      state.storage_service = data
    },
    set_data(state, data) {
      for (let i = 0; i < data.list.length; i++) {
        data.list[i]['icoImgUrl'] = '',
        data.list[i]['checked'] = false,
        data.list[i]['on'] = false
      }
      state.lists = data
    }
  },
  actions: {
    getFolderList: ({commit}, data) => {
      var qs = require('qs');
      axios.post('/storage_service/getFolderList/',
        qs.stringify({
          id: data.item.fi_id
        })
      ).then(response => {
        commit('set_data', response.data.data);
      })
    },
    getGoogleDrive:({commit}) =>{
      axios.get('/storage_service/google_drive/').then(response => {
        commit('set_data', response.data.data);
      });
    }
  }
}
