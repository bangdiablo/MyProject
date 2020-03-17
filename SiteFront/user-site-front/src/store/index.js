import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

// main
import main from './main/vuex_main.js'
import header from './header/vuex_header.js'
import management from './management/vuex_management.js'
import storage_service from './storage_service/vuex_storage_service.js'
import connected_device from './connected_device/vuex_connected_device.js'
import favorite from './favorite/vuex_favorite.js'


export default new Vuex.Store({
  modules: {
    main,
    header,
    management,
    storage_service,
    connected_device,
    favorite
  },
  plugins: [createPersistedState({
      storage: window.sessionStorage,
    }
  )],

});
