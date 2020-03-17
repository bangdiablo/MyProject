"use strict";

import Vue from 'vue'
import axios from 'axios'
import store from "../store/index.js";
import constants from "./constants";

var vm = new Vue();

let config = {
    baseURL: constants.SERVER_URL,
    withCredentials: true
};

const _axios = axios.create(config);


_axios.interceptors.request.use(
    function (config) {
        store.state.loading = true;

        // let token = (vm.$cookies.get('boxAccessToken') == null ? '' : vm.$cookies.get('boxAccessToken'));
        // let key = (vm.$cookies.get('boxAccessKey') == null ? '' : vm.$cookies.get('boxAccessKey'));

        config.headers = {
            // 'X-BOX-ACCESSTOKEN': token,
            // 'X-BOX-ACCESSKEY': key,
            post: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);


// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data

        if (response.data.continueLoading) {
            store.state.loading = true
        } else {
            store.state.loading = false
        }

        let code = response.data.code
        let rejectCode = [-1001, -1002, -1003];

        if (rejectCode.includes(code)) {
            if (code == -1002) {
                if (vm.$cookies.get("language") == "KR")
                    alert("장시간 사용하지 않아 로그아웃되었습니다.");
                if (vm.$cookies.get("language") == "JP")
                    alert("長時間使っていなかったのでログアウトされました。");
                if (vm.$cookies.get("language") == "EN")
                    alert("You were logged out because you did not use for a long time.");
            } else if (code == -1001) {
                if (vm.$cookies.get("language") == "KR")
                    alert("동일한 계정이 접속되어 로그아웃되었습니다.");
                if (vm.$cookies.get("language") == "JP")
                    alert("同じアカウントが接続されたのでログアウトされました。");
                if (vm.$cookies.get("language") == "EN")
                    alert("You were logged out because the same account was connected.");
            } else {

                if (window.location.pathname != '/') {

                    alert("잘못된 접근입니다.");
                }
            }

            vm.$cookies.remove('boxAccessKey');
            vm.$cookies.remove('boxAccessToken');
            vm.$cookies.remove('payload');

            location.href = "/before_login/login";

            return false;
        } else {

            return response;
        }

    },
    function (error) {
        // Do something with response error
        store.state.loading = false

        return Promise.reject(error);
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin);

export default Plugin;
