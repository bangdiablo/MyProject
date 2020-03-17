import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index.js'
import i18n from './plugins/localization/I18n.js'
import './plugins/axios.js'
import location from './components/common/location.vue'
import VModal from 'vue-js-modal'

let infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll);

// Google auth
import GAuth from 'vue-google-oauth2'

// momentJS

import moment from 'vue-moment'
import VueMomentJS from 'vue-momentjs'

Vue.use(VueMomentJS, moment);

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);


const gauthOption = {

  clientId: '709956208735-djf9haapuhi2qn89ancedvkmlkbi8rer.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive'
}
Vue.use(GAuth, gauthOption);


Vue.use(VModal, {dynamic: true, dynamicDefaults: {clickToClose: false}})

Vue.use(require('vue-cookies'), require('vue-moment'), require('vue-lodash'))

Vue.config.productionTip = false;

Vue.component('location', location);

Vue.mixin({
  methods: {
    getFileUrl(fileName) {

      let files = require.context('./assets/images/sub/', false, /\.png$/);

      return files('./' + fileName);
    }
  }
});

router.afterEach((to, from) => {

  store.dispatch('main/setCurrentMenu', to.path);
});


new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app');
