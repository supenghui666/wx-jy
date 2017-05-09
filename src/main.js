// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './vuex/store';
import base from "./common/js/base"
import router from './router'
/* eslint-disable no-new */
Vue.config.productionTip = false
// Vue.prototype._url = 'http://www.gaoshengyiyi.cn'+'/egov';//用于服务器
Vue.prototype._url = '/domain';//用于本地调试
Vue.prototype.$ajax = axios

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
