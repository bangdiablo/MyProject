import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import main from './main/vuex_main.js'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    main,
  }
})
