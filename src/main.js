// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$ajax = axios

const bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    bus
  },
  components: { App },
  template: '<App/>'
})
