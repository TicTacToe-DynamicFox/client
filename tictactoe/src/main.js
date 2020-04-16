import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import skeleton from '../node_modules/skeleton-css/css/skeleton.css'
import nes from '../node_modules/nes.css/css/nes.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  skeleton,
  nes,
  render: h => h(App)
}).$mount('#app')
