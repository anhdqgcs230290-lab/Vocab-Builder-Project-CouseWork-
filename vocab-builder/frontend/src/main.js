import Vue from 'vue'
import App from './App.vue'
import router from './router'



import 'semantic-ui-css/semantic.min.css'

import Toasted from 'vue-toasted'; // IMPORT TOASTED thay vì vue-flash-message

// Cấu hình Toasted thay vì vue-flash-message
Vue.use(Toasted, {
  duration: 3000,
  position: 'top-right',
  theme: 'bubble'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
