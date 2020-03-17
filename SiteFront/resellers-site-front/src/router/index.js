import Vue from 'vue'
import VueRouter from 'vue-router'
import beforeLogin from './before_login/router_before_login'
import main from './main/router_main'
import account from './account/router_account'
import license from './license/router_license'
import plan from './plan/router_plan'
import report from './report/router_report'
import reseller from './reseller/router_reseller'
import setting from './setting/router_setting'
import PageNotFound from "../../../user-site-front/src/views/common/PageNotFound";
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        name: 'home'
    },
    ...beforeLogin,
    ...main,
    ...account,
    ...license,
    ...plan,
    ...report,
    ...reseller,
    ...setting,
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
