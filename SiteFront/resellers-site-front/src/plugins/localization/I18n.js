'use strict';

import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

export default new VueI18n({
  messages: {
    KR: require('./messages/KR.json'),
    JP: require('./messages/JP.json'),
    EN: require('./messages/EN.json'),
  }
})
