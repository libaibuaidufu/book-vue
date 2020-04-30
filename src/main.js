// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Element  from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/global.css"
import Vue from 'vue'
import App from './App'
import router from './router'

import Back from "./assets/goBack"
import axios from "axios"
import apiConfig from '../config/api.config.js'
axios.defaults.baseURL=apiConfig.baseURL



Vue.use(Element)
Vue.prototype.$ajax = axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Back,
  components: { App },
  template: '<App/>'
})
