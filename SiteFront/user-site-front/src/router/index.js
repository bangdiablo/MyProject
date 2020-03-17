import Vue from 'vue'
import VueRouter from 'vue-router'

// main
import home from '../views/home.vue'
import common from "./common/router_common.js"
import before_login from "./before_login/router_before_login"
import header from './header/router_header.js'
import main from './main/router_main.js'
import connected_device from './connected_device/router_connected_device.js'
import cloud_drive from './cloud_drive/router_cloud_drive.js'
import favorite from './favorite/router_favorite.js'
import share from './share/router_share.js'
import recycle_bin from './recycle_bin/router_recycle_bin.js'
import storage_service from './storage_service/router_storage_service.js'
import management from './management/router_management.js'
import report from './report/router_report.js'
import my_file from './my_file/router_my_file.js'
import detail from './detail/router_detail.js'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home
    },
    ...common,
    ...before_login,
    ...header,
    ...main,
    ...connected_device,
    ...cloud_drive,
    ...favorite,
    ...share,
    ...recycle_bin,
    ...storage_service,
    ...management,
    ...report,
    // ...my_file,
    // ...detail,
  ]
});
