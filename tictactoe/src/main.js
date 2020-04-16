import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import skeleton from '../node_modules/skeleton-css/css/skeleton.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  skeleton,
  render: h => h(App)
}).$mount('#app')
