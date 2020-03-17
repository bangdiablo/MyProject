import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/localization/I18n.js'
import store from './store'
import VueApexCharts from 'vue-apexcharts'
import TitleBar from './components/common/TitleBar'
import './plugins/axios.js'

Vue.use(VueApexCharts);
Vue.use(require('vue-cookies'));
Vue.component('apexchart', VueApexCharts);
Vue.component('TitleBar', TitleBar);

Vue.config.productionTip = false

router.afterEach((to, from) => {

  store.dispatch('main/setCurrentMenu', to.path);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
