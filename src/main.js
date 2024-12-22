import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/output.css'
import 'primeicons/primeicons.css'

import 'vue-advanced-cropper/dist/style.css'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
